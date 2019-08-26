// Utility file

// TODO: Implement more following: https://home.kpn.nl/vanadovv/BignumbyN.html
const suffixList = [
    ["Thousand", "K"],
    ["Million", "M"],
    ["Billion", "B"],
    ["Trillion", "T"],
    ["Quadrillion", "Qa"],
    ["Quintillion", "Qi"],
    ["Sextillion", "Sx"],
    ["Septillion", "Sp"],
    ["Octillion", "Oc"],
    ["Nonillion", "No"],
    ["Decillion", "Dc"],
    ["Undecillion", "Ud"],
    ["Duodecillion", "Dd"],
    ["Tredecillion", "Td"],
    ["Quattuordecillion", "Qad"],
    ["Quindecillion", "Qid"],
    ["Sexdecillion", "Sxd"],
    ["Septendecillion", "Spd"],
    ["Octodecillion", "Ocd"],
    ["Novemdecillion", "Nod"],
    ["Vigintillion", "Vg"],
    ["Unvigintillion", "Uvg"],
    ["Duovigintillion", "Dvg"],
    ["Trevigintillion", "Tvg"],
    ["Quattuorvigintillion", "Qavg"],
    ["Quinvigintillion", "Qivg"],
    ["Sexvigintillion", "Sxvg"],
    ["Septenvigintillion", "Spvg"],
    ["Octovigintillion", "Ocvg"],
    ["Novemvigintillion", "Novg"],
    ["Trigintillion", "Tg"],
    ["Untrigintillion", "Utg"],
    ["Duotrigintillion", "Dtg"],
    ["Tretrigintillion", "Ttg"],
    ["Quattuortrigintillion", "Qatg"],
    ["Quintrigintillion", "Qitg"],
    ["Sextrigintillion", "Sxtg"],
    ["Septentrigintillion", "Sptg"],
    ["Octotrigintillion", "Octg"],
    ["Novemtrigintillion", "Notg"],
    ["Quadragintillion", "Qag"],
    ["Unquadragintillion", "Uqag"],
    ["Duoquadragintillion", "Dqag"],
    ["Trequadragintillion", "Tqag"],
    ["Quattuorquadragintillion", "Qaqag"],
    ["Quinquadragintillion", "Qiqag"],
    ["Sexquadragintillion", "Sxqag"],
    ["Septenquadragintillion", "Spqag"],
    ["Octoquadragintillion", "Ocqag"],
    ["Novemquadragintillion", "Noqag"],
    ["Quinquagintillion", "Qig"],
    ["Unquinquagintillion", "Uqig"],
    ["Duoquinquagintillion", "Dqig"],
    ["Trequinquagintillion", "Tqig"],
    ["Quattuorquinquagintillion", "Qaqig"],
    ["Quinquinquagintillion", "Qiqig"],
    ["Sexquinquagintillion", "Sxqig"],
    ["Septenquinquagintillion", "Spqig"],
    ["Octoquinquagintillion", "Ocqig"],
    ["Novemquinquagintillion", "Noqig"],
    ["Sexagintillion", "Sxg"],
    ["Unsexagintillion", "Usxg"],
    ["Duosexagintillion", "Dsxg"],
    ["Tresexagintillion", "Tsxg"],
    ["Quattuorsexagintillion", "Qasxg"],
    ["Quinsexagintillion", "Qisxg"],
    ["Sexsexagintillion", "Sxsxg"],
    ["Septensexagintillion", "Spsxg"],
    ["Octosexagintillion", "Ocsxg"],
    ["Novemsexagintillion", "Nosxg"],
    ["Septuagintillion", "Spg"],
    ["Unseptuagintillion", "Uspg"],
    ["Duoseptuagintillion", "Dspg"],
    ["Treseptuagintillion", "Tspg"],
    ["Quattuorseptuagintillion", "Qaspg"],
    ["Quinseptuagintillion", "Qispg"],
    ["Sexseptuagintillion", "Sxspg"],
    ["Septenseptuagintillion", "Spspg"],
    ["Octoseptuagintillion", "Ocspg"],
    ["Novemseptuagintillion", "Nospg"],
    ["Octogintillion", "Ocg"],
    ["Unoctogintillion", "Uocg"],
    ["Duooctogintillion", "Docg"],
    ["Treoctogintillion", "Tocg"],
    ["Quattuoroctogintillion", "Qaocg"],
    ["Quinoctogintillion", "Qiocg"],
    ["Sexoctogintillion", "Sxocg"],
    ["Septenoctogintillion", "Spocg"],
    ["Octooctogintillion", "Ococg"],
    ["Novemoctogintillion", "Noocg"],
    ["Nonagintillion", "Nog"],
    ["Unnonagintillion", "Unog"],
    ["Duononagintillion", "Dnog"],
    ["Trenonagintillion", "Tnog"],
    ["Quattuornonagintillion", "Qanog"],
    ["Quinnonagintillion", "Qinog"],
    ["Sexnonagintillion", "Sxnog"],
    ["Septennonagintillion", "Spnog"],
    ["Octononagintillion", "Ocnog"],
    ["Novemnonagintillion", "Nonog"],
    ["Centillion", "C"] // 303 Zeros after digit and is 10^303
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
        let suffix = ""
        const rm0 = ((suffixPosition + 1) * 3) - 2

        // Hopefully handles if the number hasn't been added yet
        if (suffixPosition > (suffixList.length - 1)) {
            suffix = shorthand ? "?" : "????????????"
        } else {
            suffix = suffixList[suffixPosition][+shorthand] // +shorthand converts a boolean into an integer of either 1 or 0 which is the position in the list
        }

        const actualValue = value.slice(0, -rm0)
        const formattedValue = `${ actualValue.slice(0, -2) }.${ actualValue.slice(-2) } ${ suffix }`

        return formattedValue
    }        
}

