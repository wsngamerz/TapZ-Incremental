// 
// TapZ Incremental
// main.js
// 

// regular imports
import Save from "./savedata"
import Shop from "./shop"
import { formatNumber } from "./utils"

// Data Elements
const BrainsSellSpan = document.getElementsByClassName("brains-sell")[0]
const BrainSpans = document.getElementsByClassName("brains")
const MoneySpans = document.getElementsByClassName("money")
const LevelSpan = document.getElementsByClassName("level")[0]

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

// Main Menu
const MenuButtons = document.getElementsByClassName("menubutton")
const ModalPages = document.getElementsByClassName("modalpage")
const MenuBackButton = document.getElementsByClassName("button-menuback")[0]

const MainModalPage = document.getElementsByClassName("modalpage-main")[0]
const DisplayModalPage = document.getElementsByClassName("modalpage-display")[0]
const SaveModalPage = document.getElementsByClassName("modalpage-saving")[0]
const AudioModalPage = document.getElementsByClassName("modalpage-audio")[0]
const StatisticsModalPage = document.getElementsByClassName("modalpage-statistics")[0]
const AboutModalPage = document.getElementsByClassName("modalpage-about")[0]
const CreditsModalPage = document.getElementsByClassName("modalpage-credits")[0]

const DisplaySettingsButton = document.getElementsByClassName("menubutton-display")[0]
const SaveSettingsButton = document.getElementsByClassName("menubutton-saving")[0]
const AudioSettingsButton = document.getElementsByClassName("menubutton-audio")[0]
const StatisticsSectionButton = document.getElementsByClassName("menubutton-statistics")[0]
const AboutSectionButton = document.getElementsByClassName("menubutton-about")[0]
const CreditsSectionButton = document.getElementsByClassName("menubutton-credits")[0]

// Settings Elements
const DamageIndicatorToggle = document.getElementsByClassName("settings-button-damageindicator")[0]
const AnimationsToggle = document.getElementsByClassName("settings-button-animations")[0]
const SmoothHealthToggle = document.getElementsByClassName("settings-button-smoothhealth")[0]
const NumberFormatDropdown = document.getElementsByClassName("settings-dropdown-numberformatting")[0]
const SaveButton = document.getElementsByClassName("settings-button-save")[0]
const LoadButton = document.getElementsByClassName("settings-button-load")[0]
const ResetButton = document.getElementsByClassName("settings-button-reset")[0]
const MuteMusicButton = document.getElementsByClassName("settings-button-mutemusic")[0]
const MuteSFXButton = document.getElementsByClassName("settings-button-mutesfx")[0]
const MusicVolumeSlider = document.getElementsByClassName("settings-slider-musicvolume")[0]
const SFXVolumeSlider = document.getElementsByClassName("settings-slider-sfxvolume")[0]

// Misc Elements
const HealthBarCurrent = document.getElementsByClassName("current-health")[0]
const VersionSpan = document.getElementById("version")
const Zombie = document.getElementsByClassName("zombie")[0]
const ZombieHit = document.getElementsByClassName("zombieHit")[0]
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
const StatisticMoneyNumber = document.getElementById("statistics-money-number")
const StatisticBrainsNumber = document.getElementById("statistics-brains-number")


class TapZ {
    constructor() {
        // Setup BigNumber
        BigNumber.config({
            EXPONENTIAL_AT: 1e+9
        })

        this.saveData = new Save()
        this.shop = new Shop(this.saveData)
        this.shop.update = this.update
        this.shop.playSFX = this.playSFX
        this.animations = {}
        this.currentAnimation = "idle"

        this.musicPlayer = new Audio("/assets/audio/the_last_encounter_loop.mp3")
        this.sfxPlayers = []
        this.currentlyPlaying = 0
        
        // needs to be setup before event listeners added
        this.setupAnimations()

        // Do I really need to say what these do?
        this.addEventListeners()

        console.log("TapZ Incremental")
        console.log(`v${ this.saveData.gameData.version }`)
        VersionSpan.innerText = `v${ this.saveData.gameData.version }`

        // used for logging
        window.TAPZ_VERSION_NAME = this.saveData.gameData.version

        // print some debug info to console
        const deviceInfo = {
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            appVersion: navigator.appVersion,
            vendor: navigator.vendor,
            opera: window.opera,
            language: navigator.language,
            screen: [
                window.screen.width,
                window.screen.height,
                window.screen.availWidth,
                window.screen.availHeight
            ],
            dpr: window.devicePixelRatio
        }
        console.debug("[DEBUG] Device Info", deviceInfo)

        this.saveData.load()
        this.setupMusic()
        this.update()

        setInterval(() => {
            this.saveData.save()
        }, 10000);

        setInterval(() => {
            this.handleDPS()
        }, 1000)

    }


