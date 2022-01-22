from deepgram import Deepgram

deepgram_API_ID = "c3e43d71-494b-476e-98f2-a23099ea09dc"
deepgram_API_key = "3cae52d03dc0daef5f57c383f74bfd2ade6e4923"
dg_client = Deepgram(deepgram_API_key)
# or, fully specify for an alternate endpoint
dg_client = Deepgram({
    'api_key':
    deepgram_API_key,
    'api_url':
    "https://console.deepgram.com/project/0ba7526d-31ab-4a70-af0f-2b1354aff1bc"
})

from deepgram import Deepgram
import asyncio, json

DEEPGRAM_API_KEY = deepgram_API_key
PATH_TO_FILE = 'D:\Coding\Deepgram-challenge\Recordings\\greek.ogg'


async def main():
    # Initializes the Deepgram SDK
    dg_client = Deepgram(DEEPGRAM_API_KEY)
    # Open the audio file
    with open(PATH_TO_FILE, 'rb') as audio:
        # ...or replace mimetype as appropriate
        source = {'buffer': audio, 'mimetype': 'audio/wav'}
        response = await dg_client.transcription.prerecorded(
            source, {
                'punctuate': True,
                'numerals': True
            })
        print(json.dumps(response, indent=4))


asyncio.run(main())