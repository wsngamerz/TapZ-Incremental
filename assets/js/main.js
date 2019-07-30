// 
// TapZ Incremental
// main.js
// 


// Data Elements
const BrainsSellSpan = document.getElementsByClassName("brains-sell")[0]
const BrainSpans = document.getElementsByClassName("brains")
const MoneySpans = document.getElementsByClassName("money")

// Modal Elements
const Modals = document.getElementsByClassName("modal")
const SettingsModal = document.getElementsByClassName("modal-settings")[0]
const ShopModal = document.getElementsByClassName("modal-shop")[0]

// Tab Elements
const Tabs = document.getElementsByClassName("tab")
const DpcTab = document.getElementsByClassName("tab-dpc")[0]
const DpsTab = document.getElementsByClassName("tab-dps")[0]
const MultipliersTab = document.getElementsByClassName("tab-multipliers")[0]

const TabButtons = document.getElementsByClassName("tab-btn")
const DpsTabButton = document.getElementsByClassName("tab-btn-dps")[0]
const DpcTabButton = document.getElementsByClassName("tab-btn-dpc")[0]
const MultipliersTabButton = document.getElementsByClassName("tab-btn-multipliers")[0]

// Button Elements
const SellBrainsButton = document.getElementsByClassName("button-sellbrains")[0]
const SettingsButton = document.getElementsByClassName("button-settings")[0]
const ShopButton = document.getElementsByClassName("button-shop")[0]
const CloseModalButtons = document.getElementsByClassName("button-closemodal")

// Shop Elements
const BuyShopItemButtons = document.getElementsByClassName("shop-item-button")
const ShopItemLevels = document.getElementsByClassName("shop-item-level")

// Settings Buttons
const DamageIndicatorToggle = document.getElementsByClassName("settings-button-damageindicator")[0]
const SaveButton = document.getElementsByClassName("settings-button-save")[0]
const LoadButton = document.getElementsByClassName("settings-button-load")[0]
const ResetButton = document.getElementsByClassName("settings-button-reset")[0]

// Misc Elements
const HealthBarCurrent = document.getElementsByClassName("current-health")[0]
const VersionSpan = document.getElementById("version")
const Zombie = document.getElementsByClassName("zombie")[0]
const ZombieHealthCurrent = document.getElementsByClassName("zombie-current-health")[0]
const ZombieHealthTotal = document.getElementsByClassName("zombie-total-health")[0]

// Statistic Elements
const StatisticDPC = document.getElementById("statistics-dpc")
const StatisticDPS = document.getElementById("statistics-dps")
const StatisticKills = document.getElementById("statistics-kills")
const StatisticClicks = document.getElementById("statistics-clicks")
const StatisticLevel = document.getElementById("statistics-level")
const StatisticBPK = document.getElementById("statistics-bpk")
const StatisticMPB = document.getElementById("statistics-mpb")


class TapZ {
    constructor() {
        this.saveData = new Save()
        this.shop = new Shop(this.saveData, this.update)

        // Do I really need to say what these do?
        this.addEventListeners()

        console.log("TapZ Incremental")
        console.log(`v${ this.saveData.gameData.version }`)
        VersionSpan.innerText = `v${ this.saveData.gameData.version }`

        this.saveData.load()
        this.update()

        setInterval(() => {
            this.saveData.save()
        }, 10000);

        setInterval(() => {
            this.handleDPS()
        }, 1000)

    }


    addEventListeners = () => {
        // Apply to every modal
        Array.from(Modals).forEach(element => {
            element.addEventListener("click", (event) => {
                // Add check to ensure modal will only close on the background click
                // of the modal, not the children elements such as the actual content
                if (event.currentTarget !== event.target) {
                    return
                }

                this.toggleModal("")
            })  
        })

        // Close Modals when close modal button clicked
        Array.from(CloseModalButtons).forEach(button => button.addEventListener("click", () => this.toggleModal("")))

        SellBrainsButton.addEventListener("click", () => {
            this.shop.sellBrains()
            this.update()
        })

        // Modal Opening Buttons
        SettingsButton.addEventListener("click", () => this.toggleModal("settings"))
        ShopButton.addEventListener("click", () => this.toggleModal("shop"))

        // Tab Changing Buttons
        DpcTabButton.addEventListener("click", () => this.toggleTab("dpc"))
        DpsTabButton.addEventListener("click", () => this.toggleTab("dps"))
        MultipliersTabButton.addEventListener("click", () => this.toggleTab("multipliers"))

        // Settings
        DamageIndicatorToggle.addEventListener("click", () => this.editSettings("showDamage"))
        SaveButton.addEventListener("click", () => this.saveData.save())
        LoadButton.addEventListener("click", () => this.saveData.load())
        ResetButton.addEventListener("click", () => this.saveData.reset())
        
        // Zombie Click (obvs!)
        Zombie.addEventListener("click", this.click)
        Zombie.addEventListener("touchstart", this.multiTouch)
    }


