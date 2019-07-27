// 
// TapZ Incremental
// savedata.js
// 

class Save {
    constructor() {
        this.userData = {
            brains: 0,
            clicks: 0,
            kills: 0,
            money: 0,
            bpk: 1, // Brains Per Kill
            mpb: 5, // Money Per Brain
            zombie: {
                currentHealth: 10,
                totalHealth: 10
            },
            options: {
                language: "en",
                showDamage: true
            }
        }
        
        this.gameData = {
            version: "0.0.2 ALPHA",
            modalOpen: false
        }

        this.blankUserData = this.userData
    }


    save = () => {
        console.log("Attempting to save")
        localStorage.setItem("savedata", btoa(JSON.stringify(this.userData)))
    }


    load = () => {
        console.log("Attempting to Load Save")
        const saveData = localStorage.getItem("savedata")
        if (saveData) {
            this.userData = JSON.parse(atob(saveData))
        } else {
            console.log("Existing save doesnt exist")
        }
    }


    reset = () => {
        this.userData = this.blankUserData
    }
}
