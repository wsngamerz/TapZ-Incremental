// Utility file

// TODO: Implement more following: https://home.kpn.nl/vanadovv/BignumbyN.html
const suffixList = [
    ["Thousand", "K", "a"],
    ["Million", "M", "b"],
    ["Billion", "B", "c"],
    ["Trillion", "T", "d"],
    ["Quadrillion", "Qa", "e"],
    ["Quintillion", "Qi", "f"],
    ["Sextillion", "Sx", "g"],
    ["Septillion", "Sp", "h"],
    ["Octillion", "Oc", "i"],
    ["Nonillion", "No", "j"],
    ["Decillion", "Dc", "k"],
    ["Undecillion", "Ud", "l"],
    ["Duodecillion", "Dd", "m"],
    ["Tredecillion", "Td", "n"],
    ["Quattuordecillion", "Qad", "o"],
    ["Quindecillion", "Qid", "p"],
    ["Sexdecillion", "Sxd", "q"],
    ["Septendecillion", "Spd", "r"],
    ["Octodecillion", "Ocd", "s"],
    ["Novemdecillion", "Nod", "t"],
    ["Vigintillion", "Vg", "u"],
    ["Unvigintillion", "Uvg", "v"],
    ["Duovigintillion", "Dvg", "w"],
    ["Trevigintillion", "Tvg", "x"],
    ["Quattuorvigintillion", "Qavg", "y"],
    ["Quinvigintillion", "Qivg", "z"],
    ["Sexvigintillion", "Sxvg", "aa"],
    ["Septenvigintillion", "Spvg", "ab"],
    ["Octovigintillion", "Ocvg", "ac"],
    ["Novemvigintillion", "Novg", "ad"],
    ["Trigintillion", "Tg", "ae"],
    ["Untrigintillion", "Utg", "af"],
    ["Duotrigintillion", "Dtg", "ag"],
    ["Tretrigintillion", "Ttg", "ah"],
    ["Quattuortrigintillion", "Qatg", "ai"],
    ["Quintrigintillion", "Qitg", "aj"],
    ["Sextrigintillion", "Sxtg", "ak"],
    ["Septentrigintillion", "Sptg", "al"],
    ["Octotrigintillion", "Octg", "am"],
    ["Novemtrigintillion", "Notg", "an"],
    ["Quadragintillion", "Qag", "ao"],
    ["Unquadragintillion", "Uqag", "ap"],
    ["Duoquadragintillion", "Dqag", "aq"],
    ["Trequadragintillion", "Tqag", "ar"],
    ["Quattuorquadragintillion", "Qaqag", "as"],
    ["Quinquadragintillion", "Qiqag", "at"],
    ["Sexquadragintillion", "Sxqag", "au"],
    ["Septenquadragintillion", "Spqag", "av"],
    ["Octoquadragintillion", "Ocqag", "aw"],
    ["Novemquadragintillion", "Noqag", "ax"],
    ["Quinquagintillion", "Qig", "ay"],
    ["Unquinquagintillion", "Uqig", "az"],
    ["Duoquinquagintillion", "Dqig", "ba"],
    ["Trequinquagintillion", "Tqig", "bb"],
    ["Quattuorquinquagintillion", "Qaqig", "bc"],
    ["Quinquinquagintillion", "Qiqig", "bd"],
    ["Sexquinquagintillion", "Sxqig", "be"],
    ["Septenquinquagintillion", "Spqig", "bf"],
    ["Octoquinquagintillion", "Ocqig", "bg"],
    ["Novemquinquagintillion", "Noqig", "bh"],
    ["Sexagintillion", "Sxg", "bi"],
    ["Unsexagintillion", "Usxg", "bj"],
    ["Duosexagintillion", "Dsxg", "bk"],
    ["Tresexagintillion", "Tsxg", "bl"],
    ["Quattuorsexagintillion", "Qasxg", "bm"],
    ["Quinsexagintillion", "Qisxg", "bn"],
    ["Sexsexagintillion", "Sxsxg", "bo"],
    ["Septensexagintillion", "Spsxg", "bp"],
    ["Octosexagintillion", "Ocsxg", "bp"],
    ["Novemsexagintillion", "Nosxg", "br"],
    ["Septuagintillion", "Spg", "bs"],
    ["Unseptuagintillion", "Uspg", "bt"],
    ["Duoseptuagintillion", "Dspg", "bu"],
    ["Treseptuagintillion", "Tspg", "bv"],
    ["Quattuorseptuagintillion", "Qaspg", "bw"],
    ["Quinseptuagintillion", "Qispg", "bx"],
    ["Sexseptuagintillion", "Sxspg", "bw"],
    ["Septenseptuagintillion", "Spspg", "bz"],
    ["Octoseptuagintillion", "Ocspg", "ca"],
    ["Novemseptuagintillion", "Nospg", "cb"],
    ["Octogintillion", "Ocg", "cc"],
    ["Unoctogintillion", "Uocg", "cd"],
    ["Duooctogintillion", "Docg", "ce"],
    ["Treoctogintillion", "Tocg", "cf"],
    ["Quattuoroctogintillion", "Qaocg", "cg"],
    ["Quinoctogintillion", "Qiocg", "ch"],
    ["Sexoctogintillion", "Sxocg", "ci"],
    ["Septenoctogintillion", "Spocg", "cj"],
    ["Octooctogintillion", "Ococg", "ck"],
    ["Novemoctogintillion", "Noocg", "cl"],
    ["Nonagintillion", "Nog", "cm"],
    ["Unnonagintillion", "Unog", "cn"],
    ["Duononagintillion", "Dnog", "co"],
    ["Trenonagintillion", "Tnog", "cp"],
    ["Quattuornonagintillion", "Qanog", "cq"],
    ["Quinnonagintillion", "Qinog", "cr"],
    ["Sexnonagintillion", "Sxnog", "cs"],
    ["Septennonagintillion", "Spnog", "ct"],
    ["Octononagintillion", "Ocnog", "cu"],
    ["Novemnonagintillion", "Nonog", "cv"],
    ["Centillion", "C", "cw"], // 303 Zeros after digit and is 10^303
    ["Uncentillion", "Uc", "cx"],
    ["Duocentillion", "Dc", "cy"],
    ["Trescentillion", "Tc", "cz"],
    ["Quattuorcentillion", "Qac", "da"],
    ["Quinquacentillion", "Qic", "db"],
    ["Sexcentillion", "Sxc", "dc"],
    ["Septencentillion", "Spc", "dd"],
    ["Octocentilion", "Occ", "de"],
    ["Novencentilion", "Noc", "df"],
    ["Decicentillion", "Dc", "dg"],
    ["Undecicentillion", "Udc", "dh"],
    ["Duodecicentillion", "Ddc", "di"],
    ["Tredecicentillion", "Tdc", "dj"],
    ["Quattuordecicentillion", "Qadc", "dk"],
    ["Quinquadecicentillion", "Qidc", "dl"],
    ["Sedecicentillion", "Sxdc", "dm"],
    ["Septendecicentillion", "Spdc", "dn"],
    ["Octodecicentillion", "Ocdc", "do"],
    ["Novendecicentillion", "Nodc", "dp"],
    ["Viginticentillion", "Vc", "dq"],
    ["Unviginticentillion", "Uvc", "dr"],
    ["Duoviginticentillion", "Dvc", "ds"],
    ["Tresviginticentillion", "Tvc", "dt"],
    ["Quattuorviginticentillion", "Qavc", "du"],
    ["Quinquaviginticentillion", "Qivc", "dv"],
    ["Sesviginticentillion", "Sxvc", "dw"],
    ["Septemviginticentillion", "Spvc", "dx"],
    ["Octoviginticentillion", "Ocvc", "dy"],
    ["Novemviginticentillion", "Novc", "dz"],
    ["Trigintacentillion", "Tc", "ea"],
    ["Untrigintacentillion", "Utc", "eb"],
    ["Duotrigintacentillion", "Dtc", "ec"],
    ["Trestrigintacentillion", "Ttc", "ed"],
    ["Quattuortrigintacentillion", "Qatc", "ee"],
    ["Quinquatrigintacentillion", "Qitc", "ef"],
    ["Sestrigintacentillion", "Sxtc", "eg"],
    ["Septentrigintacentillion", "Sptc", "eh"],
    ["Octotrigintacentillion", "Octc", "ei"],
    ["Noventrigintacentillion", "Notc", "ej"],
    ["Quadragintacentillion", "", "ek"],
    ["Unquadragintacentillion", "", "el"],
    ["Duoquadragintacentillion", "", "em"],
    ["Tresquadragintacentillion", "", "en"],
    ["Quattuorquadragintacentillion", "", "eo"],
    ["Quinquaquadragintacentillion", "", "ep"],
    ["Sesquadragintacentillion", "", "eq"],
    ["Septenquadragintacentillion", "", "er"],
    ["Octoquadragintacentillion", "", "es"],
    ["Novenquadragintacentillion", "", "et"],
    ["Quinquagintacentillion", "", "eu"],
    ["Unquinquagintacentillion", "", "ev"],
    ["Duoquinquagintacentillion", "", "ew"],
    ["Tresquinquagintacentillion", "", "ex"],
    ["Quattuorquinquagintacentillion", "", "ey"],
    ["Quinquaquinquagintacentillion", "", "ez"],
    ["Sesquinquagintacentillion", "", "fa"],
    ["Septenquinquagintacentillion", "", "fb"],
    ["Octoquinquagintacentillion", "", "fc"],
    ["Novenquinquagintacentillion", "", "fd"],
    ["Sexagintacentillion", "", "fe"],
    ["Unsexagintacentillion", "", "ff"],
    ["Duosexagintacentillion", "", "fg"],
    ["Tresexagintacentillion", "", "fh"],
    ["Quattuorsexagintacentillion", "", "fi"],
    ["Quinquasexagintacentillion", "", "fj"],
    ["Sesexagintacentillion", "", "fk"],
    ["Septensexagintacentillion", "", "fl"],
    ["Octosexagintacentillion", "", "fm"],
    ["Novensexagintacentillion", "", "fn"],
    ["Septuagintacentillion", "", "fo"],
    ["Unseptuagintacentillion", "", "fp"],
    ["Duoseptuagintacentillion", "", "fq"],
    ["Treseptuagintacentillion", "", "fr"],
    ["Quattuorseptuagintacentillion", "", "fs"],
    ["Quinquaseptuagintacentillion", "", "ft"],
    ["Seseptuagintacentillion", "", "fu"],
    ["Septenseptuagintacentillion", "", "fv"],
    ["Octoseptuagintacentillion", "", "fw"],
    ["Novenseptuagintacentillion", "", "fx"],
    ["Octogintacentillion", "", "fy"],
    ["Unoctogintacentillion", "", "fz"],
    ["Duooctogintacentillion", "", "ga"],
    ["Tresoctogintacentillion", "", "gb"],
    ["Quattuoroctogintacentillion", "", "gc"],
    ["Quinquaoctogintacentillion", "", "gd"],
    ["Sexoctogintacentillion", "", "ge"],
    ["Septemoctogintacentillion", "", "gf"],
    ["Octooctogintacentillion", "", "gg"],
    ["Novemoctogintacentillion", "", "gh"],
    ["Nonagintacentillion", "", "gi"],
    ["Unnonagintacentillion", "", "gj"],
    ["Duononagintacentillion", "", "gk"],
    ["Trenonagintacentillion", "", "gl"],
    ["Quattuornonagintacentillion", "", "gm"],
    ["Quinquanonagintacentillion", "", "gn"],
    ["Senonagintacentillion", "", "go"],
    ["Septenonagintacentillion", "", "gp"],
    ["Octononagintacentillion", "", "gq"],
    ["Novenonagintacentillion", "", "gr"],
    ["Ducentillion", "", "gs"],
    ["Unducentillion", "", "gt"],
    ["Duoducentillion", "", "gu"],
    ["Treducentillion", "", "gv"],
    ["Quattuorducentillion", "", "gw"],
    ["Quinquaducentillion", "", "gx"],
    ["Seducentillion", "", "gy"],
    ["Septenducentillion", "", "gz"],
    ["Octoducentillion", "", "ha"],
    ["Novenducentillion", "", "hb"],
    ["Deciducentillion", "", "hc"],
    ["Undeciducentillion", "", "hd"],
    ["Duodeciducentillion", "", "he"],
    ["Tredeciducentillion", "", "hf"],
    ["Quattuordeciducentillion", "", "hg"],
    ["Quinquadeciducentillion", "", "hh"],
    ["Sedeciducentillion", "", "hi"],
    ["Septendeciducentillion", "", "hj"],
    ["Octodeciducentillion", "", "hk"],
    ["Novendeciducentillion", "", "hl"],
    ["Vigintiducentillion", "", "hm"],
    ["Unvigintiducentillion", "", "hn"],
    ["Duovigintiducentillion", "", "ho"],
    ["Tresvigintiducentillion", "", "hp"],
    ["Quattuorvigintiducentillion", "", "hq"],
    ["Quinquavigintiducentillion", "", "hr"],
    ["Sesvigintiducentillion", "", "hs"],
    ["Septemvigintiducentillion", "", "ht"],
    ["Octovigintiducentillion", "", "hu"],
    ["Novemvigintiducentillion", "", "hv"],
    ["Trigintaducentillion", "", "hw"],
    ["Untrigintaducentillion", "", "hx"],
    ["Duotrigintaducentillion", "", "hy"],
    ["Trestrigintaducentillion", "", "hz"],
    ["Quattuortrigintaducentillion", "", "ia"],
    ["Quinquatrigintaducentillion", "", "ib"],
    ["Sestrigintaducentillion", "", "ic"],
    ["Septentrigintaducentillion", "", "id"],
    ["Octotrigintaducentillion", "", "ie"],
    ["Noventrigintaducentillion", "", "if"],
    ["Quadragintaducentillion", "", "ig"],
    ["Unquadragintaducentillion", "", "ih"],
    ["Duoquadragintaducentillion", "", "ii"],
    ["Tresquadragintaducentillion", "", "ij"],
    ["Quattuorquadragintaducentillion", "", "ik"],
    ["Quinquaquadragintaducentillion", "", "il"],
    ["Sesquadragintaducentillion", "", "im"],
    ["Septenquadragintaducentillion", "", "in"],
    ["Octoquadragintaducentillion", "", "io"],
    ["Novenquadragintaducentillion", "", "ip"],
    ["Quinquagintaducentillion", "", "iq"],
    ["Unquinquagintaducentillion", "", "ir"],
    ["Duoquinquagintaducentillion", "", "is"],
    ["Tresquinquagintaducentillion", "", "it"],
    ["Quattuorquinquagintaducentillion", "", "iu"],
    ["Quinquaquinquagintaducentillion", "", "iv"],
    ["Sesquinquagintaducentillion", "", "iw"],
    ["Septenquinquagintaducentillion", "", "ix"],
    ["Octoquinquagintaducentillion", "", "iy"],
    ["Novenquinquagintaducentillion", "", "iz"],
    ["Sexagintaducentillion", "", "ja"],
    ["Unsexagintaducentillion", "", "jb"],
    ["Duosexagintaducentillion", "", "jc"],
    ["Tresexagintaducentillion", "", "jd"],
    ["Quattuorsexagintaducentillion", "", "je"],
    ["Quinquasexagintaducentillion", "", "jf"],
    ["Sesexagintaducentillion", "", "jg"],
    ["Septensexagintaducentillion", "", "jh"],
    ["Octosexagintaducentillion", "", "ji"],
    ["Novensexagintaducentillion", "", "jj"],
    ["Septuagintaducentillion", "", "jk"],
    ["Unseptuagintaducentillion", "", "jl"],
    ["Duoseptuagintaducentillion", "", "jm"],
    ["Treseptuagintaducentillion", "", "jn"],
    ["Quattuorseptuagintaducentillion", "", "jo"],
    ["Quinquaseptuagintaducentillion", "", "jp"],
    ["Seseptuagintaducentillion", "", "jq"],
    ["Septenseptuagintaducentillion", "", "jr"],
    ["Octoseptuagintaducentillion", "", "js"],
    ["Novenseptuagintaducentillion", "", "jt"],
    ["Octogintaducentillion", "", "ju"],
    ["Unoctogintaducentillion", "", "jv"],
    ["Duooctogintaducentillion", "", "jw"],
    ["Tresoctogintaducentillion", "", "jx"],
    ["Quattuoroctogintaducentillion", "", "jy"],
    ["Quinquaoctogintaducentillion", "", "jz"],
    ["Sexoctogintaducentillion", "", "ka"],
    ["Septemoctogintaducentillion", "", "kb"],
    ["Octooctogintaducentillion", "", "kc"],
    ["Novemoctogintaducentillion", "", "kd"],
    ["Nonagintaducentillion", "", "ke"],
    ["Unnonagintaducentillion", "", "kf"],
    ["Duononagintaducentillion", "", "kg"],
    ["Trenonagintaducentillion", "", "kh"],
    ["Quattuornonagintaducentillion", "", "ki"],
    ["Quinquanonagintaducentillion", "", "kj"],
    ["Senonagintaducentillion", "", "kk"],
    ["Septenonagintaducentillion", "", "kl"],
    ["Octononagintaducentillion", "", "km"],
    ["Novenonagintaducentillion", "", "kn"],
    ["Trecentillion", "", "ko"],
    ["Untrecentillion", "", "kp"],
    ["Duotrecentillion", "", "kq"],
    ["Trestrecentillion", "", "kr"],
    ["Quattuortrecentillion", "", "ks"],
    ["Quinquatrecentillion", "", "kt"],
    ["Sestrecentillion", "", "ku"],
    ["Septentrecentillion", "", "kv"],
    ["Octotrecentillion", "", "kw"],
    ["Noventrecentillion", "", "kx"],
    ["Decitrecentillion", "", "ky"],
    ["Undecitrecentillion", "", "kz"],
    ["Duodecitrecentillion", "", "la"],
    ["Tredecitrecentillion", "", "lb"],
    ["Quattuordecitrecentillion", "", "lc"],
    ["Quinquadecitrecentillion", "", "ld"],
    ["Sedecitrecentillion", "", "le"],
    ["Septendecitrecentillion", "", "lf"],
    ["Octodecitrecentillion", "", "lg"],
    ["Novendecitrecentillion", "", "lh"],
    ["Vigintitrecentillion", "", "li"],
    ["Unvigintitrecentillion", "", "lj"],
    ["Duovigintitrecentillion", "", "lk"],
    ["Tresvigintitrecentillion", "", "ll"],
    ["Quattuorvigintitrecentillion", "", "lm"],
    ["Quinquavigintitrecentillion", "", "ln"],
    ["Sesvigintitrecentillion", "", "lo"],
    ["Septemvigintitrecentillion", "", "lp"],
    ["Octovigintitrecentillion", "", "lq"],
    ["Novemvigintitrecentillion", "", "lr"],
    ["Trigintatrecentillion", "", "ls"],
    ["Untrigintatrecentillion", "", "lt"],
    ["Duotrigintatrecentillion", "", "lu"],
    ["Trestrigintatrecentillion", "", "lv"] // 1998 zeros after digit and is 10^1998
]

export const formatNumber = (number, format="lazy") => {
    /* 
        Pretifies numbers by placing them in a shorthand(ish) format

        Shorthand is an argument which decides whether to use a couple of
        letters for the prefix or use the full name

        124232 -> 124.23 Thousand or 124.23 K

        Options:
            - "fullname" -> The full name of the value e.g 'Thousand' or 'Centillion'
            - "shorthand" -> The shorthand name of the value e.g 'K' or 'C'
            - "lazy" -> The lazy way of showing large numbers e.g 'a' or 'cw'
        
        NOTE: The value is truncated, not rounded
    */
   
    const options = {
        "fullname": 0,
        "shorthand": 1,
        "lazy": 2
    }

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
            suffix = format == "fullname" ? "???????????????" : "??"
        } else {
            suffix = suffixList[suffixPosition][options[format]]
        }

        const actualValue = value.slice(0, -rm0)
        const formattedValue = `${ actualValue.slice(0, -2) }.${ actualValue.slice(-2) } ${ suffix }`

        return formattedValue
    }        
}