    multiTouch = (event) => {
        // Hopefully prevent click event so no double-calling
        event.preventDefault()

        // get only the most recent touch
        const lastTouch = event.touches[event.touches.length - 1]

        // Fake a click event and send that to the onclick function
        const clickEvent = new MouseEvent("click", {
            clientX: lastTouch.clientX,
            clientY: lastTouch.clientY
        })

        this.click(clickEvent)
    }


    click = (event) => {
        this.saveData.userData.statistics.clicks++
        
        this.injureZombie(this.saveData.userData.dpc)

        // Allows for people to turn off damage indicators if it causes performance issues 
        // and/or gets in the way of taps on mobile for example
        if (this.saveData.userData.options.showDamage) {
            this.damageIndicator(event.x, event.y)
        }

        // Update after click
        this.update()
    }


    damageIndicator = (clickX, clickY) => {
        // If x and y exists
        if ((clickX != 0) && (clickY != 0)) {
            // Create a damage indicator
            const uid = (new Date).getTime() // Use the time in ms as a unique id
            const damageElement = document.createElement("span")

            // Set the damage indicators data and styles
            damageElement.innerHTML = `-${ this.saveData.userData.dpc }`
            damageElement.id = uid
            damageElement.classList.add("damage-indicator")
            damageElement.dataset.itter = 10
            damageElement.dataset.uid = uid
            damageElement.dataset.x = clickX
            damageElement.dataset.y = clickY
            damageElement.style.top = `${ clickY - 40 }px`
            damageElement.style.left = `${ clickX + 20 }px`

            document.body.appendChild(damageElement)

            // Update position of damage element every 100ms
            const interval = setInterval(() => {
                damageElement.dataset.itter--
                damageElement.dataset.x = parseInt(damageElement.dataset.x) + 25
                damageElement.dataset.y = parseInt(damageElement.dataset.y) - 75
                damageElement.style.top = `${ damageElement.dataset.y }px`
                damageElement.style.left = `${ damageElement.dataset.x }px`
                damageElement.style.opacity = damageElement.dataset.itter / 10

                if (damageElement.dataset.itter <= 0) {
                    clearInterval(interval)

                    if (damageElement != null) {
                        damageElement.parentNode.removeChild(damageElement)
                    }
                }

            }, 100)
        }
    }


    editSettings = (setting, value) => {
        const currentValue = this.saveData.userData.options[setting]

        if (typeof(currentValue) == "boolean") {
            // If the value is a boolean, it must be a toggle
            if (currentValue) {
                this.saveData.userData.options[setting] = false
            } else {
                this.saveData.userData.options[setting] = true
            }
        } else {
            // otherwise just set the value
            this.saveData.userData.options[setting] = value
        }
        
        this.update()
    }


    handleDPS = () => {
        this.injureZombie(this.saveData.userData.dps)
        this.update()
    }


    injureZombie = (damage) => {
        this.saveData.userData.zombie.currentHealth -= damage

        if (this.saveData.userData.zombie.currentHealth <= 0) {
            this.killZombie()
        }

        if (damage > 0) {
            // Switch to a different animation (gif) and switch back after 300ms
            Zombie.classList.add("zombie-hurt")
            setTimeout(() => Zombie.classList.remove("zombie-hurt"), 300)
        }

    }


    killZombie = () => {
        this.saveData.userData.statistics.kills++
        this.saveData.userData.brains += this.saveData.userData.bpk
        this.saveData.userData.zombie.currentHealth = this.saveData.userData.zombie.totalHealth
    }


