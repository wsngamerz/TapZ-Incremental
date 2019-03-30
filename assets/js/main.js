//
// main.js
// TapZ Incremental
// Created by William Neild
//

const advancedSpoonCost = document.getElementById("advanced-spoon-cost");
const advancedSpoonLevel = document.getElementById("advanced-spoon-level");
const brainEnrichmentCost = document.getElementById("brain-enrichment-cost");
const brainEnrichmentLevel = document.getElementById("brain-enrichment-level");
const brains = document.getElementById("brains");
const buyAdvancedSpoon = document.getElementById("buy-advanced-spoon");
const buyBrainEnrichment = document.getElementById("buy-brain-enrichment");
const buyGripUpgrade = document.getElementById("buy-grip-upgrade");
const buySharpeningKit = document.getElementById("buy-sharpening-kit");
const buySurvivor = document.getElementById("buy-survivor");
const closeSettingsBtn = document.getElementById("modal-settings-close");
const closeShopBtn = document.getElementById("modal-shop-close");
const gripUpgradeCost = document.getElementById("grip-upgrade-cost");
const gripUpgradeLevel = document.getElementById("grip-upgrade-level");
const healthBar = document.getElementById("health-bar");
const level = document.getElementById("level");
const money = document.getElementById("money");
const sellBrainsButton = document.getElementById("sell-brains-btn");
const settingsBtn = document.getElementById("btn-settings");
const settingsModal = document.getElementById("modal-settings");
const settingsSaveResetBtn = document.getElementById("settings-save-reset");
const settingsSaveSaveBtn = document.getElementById("settings-save-save");
const settingsSaveLoadBtn = document.getElementById("settings-save-load");
const sharpeningKitCost = document.getElementById("sharpening-kit-cost");
const sharpeningKitLevel = document.getElementById("sharpening-kit-level");
const shopBtn = document.getElementById("btn-shop");
const shopModal = document.getElementById("modal-shop");
const shopDpcBtn = document.getElementById("btn-dpc");
const shopDpcTab = document.getElementById("tab-dpc");
const shopDpsBtn = document.getElementById("btn-dps");
const shopDpsTab = document.getElementById("tab-dps");
const shopMultiplierBtn = document.getElementById("btn-multiplier");
const shopMultiplierTab = document.getElementById("tab-multiplier");
const survivorCost = document.getElementById("survivor-cost");
const survivorLevel = document.getElementById("survivor-level");
const zombieButton = document.getElementById("zombie");
const zombieHealthCurrent = document.getElementById("health-current");
const zombieHealthTotal = document.getElementById("health-total");

let shopOpen = false;
let settingsOpen = false;

class Game {
    constructor(data, shop) {
        // Use other classes in main Game class
        this.data = data;
        this.shop = shop;

        // bind this to functions
        this.buy = this.buy.bind(this);
        this.clickAnimation = this.clickAnimation.bind(this);
        this.load = this.load.bind(this);
        this.save = this.save.bind(this);
        this.savedata = this.savedata.bind(this);
        this.sellBrains = this.sellBrains.bind(this);
        this.settingsClick = this.settingsClick.bind(this);
        this.shopClick = this.shopClick.bind(this);
        this.zombieClick = this.zombieClick.bind(this);
        this.zombieDead = this.zombieDead.bind(this);

        // Check for local storage support, loading and saving
        this.savedata();

        // add game event listers and initial ui paint
        this.addListeners();
        this.updateUI();
    }

    addListeners() {
        // Self explanitory function
        
        const self = this; // Quick fix to allow functions inside addEventListener to call "this"

        buyAdvancedSpoon.addEventListener("click", function() {
            self.buy("multipliers", "advancedSpoon");
        });

        buyBrainEnrichment.addEventListener("click", function() {
            self.buy("multipliers", "brainEnrichment");
        });

        buyGripUpgrade.addEventListener("click", function() {
            self.buy("dpc", "gripUpgrade");
        });

        buySharpeningKit.addEventListener("click", function() {
            self.buy("dpc", "sharpeningKit");
        });

        buySurvivor.addEventListener("click", function() {
            self.buy("dps", "survivor");
        });

        closeSettingsBtn.addEventListener("click", this.settingsClick);
        closeShopBtn.addEventListener("click", this.shopClick);
        sellBrainsButton.addEventListener("click", this.sellBrains);
        settingsBtn.addEventListener("click", this.settingsClick);
        settingsSaveLoadBtn.addEventListener("click", this.load);
        settingsSaveResetBtn.addEventListener("click", function() {
            if (confirm('Are you sure you want to reset your data?')) {
                self.resetSave();
            }
        });

        settingsSaveSaveBtn.addEventListener("click", this.save);
        shopBtn.addEventListener("click", this.shopClick);
        shopDpcBtn.addEventListener("click", function() {
            self.shopTabs("dpc");
        });

        shopDpsBtn.addEventListener("click", function() {
            self.shopTabs("dps");
        });

        shopMultiplierBtn.addEventListener("click", function() {
            self.shopTabs("multipliers");
        });
        
        // Probably the most important line in the game :)
        zombieButton.addEventListener("click", this.zombieClick); 
    }

