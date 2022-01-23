// Different dictionaries for different purposes
symbols = { 'equals to': '=', 'equals': '=', 'equal': '=', 'plus': '+', 'minus': '-', 'times': '* ', 'divide': '/', 'divided': '/' }
brackets = { 'open bracket': '(', 'close bracket': ')' }
// Caps greek 'Α  , Β , Γ , Δ , Ε , Ζ , Η , Θ , Ι , Κ , Λ , Μ , Ν , Ξ , Ο , Π , Ρ , Σ /ς, Τ , Υ , Φ , Χ , Ψ , and Ω '
greeks = {
    'alpha': 'α',
    'beta': 'β',
    'gamma': 'γ',
    'delta': 'δ',
    'epsilon': 'ε',
    'zeta': 'ζ',
    'eta': 'η',
    'theta': 'θ',
    'iota': 'ι',
    'kappa': 'κ',
    'lambda': 'λ',
    'mu': 'μ',
    'nu': 'ν',
    'xi': 'ξ',
    'omicron': 'ο',
    'pi': 'π',
    'rho': 'ρ',
    'sigma': 'σ',
    'tau': 'τ',
    'upsilon': 'υ',
    'phi': 'φ',
    'chi': 'χ',
    'psi': 'ψ',
    'omega': 'ω',
    'hello': 'hi'
};

function mergeDict(dictionaries) {
    newDict = {}
    for (i = 0; i < dictionaries.length; i++) {
        newDict = Object.assign({}, newDict, dictionaries[i])
    }
    console.log(newDict)
    return newDict
}

function speechReplace(transcript, newDict) {
    words = transcript.split(" ")
    for (i = 0; i < words.length; i++) {
        if (words[i] in newDict) { words[i] = newDict[words[i]] }
        else if (!isNaN(Number(words[i]))) { }
        else if (words[i].length == 1) { }
        else { words[i] = '' }
    }
    return words.join('')
}

// List of dictionaries
dictionaries = [symbols, brackets, greeks]
newDict = mergeDict(dictionaries)

// function speechReplace(transcript, dictionaries) {
//     // Iterate through different dictionaries in the dictionary list
//     for (i = 0; i < dictionaries.length; i++) {
//         dictName = dictionaries[i]
//         keys = Object.keys(dictName)
//         for (j = 0; j < keys.length; j++) {
//             transcript = transcript.replaceAll(keys[j], dictName[keys[j]])
//         }
//     }
//     return transcript
// }

// word = '1'
// console.log(Number(word))
// console.log(!isNaN(Number(word)))
// transcript = 'plus plus plus minus equals to times times divide hi hello die open bracket close bracket'
// newTranscript = speechReplace(transcript, newDict)
// // keys = Object.keys(symbols)
// // document.querySelector('p').textContent += transcript + ' ' + transcript.replaceAll(key, symbols[key])
// document.querySelector('p').textContent += transcript + ' ' + newTranscript