    addEventListeners = () => {
        document.body.addEventListener("click", (event) => {
            // Since autoplay is blocked by most browsers
            this.playMusic()
            document.body.onclick = null
        }, true)

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
            this.playSFX("buttonClick")
            this.shop.sellBrains()
            this.update()
        })

        // Modal Opening Buttons
        SettingsButton.addEventListener("click", () => this.toggleModal("settings"))
        ShopButton.addEventListener("click", () => this.toggleModal("shop"))

        // Settings Modal Buttons
        MenuBackButton.addEventListener("click", () => this.toggleMenu("main"))
        DisplaySettingsButton.addEventListener("click", () => this.toggleMenu("display"))
        SaveSettingsButton.addEventListener("click", () => this.toggleMenu("saving"))
        AudioSettingsButton.addEventListener("click", () => this.toggleMenu("audio"))
        StatisticsSectionButton.addEventListener("click", () => this.toggleMenu("statistics"))
        AboutSectionButton.addEventListener("click", () => this.toggleMenu("about"))
        CreditsSectionButton.addEventListener("click", () => this.toggleMenu("credits"))

        // Tab Changing Buttons
        DpcTabButton.addEventListener("click", () => this.toggleTab("dpc"))
        DpsTabButton.addEventListener("click", () => this.toggleTab("dps"))
        MultipliersTabButton.addEventListener("click", () => this.toggleTab("multipliers"))

        // Settings
        DamageIndicatorToggle.addEventListener("click", () => this.editSettings("showDamage"))
        AnimationsToggle.addEventListener("click", () => this.editSettings("animations"))
        SmoothHealthToggle.addEventListener("click", () => this.editSettings("smoothHealth"))
        SaveButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.saveData.save()
        })
        LoadButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.saveData.load()
        })
        ResetButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.saveData.reset()
        })
        MuteMusicButton.addEventListener("click", () => this.editSettings("mutemusic"))
        MuteSFXButton.addEventListener("click", () => this.editSettings("mutesfx"))
        MusicVolumeSlider.addEventListener("change", (event) => this.editSettings("musicvolume", event.target.value / 100))
        SFXVolumeSlider.addEventListener("change", (event) => this.editSettings("sfxvolume", event.target.value / 100))
        NumberFormatDropdown.addEventListener("change", (event) => this.editSettings("numberFormat", event.target.options[event.target.options.selectedIndex].value))
        
        // Zombie Click (obvs!)
        Zombie.addEventListener("click", this.click)
        Zombie.addEventListener("touchstart", this.multiTouch)

        // Zombie animations
        this.animations["idle"].onComplete = () => {
            if (this.currentAnimation == "damaged") {
                this.animations["idle"].stop()
                this.animations["idle"].hide()
                // reset speed and direction
                this.animations["idle"].setSpeed(1)
                this.animations["idle"].setDirection(1)

                this.animations["damaged"].goToAndPlay(0)
                this.animations["damaged"].show()
                this.animations["damaged"].setSpeed(4)
            }
        }

        this.animations["damaged"].onLoopComplete = () => {
            this.animations["damaged"].hide()
            this.animations["damaged"].stop()

            this.animations["idle"].setSpeed(1)
            this.animations["idle"].setDirection(1)
            this.animations["idle"].playSegments([0, this.animations["idle"].animationData.op], true)
            this.animations["idle"].loop = true
            this.animations["idle"].show()
            this.currentAnimation = "idle"
        }
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
        this.playSFX("zombieHit")

        this.saveData.userData.statistics.clicks = this.saveData.userData.statistics.clicks.plus(1)
        
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

        this.playSFX("buttonClick")
        
        if (setting == "mutemusic") {
            if (this.saveData.userData.options["mutemusic"]) {
                this.setMusicVolume(0.0)
                this.pauseMusic()
            } else {
                this.setMusicVolume(this.saveData.userData.options.musicvolume)
                this.playMusic()
            }
        }

        this.update()
    }


    handleDPS = () => {
        // only cause an update if needed to
        if (this.saveData.userData.dps.gt(0)) {
            this.injureZombie(this.saveData.userData.dps)
            this.update()
        }
    }


    injureZombie = (damage) => {
        this.saveData.userData.zombie.currentHealth = this.saveData.userData.zombie.currentHealth.minus(damage)

        if (this.saveData.userData.zombie.currentHealth.lte(0)) {
            this.killZombie()
        }

        if (damage.gt(0) && this.saveData.userData.options.animations) {
            this.currentAnimation = "damaged"
            this.animations["idle"].loop = false
            this.animations["idle"].pause()
            this.animations["idle"].setSpeed(8)

            let currentFrame = this.animations["idle"].currentFrame
            if (this.animations["idle"].totalFrames - currentFrame < currentFrame) {
                this.animations["idle"].setDirection(1)
                this.animations["idle"].playSegments([currentFrame, this.animations["idle"].totalFrames], true)
            } else {
                this.animations["idle"].setDirection(-1)
                this.animations["idle"].playSegments([currentFrame, 0], true)
            }
            
        }

    }


    killZombie = () => {
        this.saveData.userData.statistics.kills = this.saveData.userData.statistics.kills.plus(1)

        let killLevelTarget = this.saveData.userData.level.plus(1).pow(3).plus(15).multipliedBy(0.75).dp(0)

        // if next level
        if (this.saveData.userData.statistics.kills.gt(killLevelTarget)) {
            this.saveData.userData.level = this.saveData.userData.level.plus(1)
            this.saveData.userData.zombie.totalHealth = killLevelTarget.minus(5)

            console.debug("Level", this.saveData.userData.level.toString(10),"Required", killLevelTarget.toString(10), "kills")
            console.debug("Zombie health is now", this.saveData.userData.zombie.totalHealth.toString(10))
        }
        
        this.saveData.userData.brains = this.saveData.userData.brains.plus(this.saveData.userData.bpk)
        this.saveData.userData.statistics.totalBrains = this.saveData.userData.statistics.totalBrains.plus(this.saveData.userData.bpk)

        this.saveData.userData.zombie.currentHealth = this.saveData.userData.zombie.totalHealth
    }


    playMusic = () => {
        if (this.musicPlayer.paused && !this.saveData.userData.options.mutemusic && this.saveData.userData.options.musicvolume != 0) {
            const promise = this.musicPlayer.play()
            
            if (promise !== undefined) {
                promise.then(() => {
                    console.debug("Autoplayed Background Music")    
                }).catch((error) => {
                    console.debug("Handled Error", error)
                    console.debug("This is likely to be an issue with autoplay being blocked!")
                })
            }
        }
    }


    pauseMusic = () => {
        if (!this.musicPlayer.paused) {
            this.musicPlayer.pause()
        }
    }


    playSFX = (sfx) => {
        // TODO: Load all audio clips before hand and store the blob-id's
        //       then play via AudioContext which adds the bonus of gain, reverb etc
        if (!this.saveData.userData.options.mutesfx) {
            // try to find a free 'audio channel'
            let sfxPlayer = null
            for (let player of this.sfxPlayers) {
                if (player.paused) {
                    sfxPlayer = player
                    break
                }
            }
        
            // create another 'audio channel' if unable to find a free one
            if (!sfxPlayer) {
                sfxPlayer = new Audio()
                this.sfxPlayers.push(sfxPlayer)
            }
            
            sfxPlayer.onplay = () => this.currentlyPlaying++
            sfxPlayer.onended = () => this.currentlyPlaying--
            sfxPlayer.volume = this.saveData.userData.options.sfxvolume
        
            switch(sfx) {
                case "buttonClick":
                    sfxPlayer.src = "/assets/audio/click.mp3"
                    sfxPlayer.play()
                    break
                    
                case "zombieHit":
                    if ((Math.random() >= 0.85) && (this.currentlyPlaying < 3)) { // 15% chance of playing if less than 3 sounds already playing
                        const zombieSound = `/assets/audio/zombie_${ Math.floor(Math.random() * 24) + 1 }.mp3`
                        sfxPlayer.src = zombieSound
                        sfxPlayer.play()
                    }
                    break
            }
        }
    }

            
    setMusicVolume = (volume) => {
        this.musicPlayer.volume = volume
    }
            

    setupMusic = () => {
        this.musicPlayer.volume = this.saveData.userData.options.musicvolume
        this.musicPlayer.loop = true
        this.playMusic() // this probably won't work in modern browsers due to autoplay being blocked without a user interaction
    }


    setupAnimations = () => {
        this.animations["idle"] = lottie.loadAnimation({
            container: Zombie,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            path: "assets/data/zombie/idle.json"
        })

        this.animations["damaged"] = lottie.loadAnimation({
            container: ZombieHit,
            renderer: "svg",
            loop: true,
            autoplay: false,
            path: "assets/data/zombie/damaged.json"
        })

        this.animations["damaged"].hide()
        this.saveData.userData.options.animations ? this.animations["idle"].play() : this.animations["idle"].pause()
    }


    toggleModal = (modal) => {
        this.saveData.gameData.currentModal = modal

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
                    this.toggleMenu("main")
                    break
                
                case "":
                    // Handle for the click off modal
                    break
                
                default:
                    console.log(`Error, unknown modal: ${ modal }`)
            }

            this.saveData.gameData.modalOpen = true
        }

        // trigger update as the modal wouldn't have been updated until its open
        this.update()
        this.playSFX("buttonClick")
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

        this.playSFX("buttonClick")
    }

    toggleMenu = (menu) => {
        Array.from(ModalPages).forEach(menu => menu.classList.remove("modalpage-visible"))

        if (menu == "main") { MenuBackButton.classList.remove("button-visible") }
        else { MenuBackButton.classList.add("button-visible") }

        switch(menu) {
            case "main":
                MainModalPage.classList.add("modalpage-visible")
                break

            case "display":
                DisplayModalPage.classList.add("modalpage-visible")
                break

            case "saving":
                SaveModalPage.classList.add("modalpage-visible")
                break

            case "audio":
                AudioModalPage.classList.add("modalpage-visible")
                break

            case "statistics":
                StatisticsModalPage.classList.add("modalpage-visible")
                break

            case "about":
                AboutModalPage.classList.add("modalpage-visible")
                break

            case "credits":
                CreditsModalPage.classList.add("modalpage-visible")
                break

            default:
                console.log("Unknown Menu")
                MainModalPage.classList.add("modalpage-visible")
        }

        this.playSFX("buttonClick")
    }

    update = () => {
        this.updateHealth()

        BrainsSellSpan.innerText = `£${ formatNumber(this.shop.sellBrainsValue(), this.saveData.userData.options.numberFormat) }`
        if (this.saveData.userData.brains.eq(0)) {
            BrainsSellSpan.parentElement.setAttribute("disabled", true)
        } else {
            BrainsSellSpan.parentElement.removeAttribute("disabled")
        }
        
        // Update all of the data elements
        Array.from(BrainSpans).forEach(element => element.innerText = `${ formatNumber(this.saveData.userData.brains, this.saveData.userData.options.numberFormat) } Brains`)
        Array.from(MoneySpans).forEach(element => element.innerText = `£${ formatNumber(this.saveData.userData.money, this.saveData.userData.options.numberFormat) }`)
        LevelSpan.innerText = this.saveData.userData.level

        // try to only update whats currently being displayed on screen
        if (this.saveData.gameData.currentModal == "shop") {
            // Update shop buttons
            Array.from(BuyShopItemButtons).forEach(element => {
                const itemData = this.shop.getItem(element.getAttribute("data-shopid"))
                element.innerText = `Buy x1 ${ itemData.text.name } for £${ formatNumber(this.shop.getItemCost(itemData), this.saveData.userData.options.numberFormat) }`
            })
    
            // Update Shop Levels
            Array.from(ShopItemLevels).forEach(shopItemLevel => {
                shopItemLevel.innerText = `Level: ${ this.saveData.userData.upgrades[shopItemLevel.getAttribute("data-shopid")].level }`
            })

            // Update 'able to afford' button styles
            const shopButtons = document.querySelectorAll("button[data-shopid].shop-item-button")
            shopButtons.forEach(shopButton => {
                const shopItemID = shopButton.getAttribute("data-shopid")
                const shopItemCost = this.shop.getItemCost(this.shop.getItem(shopItemID))
                if (shopItemCost.gt(this.saveData.userData.money)) {
                    // too expensive
                    shopButton.setAttribute("disabled", true)
                } else {
                    // affordable
                    shopButton.removeAttribute("disabled")
                }
            })

        } else if (this.saveData.gameData.currentModal == "settings") {
            // Update Settings Buttons
            DamageIndicatorToggle.innerText = `Damage Indicators: ${ this.saveData.userData.options.showDamage ? 'ON' : 'OFF' }`
            AnimationsToggle.innerText = `Animations: ${ this.saveData.userData.options.animations ? 'ON' : 'OFF' }`
            SmoothHealthToggle.innerText = `Smooth Healthbar: ${ this.saveData.userData.options.smoothHealth ? 'ON' : 'OFF' }`
            MuteMusicButton.innerText = `Music: ${ this.saveData.userData.options.mutemusic ? 'Muted' : 'Unmuted' }`
            MuteSFXButton.innerText = `SFX: ${ this.saveData.userData.options.mutesfx ? 'Muted' : 'Unmuted' }`
            Array.from(NumberFormatDropdown.options).forEach((option) => {
                if (option.value != this.saveData.userData.options.numberFormat) {
                    option.setAttribute("selected", true)
                } else {
                    option.setAttribute("selected", false)
                }
            })
            
            // apply updates settings
            MusicVolumeSlider.setAttribute("value", this.saveData.userData.options.musicvolume * 100)
            SFXVolumeSlider.setAttribute("value", this.saveData.userData.options.sfxvolume * 100)
            this.saveData.userData.options.animations ? this.animations["idle"].play() : this.animations["idle"].pause()
            this.saveData.userData.options.smoothHealth ? HealthBarCurrent.classList.add("fluid-health") : HealthBarCurrent.classList.remove("fluid-health")

            // Statistics
            StatisticClicks.innerText = this.saveData.userData.statistics.clicks.toString(10)
            StatisticDPC.innerText = this.saveData.userData.dpc.toString(10)
            StatisticDPS.innerText = this.saveData.userData.dps.toString(10)
            StatisticKills.innerText = this.saveData.userData.statistics.kills.toString(10)
            StatisticLevel.innerText = 0
            StatisticBPK.innerText = this.saveData.userData.bpk.toString(10)
            StatisticMPB.innerText = `£${ this.saveData.userData.mpb.toString(10) }`
            StatisticMoneyNumber.innerText = `£${ this.saveData.userData.money.toString(10) }`
            StatisticBrainsNumber.innerText = this.saveData.userData.brains.toString(10)
        }
        

        // Zombie health
        ZombieHealthCurrent.innerText = formatNumber(this.saveData.userData.zombie.currentHealth, this.saveData.userData.options.numberFormat)
        ZombieHealthTotal.innerText = formatNumber(this.saveData.userData.zombie.totalHealth, this.saveData.userData.options.numberFormat)

        // Update volume
        this.musicPlayer.volume = this.saveData.userData.options.musicvolume
    }


    updateHealth = () => {
        const percentage = this.saveData.userData.zombie.currentHealth.dividedBy(this.saveData.userData.zombie.totalHealth) * 100

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
