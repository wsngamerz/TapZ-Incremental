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

        this.update()
    }

    update() {
        document.getElementsByClassName("clicks")[0].innerHTML = `${this.saveData.userData.clicks} Clicks`
    }
}

// Create an instance of the TapZ class
window.onload = (() => new TapZ())
