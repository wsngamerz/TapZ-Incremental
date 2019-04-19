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
            bpk: 1, // Brains Per Kill
            mpb: 5, // Money Per Brain
            zombie: {
                currentHealth: 10,
                totalHealth: 10
            }
        }
        
        this.gameData = {
            version: "1.0.1 ALPHA"
        }
    }
}
