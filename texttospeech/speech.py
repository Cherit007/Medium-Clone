from flask import Flask, request, Response
from gtts import gTTS
import tempfile

app = Flask(__name__)

@app.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    # Get the text from the POST request
    t = request.get_json()
    text=t["text"]

    if text:
        tts = gTTS(text)
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_mp3_file:
            tts.save(temp_mp3_file.name)
            response = open(temp_mp3_file.name, 'rb').read()
            return Response(response, mimetype="audio/mpeg", headers={"Content-Disposition": "attachment; filename=output.mp3"})
    else:
        return "Please provide 'text' in the request data.", 400

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=int("9090"),debug=True)