
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
    // console.log(newDict)
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

function transcribe() {
    // Get access to user's microphone {audio:true}, if want video {camera:true}
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        // Log the stream onto the console
        // console.log(stream)

        // Return alert if media type is not supported
        if (!MediaRecorder.isTypeSupported('audio/webm')) return alert('Browser not supported')
        // Create instance of MediaRecorder
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
        // Create websocket
        var url = new URL('wss://api.deepgram.com/v1/listen');
        url.searchParams.set('numerals', true);
        const socket = new WebSocket(url, [
            'token',
            '3cae52d03dc0daef5f57c383f74bfd2ade6e4923',
        ])

        socket.onopen = () => {
            mediaRecorder.addEventListener('dataavailable', event => {
                socket.send(event.data)
            })
            // Record and send data every 250 ms 
            mediaRecorder.start(250)
        }
        socket.onmessage = message => {
            document.querySelector('#status').textContent = 'Listening...   '

            const data = JSON.parse(message.data)
            console.log(data)
            const transcript = data.channel.alternatives[0].transcript
            if (transcript && data.is_final) {
                console.log(transcript)
                document.querySelector('#transcript').textContent += ' ' + transcript

                newTranscript = speechReplace(transcript, newDict)
                document.querySelector('#transcript_editted').textContent += ' ' + newTranscript
            }
        }

        // socket.onmessage = message => {
        //     const data = JSON.parse(message.data)
        //     console.log(data)
        //     // Transcript shows the process of transcribing speech, will show the sentences 
        //     // getting longer and longer, repeating a few times
        //     const transcript = data.channel.alternatives[0].transcript
        //     // Only console logging when the phrase is final
        //     if (transcript && data.is_final) {
        //         // Logging onto user console
        //         console.log(transcript)
        //         // Logging onto the html file
        //         newTranscript = speechReplace(transcript, newDict)
        //         document.querySelector('#status').textContent = 'Connected'
        //         document.querySelector('p').textContent += ' ' + newTranscript
        //     }
        // }
    })
}

// clears transcript
function Clean() {
    document.getElementById('transcript').innerHTML = '';
    document.getElementById('transcript_editted').innerHTML = '';

}