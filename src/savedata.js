// 
// TapZ Incremental
// savedata.js
// 

class Save {
    constructor() {
        this.userData = {
            brains: 0,
            money: 0,
            dps: 0,
            dpc: 1,
            bpk: 1, // Brains Per Kill
            mpb: 5, // Money Per Brain,
            level: 1,
            zombie: {
                currentHealth: 10,
                totalHealth: 10
            },
            options: {
                language: "en",
                showDamage: true
            },
            statistics: {
                clicks: 0,
                kills: 0
            },
            upgrades: {} // should be auto filled by the shop
        }
        
        this.gameData = {
            version: "0.0.6 ALPHA",
            modalOpen: false
        }

        this.blankUserData = this.userData
    }


    save = () => {
        console.log("Attempting to save")
        localStorage.setItem("savedata", btoa(JSON.stringify(this.userData)))
        console.log(this.userData)
    }


    load = () => {
        const saveData = localStorage.getItem("savedata")
        if (saveData) {
            this.userData = { ...this.blankUserData, ...JSON.parse(atob(saveData)) }
            console.log("Loaded existing savedata!")
        } else {
            console.log("Existing savedata doesn't exist!")
        }
    }


    reset = () => {
        this.userData = this.blankUserData
        this.save()
        location.reload()
    }
}
