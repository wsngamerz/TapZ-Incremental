// 
// TapZ Incremental
// savedata.js
// 

export default class Save {
    constructor() {
        // used only to store data temp untill saved to localstorage
        this.userData = {
            brains: BigNumber(0, 10),
            money: BigNumber(0, 10),
            dps: BigNumber(0, 10), // Damage per second
            dpc: BigNumber(1, 10), // Damage per click
            bpk: BigNumber(1, 10), // Brains Per Kill
            mpb: BigNumber(5, 10), // Money Per Brain
            level: BigNumber(1, 10),
            zombie: {
                currentHealth: BigNumber(10, 10),
                totalHealth: BigNumber(10, 10)
            },
            options: {
                language: "en", // corresponds to folder in data directory
                showDamage: true,
                numberShorthand: true,
                numberFormat: "lazy", // can be one of "lazy", "fullname" or "shorthand"
                mutemusic: false,
                musicvolume: 0.6,
                mutesfx: false,
                sfxvolume: 0.8
            },
            statistics: {
                clicks: BigNumber(0, 10),
                kills: BigNumber(0, 10),
                totalBrains: BigNumber(0, 10),
                totalMoney: BigNumber(0, 10)
            },
            upgrades: {}, // should be auto filled by the shop
            saveVersion: 3 // in the future this will be used to hopefully help to migrate old save formats to newer ones
        }

        // have a blank copy of the above savedata for reseting purposes and default values
        this.blankUserData = this.userData
        
        // stuff that isn't user based or needed to be saved across saves
        this.gameData = {
            version: "0.2.1 BETA",
            currentSaveVersion: 3,
            modalOpen: false,
            currentModal: ""
        }
    }


    save = () => {
        // pull savedata and convert it to base64
        // to save in LocalStorage
        const savedata = btoa(JSON.stringify(this.userData))
        localStorage.setItem("savedata", savedata)

        console.debug(`Saved at ${ new Date() }`)
    }


    load = () => {
        const savedata = localStorage.getItem("savedata")

        if (savedata) {
            const data = JSON.parse(atob(savedata), (key, value) => {
                // TODO: Check for an exponential value which happens when the exponent of the value is past 1e+9
                //       or in regular numbers: 1,000,000,000
                if (typeof value === "string" && value.match(/^[0-9]+$/)) {
                    return BigNumber(value, 10)
                }
                return value
            })
            console.debug("Existing savedata exists using version", data.saveVersion, "so attempting to load it!")

            // Apply loaded userdata
            this.userData = data
        } else {
            console.debug("Existing savedata doesn't exist!")
        }

        // warn user about old savedata (if old ofc)
        if ((!this.userData.saveVersion) || (this.userData.saveVersion < this.gameData.currentSaveVersion)) {
            // outdated save found
            this.migrateSave()
        }
    }


    migrateSave = () => {
        // Hopefully this should be able to migrate the new objects and props accross to the old
        // save and then bump the savedata version
        
        // unpack objects (and sub-objects) and apply them
        let tempNewData = { ...this.blankUserData, ...this.userData }
        tempNewData.zombie = { ...this.blankUserData.zombie, ...this.userData.zombie }
        tempNewData.options = { ...this.blankUserData.options, ...this.userData.options }
        tempNewData.statistics = { ...this.blankUserData.statistics, ...this.userData.statistics }
        tempNewData.saveVersion = this.blankUserData.saveVersion
        
        // apply new (updated) userdata
        this.userData = tempNewData
        console.debug(`Just Bumped save-version to ${ tempNewData.saveVersion }`)
        this.save()
    }


    reset = () => {
        localStorage.removeItem("savedata")
        location.reload()
    }
}
