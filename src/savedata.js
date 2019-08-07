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
                showDamage: true
            },
            statistics: {
                clicks: BigNumber(0, 10),
                kills: BigNumber(0, 10)
            },
            upgrades: {} // should be auto filled by the shop
        }
        
        // stuff that isn't user based or needed to be saved across saves
        this.gameData = {
            version: "0.0.8 ALPHA",
            modalOpen: false
        }
    }


    save = () => {
        // TODO: REFACTOR SAVING TO WORK WITH BigNumber

        // console.log("Attempting to save")
        // localStorage.setItem("savedata", btoa(JSON.stringify(this.userData)))
        // console.log(this.userData)
        
    }


    load = () => {
        // TODO: REFACTOR SAVING TO WORK WITH BigNumber

        // const saveData = localStorage.getItem("savedata")
        // if (saveData) {
        //     this.userData = { ...this.blankUserData, ...JSON.parse(atob(saveData)) }
        //     console.log("Loaded existing savedata!")
        // } else {
        //     console.log("Existing savedata doesn't exist!")
        // }
    }


    reset = () => {
        localStorage.removeItem("savedata")
        location.reload()
    }
}
