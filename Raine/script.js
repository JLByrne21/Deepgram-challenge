// Different dictionaries for different purposes
symbols = { 'equals to': '=', 'plus': '+', 'minus': '-', 'times': '* ', 'divide': '/' }
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

function speechReplace(transcript, dictionaries) {
    // Iterate through different dictionaries in the dictionary list
    for (i = 0; i < dictionaries.length; i++) {
        dictName = dictionaries[i]
        keys = Object.keys(dictName)
        for (j = 0; j < keys.length; j++) {
            transcript = transcript.replaceAll(keys[j], dictName[keys[j]])
        }
    }
    return transcript
}

// List of dictionaries
dictionaries = [symbols, brackets, greeks]
newDict = mergeDict(dictionaries)
