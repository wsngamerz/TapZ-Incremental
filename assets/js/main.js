// 
// TapZ Incremental
// main.js
// 

const Zombie = document.getElementsByClassName("zombie")[0]

class TapZ {
    constructor() {
        this.saveData = new Save()
        this.shop = new Shop()

        // Bind this to functions
        this.addEventListeners = this.addEventListeners.bind(this)
        this.click = this.click.bind(this)
        this.update = this.update.bind(this)

        this.addEventListeners()
    }

    addEventListeners() {
        Zombie.addEventListener("click", this.click)
    }

    click(event) {
        this.saveData.userData.clicks++

        Zombie.classList.add("zombie-hurt")
        setTimeout(() => Zombie.classList.remove("zombie-hurt"), 300)

        // If called by a click
        if (event) {
            const clickX = event.clientX + 40
            const clickY = event.clientY - 40
            const uid = (new Date).getTime()
            const damageElement = document.createElement("span")

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

            const interval = setInterval(() => {
                damageElement.dataset.itter--
                damageElement.dataset.x = parseInt(damageElement.dataset.x) + 25
                damageElement.dataset.y = parseInt(damageElement.dataset.y) - 75
                damageElement.style.top = `${ damageElement.dataset.y }px`
                damageElement.style.left = `${ damageElement.dataset.x }px`
                damageElement.style.opacity = damageElement.dataset.itter / 10

                if (damageElement.dataset.itter <= 0) {
                    clearInterval(interval)

                    if (!damageElement) {
                        damageElement.parentNode.removeChild(damageElement)
                    }
                }

            }, 100)
        }

        this.update()
    }

    update() {
        document.getElementsByClassName("clicks")[0].innerHTML = `${this.saveData.userData.clicks} Clicks`
    }
}

// Create an instance of the TapZ class
window.onload = (() => new TapZ())
