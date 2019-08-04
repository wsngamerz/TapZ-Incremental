// Utility file


class BigNumber {
    constructor(number) {
        this._value = `${number}` // handle numbers as strings as large numbers are an issue in javascript

        this.suffixList = [
            ["Thousand", "K"],
            ["Million", "M"],
            ["Billion", "B"],
            ["Trillion", "t"],
            ["Quadrillion", "q"],
            ["Quintillion", "Q"],
            ["Sextillion", "s"],
            ["Septillion", "S"],
            ["Octillion", "o"],
            ["Nonillion", "n"],
            ["Decillion", "d"],
            ["Undecillion", "U"],
            ["Duodecillion", "D"],
            ["Tredecillion", "T"],
            ["Quattuordecillion", "Qt"],
            ["Quindecillion", "Qd"],
            ["Sexdecillion", "Sd"],
            ["Septendecillion", "St"],
            ["Octodecillion", "O"],
            ["Novemdecillion", "N"],
            ["Vigintillion", "v"],
            ["Unvigintillion", "c"]
        ]
    }

    add = (number) => {
        let sum = "" // final value
        let number1 = "" // largest number
        let number2 = "" // smallest number
        
        // find largest and smallest and set the variables
        if (number.length > this._value.length) {
            number1 = `${number}`
            number2 = this._value
        } else {
            number1 = this._value
            number2 = `${number}`
        }

        // ensure both numbers have same number of places
        number2 = number2.padStart(number1.length, "0")
        console.log(number1, number2)

        let carry = 0
        let a = 0
        let b = 0
        let temp = ""

        for (let i = number1.length; i > 0; i-=1) {
            a = +number1[i - 1]
            b = +number2[i - 1]

            if (b != undefined) {
                temp = `${ a + b + carry }`
            } else {
                temp = `${ a + carry }`
            }

            // prepend value onto sum and set carry if possible
            console.log(a, b, temp)
            if (temp.length == 2) {
                sum = `${temp[1]}${sum}`
                carry = +temp[0]
            } else {
                sum = `${temp}${sum}`
                carry = 0
            }
        }

        // Add final carry digit
        if (carry != 0) {
            sum = `${carry}${sum}`            
        }
        
        // set and return the value
        this._value = sum
        return sum
    }

    subtract = (number) => {

    }



    format = (shorthand = true) => {
        /* 
            Pretifies numbers by placing them in a shorthand(ish) format

            Shorthand is an argument which decides whether to use a couple of
            letters for the prefix or use the full name

            124232 -> 124.23 Thousand or 124.23 K            
        */

        if (this._value.length < 4) {
            return this._value // if lower than 1000
        } else {
            const triplets = (this._value.length / 3) >> 0 // a better fersion of Math.floor()
            const suffix = this.suffixList[triplets - 1][+shorthand]
            // slice 
            // https://stackoverflow.com/questions/952924/javascript-chop-slice-trim-off-last-character-in-string
        }
        
    }
}


const test = new BigNumber("1000")
