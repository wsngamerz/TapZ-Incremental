//
// shop.js
// TapZ Incremental
// Created by William Neild
//

class Shop { 
    constructor(shopData) {
        this.shopData = shopData;
    }

    buyItem(category, item, userData) {
        let balance = userData.money;
        let itemLevel = userData.upgrades[category][item].level;
        let itemCost = this.cost(category, item, itemLevel);

        // TODO: Add level cap (-1 == infinite)

        if(balance > itemCost) {
            userData.upgrades[category][item].level = itemLevel + 1;
            userData.money = userData.money - itemCost;
        } else {
            console.log("Cannot afford " + item);
        }

        return userData;
    }

    cost(category, item, level) {
        const itemData = this.shopData[category][item];
        let cost = itemData.initialPrice; 
        let costMultiplier = itemData.priceMultiplier;
        let i;

        for(i = 0; i < level; i++) {
            cost = cost * costMultiplier;
        }

        return Math.round(cost);
    }
}
