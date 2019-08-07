// Utility file

// TODO: Implement all from http://www.thealmightyguru.com/Pointless/BigNumbers.html
const suffixList = [
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

const formatNumber = (number, shorthand=false) => {
    /* 
        Pretifies numbers by placing them in a shorthand(ish) format

        Shorthand is an argument which decides whether to use a couple of
        letters for the prefix or use the full name

        124232 -> 124.23 Thousand or 124.23 K
        
        NOTE: The value is truncated, not rounded
    */
   
    let value = ""

    if (number instanceof BigNumber) {
        value = number.toString(10)
    } else {
        value = `${ number }`
    }
    

    // NOTE: Not the actual number of zeros!
    const numberZeros = (value.length - 1)
    
    if (numberZeros < 3) {
        return value
    } else {
        const suffixPosition = (numberZeros/3 << 0) - 1
        const suffix = suffixList[suffixPosition][+shorthand] // +shorthand converts a boolean into an integer of either 1 or 0 which is the position in the list
        const rm0 = ((suffixPosition + 1) * 3) - 2

        const actualValue = value.slice(0, -rm0)
        const formattedValue = `${ actualValue.slice(0, -2) }.${ actualValue.slice(-2) } ${ suffix }`

        return formattedValue
    }        
}