    toggleModal = (modal) => {
        if (this.saveData.gameData.modalOpen) {
            // Close the modals
            Array.from(Modals).forEach(modal => modal.classList.remove("modal-visible"))

            this.saveData.gameData.modalOpen = false
        } else {
            // Open the modal
            switch(modal) {
                case "shop":
                    ShopModal.classList.add("modal-visible")
                    break
                
                case "settings":
                    SettingsModal.classList.add("modal-visible")
                    break
                
                case "":
                    // Handle for the click off modal
                    break
                
                default:
                    console.log(`Error, unknown modal: ${ modal }`)
            }

            this.saveData.gameData.modalOpen = true
        }
    }


    toggleTab = (tab) => {
        // Remove active and visible from all tabs and their corresponding buttons
        Array.from(TabButtons).forEach(button => button.classList.remove("tab-btn-active"))
        Array.from(Tabs).forEach(tab => tab.classList.remove("tab-visible"))

        switch(tab) {
            case "dpc":
                DpcTabButton.classList.add("tab-btn-active")
                DpcTab.classList.add("tab-visible")
                break
            
            case "dps":
                DpsTabButton.classList.add("tab-btn-active")
                DpsTab.classList.add("tab-visible")
                break
            
            case "multipliers":
                MultipliersTabButton.classList.add("tab-btn-active")
                MultipliersTab.classList.add("tab-visible")
                break
            
            default:
                console.log(`Unknown Tab: ${ tab }`)
        }
    }


    update = () => {
        this.updateHealth()

        BrainsSellSpan.innerHTML = `£${ this.shop.sellBrainsCost() }`
        
        // Update all of the brain and money elements
        Array.from(BrainSpans).forEach(element => element.innerHTML = `${ this.saveData.userData.brains } Brains`)
        Array.from(MoneySpans).forEach(element => element.innerHTML = `£${ Math.round(this.saveData.userData.money) }`)

        // Update Settings Buttons
        DamageIndicatorToggle.innerText = `Damage Indicators: ${ this.saveData.userData.options.showDamage ? 'ON' : 'OFF' }`

        // Update shop buttons
        Array.from(BuyShopItemButtons).forEach(element => {
            const itemData = this.shop.getItem(element.getAttribute("data-id"))
            element.innerText = `Buy x1 ${ itemData.text.name } for £${ this.shop.getItemCost(itemData) }`
        })

        // Update Shop Levels
        Array.from(ShopItemLevels).forEach(shopItemLevel => {
            shopItemLevel.innerText = `Level: ${ this.saveData.userData.upgrades[shopItemLevel.getAttribute("data-id")].level }`
        })

        // Statistics
        StatisticClicks.innerText = this.saveData.userData.statistics.clicks
        StatisticDPC.innerText = this.saveData.userData.dpc
        StatisticDPS.innerText = this.saveData.userData.dps
        StatisticKills.innerText = this.saveData.userData.statistics.kills
        StatisticLevel.innerText = 0
        StatisticBPK.innerText = this.saveData.userData.bpk
        StatisticMPB.innerText = `£${ this.saveData.userData.mpb }`

        // Zombie health
        ZombieHealthCurrent.innerHTML = this.saveData.userData.zombie.currentHealth
        ZombieHealthTotal.innerHTML = this.saveData.userData.zombie.totalHealth
    }


    updateHealth = () => {
        const percentage = ( this.saveData.userData.zombie.currentHealth / this.saveData.userData.zombie.totalHealth ) * 100

        if (percentage > 50) {
            HealthBarCurrent.classList.remove("health-amber", "health-red")
            HealthBarCurrent.classList.add("health-green")
        } else if (percentage > 25) {
            HealthBarCurrent.classList.remove("health-green", "health-red")
            HealthBarCurrent.classList.add("health-amber")
        } else {
            HealthBarCurrent.classList.remove("health-green", "health-amber")
            HealthBarCurrent.classList.add("health-red")
        }

        HealthBarCurrent.style.width = `${ percentage }%`
    }
}



// Create an instance of the TapZ class once page loaded
window.onload = (() => new TapZ())
