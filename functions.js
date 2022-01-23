function mergeDict(dictionaries) {
    newDict = {}
    for (i = 0; i < dictionaries.length; i++) {
        newDict = Object.assign({}, newDict, dictionaries[i])
    }
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

function record() {
    document.querySelector('#status').textContent = ''
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        if (!MediaRecorder.isTypeSupported('audio/webm')) return alert('Browser not supported')
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
        var keywords = "numerals=true&keywords=alpha:9&keywords=beta:9&keywords=gamma:9&keywords=delta:9&keywords=epsilon:9&keywords=zeta:9&keywords=eta:9&keywords=theta:9&keywords=iota:9&keywords=kappa:9&keywords=lambda:9&keywords=mu:10&keywords=nu:10&keywords=xi:9&keywords=omicron:10&keywords=pi:9&keywords=rho:10&keywords=sigma:9&keywords=tau:9&keywords=upsilon:9&keywords=phi:9&keywords=omega:9&keywords=plus:9&keywords=minus:9&keywords=divide:9&times:9&keywords:open:8&keywords:bracket:8&keywords:close:8&";
        var string_url = 'wss://api.deepgram.com/v1/listen?' + keywords
        const socket = new WebSocket(string_url, [
            'token',
            '3cae52d03dc0daef5f57c383f74bfd2ade6e4923',
        ])

        socket.onopen = () => {
            mediaRecorder.addEventListener('dataavailable', event => {
                socket.send(event.data)
            })
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
    })
}

// clears transcript
function Clean() {
    document.getElementById('transcript').innerHTML = '';
    document.getElementById('transcript_editted').innerHTML = '';

}