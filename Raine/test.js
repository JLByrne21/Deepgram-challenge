// Different dictionaries for different purposes
symbols = { 'equals to': '=', 'plus': '+', 'minus': '-', 'times': '* ', 'divide': '/' }
brackets = { 'open bracket': '(', 'close bracket': ')' }

// List of dictionaries
dictionaries = [symbols, brackets]


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
word = '1'
console.log(Number(word))
console.log(!isNaN(Number(word)))
transcript = 'plus plus plus minus equals to times times divide hi hello die open bracket close bracket'
newTranscript = speechReplace(transcript, dictionaries)
// keys = Object.keys(symbols)
// document.querySelector('p').textContent += transcript + ' ' + transcript.replaceAll(key, symbols[key])
document.querySelector('p').textContent += transcript + ' ' + newTranscript
