// 
// TapZ Incremental
// shop.js
// 

const DPCTab = document.getElementsByClassName("tab-dpc")[0]
const DPSTab = document.getElementsByClassName("tab-dps")[0]
const MultiplierTab = document.getElementsByClassName("tab-multipliers")[0]



class Shop {
    constructor(saveData, updateFunction) {
        this.saveData = saveData
        this.update = updateFunction

        this.shopData = null
        this.shopLangData = null

        this.loadShopData()
    }


    buyItem = (shopItemID) => {
        const shopItem = this.getItem(shopItemID)
        const itemCost = this.getItemCost(shopItem)

        if (this.saveData.userData.money >= itemCost) {
            // Can Afford upgrade            
            this.saveData.userData.upgrades[shopItemID].level += 1
            this.saveData.userData.money -= itemCost

            this.recalculateBuffs()
        } else {
            // Cannot Afford upgrade
            console.log(`Cannot afford ${ shopItemID }`)
        }
    }


    checkUserData = () => {
        [...this.shopData.dpc, ...this.shopData.dps, ...this.shopData.multipliers].forEach((itemData) => {
            const test = this.saveData.userData.upgrades[itemData.id]
            if (!test) {
                this.saveData.userData.upgrades[itemData.id] = {
                    level: 0
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
        shopItemLevel.innerText = `Level: ${ this.saveData.userData.upgrades[itemData.id].level }`
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
        shopItemButton.innerText = `Buy x1 ${ this.shopLangData[itemData.id].name } for £${ this.getItemCost(itemData) }`
        shopItemButton.setAttribute("data-id", itemData.id)
        shopItemButton.onclick = () => {
            this.buyItem(itemData.id)
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
        let cost = item.startingCost

        if (itemLevel != 0) {
            // Loop through all levels to get current price
            [...Array(itemLevel).keys()].forEach(x => {
                cost = cost * item.costMultiplier
            })
        }

        return Math.round(cost)
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
        
        let clickDamage = this.saveData.blankUserData.dpc
        let autoDamage = this.saveData.blankUserData.dps
        let brainValue = this.saveData.blankUserData.mpb
        let brainCount = this.saveData.blankUserData.bpk

        Object.keys(upgrades).forEach(upgrade => {
            const itemData = this.getItem(upgrade)
            const level = upgrades[upgrade].level
            
            if (itemData.dpc) {
                // Is a DPC
                clickDamage += itemData.dpc * level
            } else if (itemData.dps) {
                // Is DPS
                autoDamage += itemData.dps * level
            } else {
                // is a multiplier
                switch (itemData.effects) {
                    case "brainCount":
                        [...Array(level).keys()].forEach(x => brainCount *= itemData.multiplier)
                        break
                    
                    case "brainValue":
                        [...Array(level).keys()].forEach(x => brainValue *= itemData.multiplier)
                        break
                    
                    default:
                        console.log(itemData.effects, "=> Unknown Effect")
                        break
                }
            }
        })

        this.saveData.userData.dpc = clickDamage
        this.saveData.userData.dps = autoDamage
        this.saveData.userData.mpb = brainValue
        this.saveData.userData.bpk = brainCount
    }


    sellBrains = () => {
        const cost = this.sellBrainsCost()
        this.saveData.userData.brains = 0
        this.saveData.userData.money += cost
    }


    sellBrainsCost = () => {
        const brains = this.saveData.userData.brains
        const moneyPerBrain = this.saveData.userData.mpb

        return (brains * moneyPerBrain)
    }
}
