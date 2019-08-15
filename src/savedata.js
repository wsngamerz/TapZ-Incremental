// 
// TapZ Incremental
// savedata.js
// 

class Save {
    constructor() {
        // used only to store data temp untill saved to localstorage
        this.userData = {
            brains: BigNumber(0, 10),
            money: BigNumber(0, 10),
            dps: BigNumber(0, 10),
            dpc: BigNumber(1, 10),
            bpk: BigNumber(1, 10), // Brains Per Kill
            mpb: BigNumber(5, 10), // Money Per Brain,
            level: BigNumber(1, 10),
            zombie: {
                currentHealth: BigNumber(10, 10),
                totalHealth: BigNumber(10, 10)
            },
            options: {
                language: "en",
                showDamage: true,
                numberShorthand: true,
                mutemusic: false,
                musicvolume: 0.6,
                mutesfx: false,
                sfxvolume: 0.8
            },
            statistics: {
                clicks: BigNumber(0, 10),
                kills: BigNumber(0, 10)
            },
            upgrades: {}, // should be auto filled by the shop
            saveVersion: 1 // in the future this will be used to hopefully help to migrate old save formats to newer ones
        }

        this.blankUserData = this.userData
        
        // stuff that isn't user based or needed to be saved across saves
        this.gameData = {
            version: "0.0.13 ALPHA",
            currentSaveVersion: 1,
            modalOpen: false
        }
    }


    save = () => {
        console.debug("Attempting to save")
        // pull savedata and convert it to base64
        // to save in LocalStorage
        const savedata = btoa(JSON.stringify(this.userData))
        localStorage.setItem("savedata", savedata)

        console.debug(this.userData)
        console.debug(`Saved at ${ new Date() }`)
    }


    load = () => {
        const savedata = localStorage.getItem("savedata")

        if (savedata) {
            const data = JSON.parse(atob(savedata), (key, value) => {
                // TODO: Check for an exponential value which happens when the exponent of the value is past 1e+9
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
        // TODO: Provide upgrade in the future
        if ((!this.userData.saveVersion) || (this.userData.saveVersion < this.gameData.currentSaveVersion)) {
            const userDecision = confirm("You are using an outdated save. Press OK to play (and reset savedata). Press Cancel to keep existing savedata (and be unable to play)")
            if (userDecision) {
                this.reset()
            } else {
                this.userData = null // doesn't actually delete savedata as savedata is stored in localStorage
            }
        }
    }


    reset = () => {
        localStorage.removeItem("savedata")
        location.reload()
    }
}
