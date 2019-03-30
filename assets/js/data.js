//
// data.js
// TapZ Incremental
// Created by William Neild
//

class Data {
    constructor() {
        this.version = "1.0.0 alpha 1"

        this.userData = {
            brains: 0,
            clicks: 0,
            level: 1,
            levelKilled: 0,
            money: 0,
            kills: 0,
            zombie: {
                current: 20,
                total: 20
            },
            upgrades: {
                dps: {
                    survivor: {
                        level: 0
                    }
                },
                dpc: {
                    sharpeningKit: {
                        level: 0
                    },
                    gripUpgrade: {
                        level: 0
                    }
                },
                multipliers: {
                    advancedSpoon: {
                        level: 0
                    },
                    brainEnrichment: {
                        level: 0
                    }
                }
            }
        }

        this.shopData = {
            dps: {
                survivor: {
                    damage: 1,
                    description: "After being rescued, Survivors will help you kill the hoard of zombies!",
                    initialPrice: 1000,
                    limit: -1,
                    priceMultiplier: 1.1
                }
            },
            dpc: {
                sharpeningKit: {
                    damage: 1,
                    description: "Now that your trusty shank is sharper than before, you can slice through the hoard with ease!",
                    initialPrice: 100,
                    limit: -1,
                    priceMultiplier: 1.2
                },
                gripUpgrade: {
                    damage: 5,
                    description: "Oooo, a comfortable handle!",
                    initialPrice: 1000,
                    limit: 10,
                    priceMultiplier: 1.3,
                }
            },
            multipliers: {
                advancedSpoon: {
                    description: "Wait, is that another brain? Wow!",
                    initialPrice: 50,
                    limit: 100,
                    priceMultiplier: 2
                },
                brainEnrichment: {
                    description: "A breakthrough in technology, your zombie brains now sell for more!",
                    initialPrice: 10000,
                    limit: 100,
                    priceMultiplier: 2
                }
            }
        }
    }
}
