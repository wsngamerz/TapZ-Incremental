// 
// TapZ Incremental
// shop.js
// 

const DPCTab = document.getElementsByClassName("tab-dpc")[0]
const DPSTab = document.getElementsByClassName("tab-dps")[0]
const MultiplierTab = document.getElementsByClassName("tab-multipliers")[0]



class Shop {
    constructor(saveData) {
        this.saveData = saveData

        this.shopData = null
        this.shopLangData = null

        this.loadShopData()
    }


    buyItem = (shopItemID) => {
        const shopItem = this.getItem(shopItemID)
        const itemCost = this.getItemCost(shopItem)

        if (this.saveData.userData.money.gte(itemCost)) {
            // Can Afford upgrade            
            this.saveData.userData.upgrades[shopItemID].level = this.saveData.userData.upgrades[shopItemID].level.plus(1)
            this.saveData.userData.money = this.saveData.userData.money.minus(itemCost)

            this.recalculateBuffs()
        } else {
            // Cannot Afford upgrade
            console.debug(`Cannot afford ${ shopItemID }`)
        }
    }


    checkUserData = () => {
        [...this.shopData.dpc, ...this.shopData.dps, ...this.shopData.multipliers].forEach((itemData) => {
            const test = this.saveData.userData.upgrades[itemData.id]
            if (!test) {
                this.saveData.userData.upgrades[itemData.id] = {
                    level: BigNumber(0, 10)
                }
            }
        })
    }
    
    
    createShopItem = (itemData) => {
        const shopItem = document.createElement("section")
        shopItem.classList.add("shop-item")
        
        const shopItemInformation = document.createElement("section")
        shopItemInformation.classList.add("shop-item-information")
        
        const shopItemIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        shopItemIcon.classList.add("shop-item-icon")
        shopItemIcon.setAttribute("viewBox", "0 0 512 512")
        
        const shopItemIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
        shopItemIconPath.setAttribute("fill", "#4caf50")
        shopItemIconPath.setAttribute("d", itemData.icon)
        
        shopItemIcon.appendChild(shopItemIconPath)
        
        const shopItemText = document.createElement("section")
        shopItemText.classList.add("shop-item-text")
        
        const shopItemName = document.createElement("p")
        shopItemName.classList.add("shop-item-name")
        shopItemName.innerText = this.shopLangData[itemData.id].name
        
        const shopItemDescription = document.createElement("p")
        shopItemDescription.classList.add("shop-item-description")
        shopItemDescription.innerText = this.shopLangData[itemData.id].description
        
        const shopItemLevel = document.createElement("p")
        shopItemLevel.classList.add("shop-item-level")
        shopItemLevel.innerText = `Level: ${ formatNumber(this.saveData.userData.upgrades[itemData.id].level.toString(10)) }`
        shopItemLevel.setAttribute("data-id", itemData.id)
        
        shopItemText.appendChild(shopItemName)
        shopItemText.appendChild(shopItemDescription)
        shopItemText.appendChild(shopItemLevel)
        
        shopItemInformation.appendChild(shopItemIcon)
        shopItemInformation.appendChild(shopItemText)
        
        const shopItemButton = document.createElement("button")
        shopItemButton.classList.add("shop-item-button")
        shopItemButton.classList.add("button")
        shopItemButton.classList.add("button-primary")
        shopItemButton.classList.add("button-block")
        shopItemButton.innerText = `Buy x1 ${ this.shopLangData[itemData.id].name } for £${ formatNumber(this.getItemCost(itemData).toString(10), this.saveData.userData.options.numberShorthand) }`
        shopItemButton.setAttribute("data-id", itemData.id)
        shopItemButton.onclick = () => {
            this.buyItem(itemData.id)
            this.playSFX("buttonClick")
            this.update()
        }
        
        shopItem.appendChild(shopItemInformation)
        shopItem.appendChild(shopItemButton)
        
        return shopItem
    }
    
    
    displayShopData = () => {
        if (this.shopData && this.shopLangData) {
            // only start to load elements once both the data and the
            // language files have been loaded
            
            // Ensure that the upgrades are in the userdata
            this.checkUserData()

            // Handle DPC
            this.shopData.dpc.forEach((itemData) => {
                const newShopItem = this.createShopItem(itemData)
                DPCTab.firstElementChild.appendChild(newShopItem)
            })
            
            // Handle DPS
            this.shopData.dps.forEach((itemData) => {
                const newShopItem = this.createShopItem(itemData)
                DPSTab.firstElementChild.appendChild(newShopItem)
            })

            // Handle Multipliers
            this.shopData.multipliers.forEach((itemData) => {
                const newShopItem = this.createShopItem(itemData)
                MultiplierTab.firstElementChild.appendChild(newShopItem)
            })

        }
    }
    

