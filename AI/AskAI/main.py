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

    prompt2 = "I will give you the array of sub points of the article topic , please write 1-2 lines of description for each point in the array which i will provide and after each point add '$' symbol , the title is {} and the array of topics are {}.Dont include the array points in the response and the number of points should match number of descriptions you have provided".format(text,res)
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt2,
        temperature=0.314,
        max_tokens=256,
        top_p=0.54,
        frequency_penalty=0.44,
        presence_penalty=0.17)
    resp=response.choices[0].text
    resp=resp.split("$")
    a=[]
    for i in range(min(len(res),len(resp))):
        a.append({"point":res[i],"content":resp[i]})
    return a
               

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=int("7000"),debug=True)