    brainValue() {
        return this.data.userData.brains * ((this.data.userData.upgrades.multipliers.brainEnrichment.level * 3) + 3);
    }

    buy(category, item) {
        // BuyItem Returns updated UserData
        this.data.userData = this.shop.buyItem(category, item, this.data.userData);
        this.updateUI();
    }

    clickAnimation() {
        // Zombie bounce onClick      
        zombieButton.style.top = "-5px";
        setTimeout(function() {
            zombieButton.style.top = "0px";
        }, 100);

        // Zombie Damage indicator
        const x = event.clientX + 10;
        const y = event.clientY - 40;
        const uniqueID = (new Date).getTime(); // use epoch as uid
        const damageSpan = document.createElement("span");
        let damageValue = this.clickDamage();

        damageSpan.innerHTML = "-" + damageValue;
        damageSpan.id = uniqueID;
        damageSpan.classList.add("dmg")
        damageSpan.dataset.itter = 10;
        damageSpan.dataset.uid = uniqueID;
        damageSpan.dataset.x = x;
        damageSpan.dataset.y = y;
        damageSpan.style.top = y + "px";
        damageSpan.style.left= x + "px";

        document.body.appendChild(damageSpan);

        const interval = setInterval(function() {
            const element = document.getElementById(damageSpan.dataset.uid);
            element.dataset.itter--;
            element.dataset.x = parseInt(element.dataset.x) + 25;
            element.dataset.y = parseInt(element.dataset.y) - 75;
            element.style.top = element.dataset.y + "px";
            element.style.left= element.dataset.x + "px";
            element.style.opacity = (parseInt(element.dataset.itter) / 10);

            if (element.dataset.itter <= 0) {
                clearInterval(interval);
                if (element != null) {
                    element.parentNode.removeChild(element);
                }
            }
        }, 100);
    }

    clickDamage() {
        const sharpeningKitDamage = this.data.userData.upgrades.dpc.sharpeningKit.level * this.data.shopData.dpc.sharpeningKit.damage;
        const gripUpgradeDamage = this.data.userData.upgrades.dpc.gripUpgrade.level * this.data.shopData.dpc.gripUpgrade.damage;
        return 1 + sharpeningKitDamage + gripUpgradeDamage;
    }

    load() {
        const savedata = localStorage.getItem("savedata");
        // check if not empty or undefined
        if (!(savedata == null) && !(savedata == "undefined")) {
            let savedData = JSON.parse(savedata); // get saved data
            let templateData = this.data.userData;
            // merge saved data with base data to solve issues with old json
            let mainData = {};
            for(var _obj in templateData) mainData[_obj ] = templateData[_obj];
            for(var _obj in savedData) mainData[_obj ] = savedData[_obj];
            this.data.userData = mainData;
        }
    }

    resetSave() {
        localStorage.removeItem("savedata");
        console.log("Save removed");
        location.reload();
    }

    save() {
        localStorage.removeItem("savedata");
        localStorage.setItem("savedata", JSON.stringify(this.data.userData));
        console.log("saved!")
    }

    savedata() {
        if (typeof(Storage) !== "undefined") {
            this.load(); // try to load data,
            this.save(); // run save now and every 30 seconds
            const self = this;
            setInterval(
                function() {
                    self.save()
                },
                30000 // 30 seconds
            );
        } else {
            alert("Your browser doesn't support LocalStorage so unfortunately, you will not be able to save any progress :(");
        }
    }

    sellBrains() {
        
        this.data.userData.money = this.data.userData.money + this.brainValue();
        this.data.userData.brains = 0;
        this.updateUI();
    }

    settingsClick() {
        if (!settingsOpen) {
            settingsOpen = true;
            settingsModal.style.display = "block";
            settingsModal.style.visibility = "visible";
        } else {
            settingsOpen = false;
            settingsModal.style.display = "none";
            settingsModal.style.visibility = "hidden";
        }
    }

    shopClick() {
        if (!shopOpen) {
            shopOpen = true;
            shopModal.style.display = "block";
            shopModal.style.visibility = "visible";
        } else {
            shopOpen = false;
            shopModal.style.display = "none";
            shopModal.style.visibility = "hidden";
        }
    }

