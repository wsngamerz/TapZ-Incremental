// 
// TapZ Incremental
// main.js
// 


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

// Settings Buttons
const DamageIndicatorToggle = document.getElementsByClassName("settings-button-damageindicator")[0]
const NumberFormatToggle = document.getElementsByClassName("settings-button-numbershorthand")[0]
const SaveButton = document.getElementsByClassName("settings-button-save")[0]
const LoadButton = document.getElementsByClassName("settings-button-load")[0]
const ResetButton = document.getElementsByClassName("settings-button-reset")[0]
const PlayMusicButton = document.getElementsByClassName("settings-button-playmusic")[0]
const PauseMusicButton = document.getElementsByClassName("settings-button-pausemusic")[0]
const MuteMusicButton = document.getElementsByClassName("settings-button-mutemusic")[0]
const MuteSFXButton = document.getElementsByClassName("settings-button-mutesfx")[0]
const MusicVolumeSlider = document.getElementsByClassName("settings-slider-musicvolume")[0]
const SFXVolumeSlider = document.getElementsByClassName("settings-slider-sfxvolume")[0]

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
        this.shop = new Shop(this.saveData)
        this.shop.update = this.update
        this.shop.playSFX = this.playSFX

        this.musicPlayer = new Audio("/assets/audio/the_last_encounter_loop.mp3")
        this.sfxPlayers = []
        this.currentlyPlaying = 0

        // Do I really need to say what these do?
        this.addEventListeners()

        console.log("TapZ Incremental")
        console.log(`v${ this.saveData.gameData.version }`)
        VersionSpan.innerText = `v${ this.saveData.gameData.version }`

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

                this.playSFX("buttonClick")
                this.toggleModal("")
            })  
        })

        // Close Modals when close modal button clicked
        Array.from(CloseModalButtons).forEach(button => button.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleModal("")
        }))

        SellBrainsButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.shop.sellBrains()
            this.update()
        })

        // Modal Opening Buttons
        SettingsButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleModal("settings")
        })
        ShopButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleModal("shop")
        })

        // Settings Modal Buttons
        MenuBackButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleMenu("main")
        })
        DisplaySettingsButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleMenu("display")
        })
        SaveSettingsButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleMenu("saving")
        })
        AudioSettingsButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleMenu("audio")
        })
        StatisticsSectionButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleMenu("statistics")
        })
        AboutSectionButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleMenu("about")
        })
        CreditsSectionButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleMenu("credits")
        })

        // Tab Changing Buttons
        DpcTabButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleTab("dpc")
        })
        DpsTabButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleTab("dps")
        })
        MultipliersTabButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.toggleTab("multipliers")
        })

        // Settings
        DamageIndicatorToggle.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.editSettings("showDamage")
        })
        NumberFormatToggle.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.editSettings("numberShorthand")
        })
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
        PlayMusicButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.playMusic()
        })
        PauseMusicButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.pauseMusic()
        })
        MuteMusicButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.editSettings("mutemusic")
        })
        MuteSFXButton.addEventListener("click", () => {
            this.playSFX("buttonClick")
            this.editSettings("mutesfx")
        })
        MusicVolumeSlider.addEventListener("change", (event) => {
            this.editSettings("musicvolume", event.target.value / 100)
        })
        
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
        
        if (setting == "mutemusic") {
            if (this.saveData.userData.options["mutemusic"]) {
                this.setMusicVolume(0.0)
            } else {
                this.setMusicVolume(this.saveData.userData.options.musicvolume)
                this.playMusic()
            }
        }

        this.update()
    }


    handleDPS = () => {
        this.injureZombie(this.saveData.userData.dps)
        this.update()
    }


    injureZombie = (damage) => {
        this.saveData.userData.zombie.currentHealth = this.saveData.userData.zombie.currentHealth.minus(damage)

        if (this.saveData.userData.zombie.currentHealth.lte(0)) {
            this.killZombie()
        }

        if (damage.gt(0)) {
            // Switch to a different animation (gif) and switch back after 300ms
            Zombie.classList.add("zombie-hurt")
            setTimeout(() => Zombie.classList.remove("zombie-hurt"), 300)
        }

    }


    killZombie = () => {
        this.saveData.userData.statistics.kills = this.saveData.userData.statistics.kills.plus(1)

        let killLevelTarget = this.saveData.userData.level.plus(1).pow(3).plus(15)
        if (this.saveData.userData.statistics.kills.gt(killLevelTarget)) {
            this.saveData.userData.level = this.saveData.userData.level.plus(1)
            this.saveData.userData.zombie.totalHealth = this.saveData.userData.zombie.totalHealth.multipliedBy(2)

            console.debug("Level", this.saveData.userData.level.toString(10),"Required", killLevelTarget.toString(10), "kills")
            console.debug("Zombie health is now", this.saveData.userData.zombie.totalHealth.toString(10))
        }
        
        this.saveData.userData.brains = this.saveData.userData.brains.plus(this.saveData.userData.bpk)
        this.saveData.userData.zombie.currentHealth = this.saveData.userData.zombie.totalHealth
    }


    playMusic = () => {
        if (this.musicPlayer.paused) {
            if (!this.saveData.userData.options.mutemusic) {
                this.musicPlayer.play()
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
    }

    update = () => {
        this.updateHealth()

        BrainsSellSpan.innerText = `£${ formatNumber(this.shop.sellBrainsCost(), this.saveData.userData.options.numberShorthand) }`
        
        // Update all of the data elements
        Array.from(BrainSpans).forEach(element => element.innerText = `${ formatNumber(this.saveData.userData.brains, this.saveData.userData.options.numberShorthand) } Brains`)
        Array.from(MoneySpans).forEach(element => element.innerText = `£${ formatNumber(this.saveData.userData.money, this.saveData.userData.options.numberShorthand) }`)
        LevelSpan.innerText = this.saveData.userData.level

        // Update Settings Buttons
        DamageIndicatorToggle.innerText = `Damage Indicators: ${ this.saveData.userData.options.showDamage ? 'ON' : 'OFF' }`
        NumberFormatToggle.innerText = `Number Format: ${ this.saveData.userData.options.numberShorthand ? 'Short' : 'Long' }`
        MuteMusicButton.innerText = `Music: ${ this.saveData.userData.options.mutemusic ? 'Muted' : 'Unmuted' }`
        MuteSFXButton.innerText = `SFX: ${ this.saveData.userData.options.mutesfx ? 'Muted' : 'Unmuted' }`

        // Update shop buttons
        Array.from(BuyShopItemButtons).forEach(element => {
            const itemData = this.shop.getItem(element.getAttribute("data-id"))
            element.innerText = `Buy x1 ${ itemData.text.name } for £${ formatNumber(this.shop.getItemCost(itemData), this.saveData.userData.options.numberShorthand) }`
        })

        // Update Shop Levels
        Array.from(ShopItemLevels).forEach(shopItemLevel => {
            shopItemLevel.innerText = `Level: ${ this.saveData.userData.upgrades[shopItemLevel.getAttribute("data-id")].level }`
        })

        // Statistics
        StatisticClicks.innerText = this.saveData.userData.statistics.clicks.toString(10)
        StatisticDPC.innerText = this.saveData.userData.dpc.toString(10)
        StatisticDPS.innerText = this.saveData.userData.dps.toString(10)
        StatisticKills.innerText = this.saveData.userData.statistics.kills.toString(10)
        StatisticLevel.innerText = 0
        StatisticBPK.innerText = this.saveData.userData.bpk.toString(10)
        StatisticMPB.innerText = `£${ this.saveData.userData.mpb.toString(10) }`

        // Zombie health
        ZombieHealthCurrent.innerText = formatNumber(this.saveData.userData.zombie.currentHealth, this.saveData.userData.options.numberShorthand)
        ZombieHealthTotal.innerText = formatNumber(this.saveData.userData.zombie.totalHealth, this.saveData.userData.options.numberShorthand)

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