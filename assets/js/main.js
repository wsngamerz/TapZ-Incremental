// 
// TapZ Incremental
// main.js
// 

const BrainsSpan = document.getElementsByClassName("brains")[0]
const ClickSpan = document.getElementsByClassName("clicks")[0]
const HealthBarCurrent = document.getElementsByClassName("current-health")[0]
const KillsSpan = document.getElementsByClassName("kills")[0]
const Zombie = document.getElementsByClassName("zombie")[0]
const ZombieHealthCurrent = document.getElementsByClassName("zombie-current-health")[0]
const ZombieHealthTotal = document.getElementsByClassName("zombie-total-health")[0]



class TapZ {
    constructor() {
        this.saveData = new Save()
        this.shop = new Shop()

        // Bind this to functions
        this.addEventListeners = this.addEventListeners.bind(this)
        this.click = this.click.bind(this)
        this.killZombie = this.killZombie.bind(this)
        this.update = this.update.bind(this)
        this.updateHealth = this.updateHealth.bind(this)

        this.addEventListeners()
    }


    addEventListeners() {
        Zombie.addEventListener("click", this.click)
    }


    click(event) {
        this.saveData.userData.clicks++
        this.saveData.userData.zombie.currentHealth -= 1

        if (this.saveData.userData.zombie.currentHealth <= 0) {
            this.killZombie()
        }

        // Switch to a different animation (gif) and switch back after 300ms
        Zombie.classList.add("zombie-hurt")
        setTimeout(() => Zombie.classList.remove("zombie-hurt"), 300)

        // If called by a click
        if (event) {
            // Create a damage indicator
            const clickX = event.clientX + 40
            const clickY = event.clientY - 40
            const uid = (new Date).getTime() // Use the time in ms as a unique id
            const damageElement = document.createElement("span")

            // Set the damage indicators data and styles
            damageElement.innerHTML = "-1"
            damageElement.id = uid
            damageElement.classList.add("damage-indicator")
            damageElement.dataset.itter = 10
            damageElement.dataset.uid = uid
            damageElement.dataset.x = clickX
            damageElement.dataset.y = clickY
            damageElement.style.top = `${ clickY }px`
            damageElement.style.left = `${ clickX }px`

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

        // Update after click
        this.update()
    }

    killZombie() {
        this.saveData.userData.kills++
        this.saveData.userData.brains += this.saveData.userData.bpk
        this.saveData.userData.zombie.currentHealth = this.saveData.userData.zombie.totalHealth
    }

    update() {
        this.updateHealth()

        BrainsSpan.innerHTML = `${ this.saveData.userData.brains } Brains`
        ClickSpan.innerHTML = `${ this.saveData.userData.clicks } Clicks`
        KillsSpan.innerHTML = `${ this.saveData.userData.kills } Kills`
        ZombieHealthCurrent.innerHTML = this.saveData.userData.zombie.currentHealth
        ZombieHealthTotal.innerHTML = this.saveData.userData.zombie.totalHealth
    }


    updateHealth() {
        const percentage = ( this.saveData.userData.zombie.currentHealth / this.saveData.userData.zombie.totalHealth ) * 100

        HealthBarCurrent.style.width = `${ percentage }%`
    }
}



// Create an instance of the TapZ class once page loaded
window.onload = (() => new TapZ())
