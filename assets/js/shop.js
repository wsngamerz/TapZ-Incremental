// 
// TapZ Incremental
// shop.js
// 

class Shop {
    constructor(savedata) {
        this.savedata = savedata

        this.sellBrains = this.sellBrains.bind(this)
        this.sellBrainsCost = this.sellBrainsCost.bind(this)
    }

    sellBrains() {
        const cost = this.sellBrainsCost()
        this.savedata.userData.brains = 0
        this.savedata.userData.money += cost
    }

    sellBrainsCost() {
        const brains = this.savedata.userData.brains
        const moneyPerBrain = this.savedata.userData.mpb

        return (brains * moneyPerBrain)
    }
}
