// Utility file


class BigNumber {
    constructor(number) {
        /*
            This class is used to handle extremly large numbers by storing them
            as strings rather than as an integer. as a result, the 53bit javascript
            interger limit is no longer an issue however all number manipulations
            such as simple adding and subtracting have to be reimplemented.

            NOTE: this class handles integers. floating point numbers are not handled
                and any numbers after a decimal point will be truncated

                furthermore, any numbers entered as an integer will automatically be converted
                into a string but numbers larger than the max-integer-limit of javascript will
                probably break stuff
        */
       
        this._value = `${ number }` // handle numbers as strings as large numbers are an issue in javascript

        // TODO: Implement all from http://www.thealmightyguru.com/Pointless/BigNumbers.html

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
            ["Unvigintillion", "c"],
            ["Duovigintillion", ""],
            ["Trevigintillion", ""],
            ["Quattuorvigintillion", ""],
            ["Quinvigintillion", ""],
            ["Sexvigintillion", ""],
            ["Septenvigintillion", ""],
            ["Octovigintillion", ""],
            ["Novemvigintillion", ""],
            ["Trigintillion", ""],
            ["Untrigintillion", ""],
            ["Duotrigintillion", ""],
            ["Tretrigintillion", ""],
            ["Quattuortrigintillion", ""]
        ]
    }

    get value() {
        return this._value
    }

    set value(val) {
        this._value = `${ val }`
    }

    add = (number) => {
        let sum = "" // final value
        let number1 = "" // largest number
        let number2 = "" // smallest number
        
        // find largest and smallest and set the variables
        if (`${ number }`.length > this._value.length) {
            number1 = `${ number }`
            number2 = this._value
        } else {
            number1 = this._value
            number2 = `${ number }`
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
                sum = `${ temp[1] }${ sum }`
                carry = +temp[0]
            } else {
                sum = `${ temp }${ sum }`
                carry = 0
            }
        }

        // Add final carry digit
        if (carry != 0) {
            sum = `${ carry }${ sum }`            
        }
        
        // set and return the value
        this._value = sum
        return sum
    }

    subtract = (number) => {
        // TODO: Implement the function
        // should be similar to the addition one (ish)
    }

    multiply = (number) => {
        // TODO: Implement the function
    }

    divide = (number) => {
        // TODO: Implement the function
    }

    format = (shorthand = true) => {
        /* 
            Pretifies numbers by placing them in a shorthand(ish) format

            Shorthand is an argument which decides whether to use a couple of
            letters for the prefix or use the full name

            124232 -> 124.23 Thousand or 124.23 K
            
            NOTE: The value is truncated, not rounded
        */

        // NOTE: Not the actual number of zeros!
        const numberZeros = (this._value.length - 1)
        
        if (numberZeros < 3) {
            return this._value
        } else {
            const suffixPosition = (numberZeros/3 << 0) - 1
            const suffix = this.suffixList[suffixPosition][+shorthand] // +shorthand converts a boolean into an integer of either 1 or 0 which is the position in the list
            const rm0 = ((suffixPosition + 1) * 3) - 2

            const actualValue = this._value.slice(0, -rm0)
            const formattedValue = `${ actualValue.slice(0, -2) }.${ actualValue.slice(-2) } ${ suffix }`

            return formattedValue
        }        
    }
}
