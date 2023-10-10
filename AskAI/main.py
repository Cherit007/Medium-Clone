from flask import Flask ,request , jsonify
import openai
import os
from dotenv import load_dotenv
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app=Flask(__name__)    
@app.route("/ask-ai",methods=["POST"])
def askai():
    data =request.get_json()
    text=data["text"]
    prompt = "I will give you the title of the article , please give me some important points to write in the article based on the title and after each point add '#' symbol , the title is {} ".format(text)
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.314,
        max_tokens=256,
        top_p=0.54,
        frequency_penalty=0.44,
        presence_penalty=0.17)
    res=response.choices[0].text
    res=res.split("#")
    return jsonify({"result":res})
               

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=int("7000"),debug=True)