    getItem = (itemID) => {
        let itemData = [...this.shopData.dpc, ...this.shopData.dps, ...this.shopData.multipliers].find(item => item.id == itemID)
        itemData.text = this.shopLangData[itemID]

        return itemData
    }


    getItemCost = (itemData) => {
        const item = itemData
        const itemLevel = this.saveData.userData.upgrades[itemData.id].level
        const itemCostMultiplier = BigNumber(item.costMultiplier, 10)
        let cost = BigNumber(item.startingCost, 10)

        if (itemLevel != 0) {
            cost = cost.multipliedBy(itemCostMultiplier.pow(itemLevel)).dp(0)
        }

        return cost
    }


    loadShopData = () => {
        // Get Shop Data
        fetch("/assets/data/shop_items.json").then((response) => {
            return response.json()
        }).then((response) => {
            this.shopData = response
            this.displayShopData()
        }).catch((error) => {
            console.error(error)
        })

        // Get Shop Data Language
        fetch(`/assets/data/${ this.saveData.userData.options.language }/shop.json`).then((response) => {
            return response.json()
        }).then((response) => {
            this.shopLangData = response
            this.displayShopData()
        }).catch((error) => {
            console.error(error)
        })
    }


    recalculateBuffs = () => {
        const upgrades = this.saveData.userData.upgrades
        
        let clickDamage = BigNumber(1, 10)
        let autoDamage = BigNumber(0, 10)
        let brainValue = BigNumber(5, 10)
        let brainCount = BigNumber(1, 10)

        Object.keys(upgrades).forEach(upgrade => {
            const itemData = this.getItem(upgrade)
            const level = upgrades[upgrade].level
            
            if (itemData.dpc) {
                // Is a DPC
                clickDamage = clickDamage.plus(BigNumber(itemData.dpc, 10).multipliedBy(level))
            } else if (itemData.dps) {
                // Is DPS
                autoDamage = autoDamage.plus(BigNumber(itemData.dps, 10).multipliedBy(level))
            } else {
                // is a multiplier
                switch (itemData.effects) {
                    case "brainCount":
                        brainCount = brainCount.multipliedBy(BigNumber(itemData.multiplier, 10).pow(level))
                        break
                    
                    case "brainValue":
                        brainValue = brainValue.multipliedBy(BigNumber(itemData.multiplier, 10).pow(level))
                        break
                    
                    default:
                        console.log(itemData.effects, "=> Unknown Effect")
                        break
                }
            }
        })

        this.saveData.userData.dpc = BigNumber(clickDamage, 10)
        this.saveData.userData.dps = BigNumber(autoDamage, 10)
        this.saveData.userData.mpb = BigNumber(brainValue, 10)
        this.saveData.userData.bpk = BigNumber(brainCount, 10)
    }


    sellBrains = () => {
        const cost = this.sellBrainsCost()
        this.saveData.userData.brains = BigNumber(0, 10)
        this.saveData.userData.money = this.saveData.userData.money.plus(cost)
    }


    sellBrainsCost = () => {
        const brains = this.saveData.userData.brains
        const moneyPerBrain = this.saveData.userData.mpb

        return brains.multipliedBy(moneyPerBrain)
    }
}