    shopTabs(tab) {
        if (tab == "dpc") {
            // Tabs
            shopDpcTab.style.display = "block";
            shopDpsTab.style.display = "none";
            shopMultiplierTab.style.display = "none";
            // Buttons
            shopDpcBtn.classList.add("active");
            shopDpsBtn.classList.remove("active");
            shopMultiplierBtn.classList.remove("active");
        } else if (tab == "dps") {
            // Tabs
            shopDpcTab.style.display = "none";
            shopDpsTab.style.display = "block";
            shopMultiplierTab.style.display = "none";
            // Buttons
            shopDpcBtn.classList.remove("active");
            shopDpsBtn.classList.add("active");
            shopMultiplierBtn.classList.remove("active");
        } else if (tab == "multipliers") {
            // Tabs
            shopDpcTab.style.display = "none";
            shopDpsTab.style.display = "none";
            shopMultiplierTab.style.display = "Block";
            // Buttons
            shopDpcBtn.classList.remove("active");
            shopDpsBtn.classList.remove("active");
            shopMultiplierBtn.classList.add("active");
        }
    }

    updateUI() {
        //
        // Shop UI
        //

        sellBrainsButton.innerHTML = `Sell ${this.data.userData.brains} Brains for £${this.brainValue()}`;

        const advSpnLvl = this.data.userData.upgrades.multipliers.advancedSpoon.level;
        advancedSpoonCost.innerHTML = `£${this.shop.cost("multipliers", "advancedSpoon", advSpnLvl)}`;
        advancedSpoonLevel.innerHTML = advSpnLvl;
        
        const brnEnrchLvl = this.data.userData.upgrades.multipliers.brainEnrichment.level;
        brainEnrichmentCost.innerHTML = `£${this.shop.cost("multipliers", "brainEnrichment", brnEnrchLvl)}`;
        brainEnrichmentLevel.innerHTML = brnEnrchLvl;
        
        const grpUpgrLvl = this.data.userData.upgrades.dpc.gripUpgrade.level;
        gripUpgradeCost.innerHTML = `£${this.shop.cost("dpc", "gripUpgrade", grpUpgrLvl)}`;
        gripUpgradeLevel.innerHTML = grpUpgrLvl;
        
        const shpKitLvl = this.data.userData.upgrades.dpc.sharpeningKit.level;
        sharpeningKitCost.innerHTML = `£${this.shop.cost("dpc", "sharpeningKit", shpKitLvl)}`;
        sharpeningKitLevel.innerHTML = shpKitLvl;
        
        const survLvl = this.data.userData.upgrades.dps.survivor.level;
        survivorCost.innerHTML = `£${this.shop.cost("dps", "survivor", survLvl)}`;
        survivorLevel.innerHTML = survLvl;

        //
        // Health
        //

        zombieHealthCurrent.innerHTML = parseInt(this.data.userData.zombie.current);
        zombieHealthTotal.innerHTML = parseInt(this.data.userData.zombie.total);

        //
        // Header Stats
        //
        
        if (this.data.brains == 1) {
            brains.innerHTML = `${this.data.userData.brains} Brain`; // Due to annoying english
        } else {                                            // 0 Brains, 1 Brain, x>1 Brains
            brains.innerHTML = `${this.data.userData.brains} Brains`;
        }

        money.innerHTML = `£${this.data.userData.money}`;
        level.innerHTML = `Level ${this.data.userData.level} | ${this.data.userData.kills} Kills`;
        
        //
        // Health bar
        //
        
        healthBar.classList.remove("bar-green");
        healthBar.classList.remove("bar-amber");
        healthBar.classList.remove("bar-red");

        const percentage = ((this.data.userData.zombie.current / this.data.userData.zombie.total) * 100);
        
        if (percentage >= 50) {
            healthBar.classList.add("bar-green");
        } else if ((percentage < 50) && (percentage > 20)) {
            healthBar.classList.add("bar-amber");
        } else {
            healthBar.classList.add("bar-red");
        }
        
        healthBar.style.width = percentage + "%";

        //
        // Zombie Image
        //
        
        if (this.data.userData.zombie.current == 0) {
            zombieButton.classList.add("dead");
        } else {
            zombieButton.classList.remove("dead");
        }
    }

    zombieClick() {
        this.data.userData.clicks++;
        this.data.userData.zombie.current = this.data.userData.zombie.current - this.clickDamage();
        if (this.data.userData.zombie.current < 0) {
            this.zombieDead();
        }
        this.updateUI();
        this.clickAnimation();
    }

    zombieDead() {
        // set kills and add correct num of brains to the users data
        this.data.userData.kills++;
        this.data.userData.brains = this.data.userData.brains + this.data.userData.upgrades.multipliers.advancedSpoon.level + 1;
        
        // level formula
        const formula = Math.pow(this.data.userData.level, 3) + 20;
        if (this.data.userData.kills > formula) {
            this.data.userData.level++;
            console.log(`LevelUp: ${this.data.userData.kills} > ${formula}`)
            this.data.userData.zombie.total = Math.pow(this.data.userData.level, 3) + 20;
        }

        this.data.userData.zombie.current = this.data.userData.zombie.total;
    }
}

// Initialise Classes and pass them through to each other
(() => {
    let data = new Data();
    let shop = new Shop(data.shopData);
    let game = new Game(data, shop);
})()
