from flask import Flask ,request , jsonify
import math
import pickle
clf=pickle.load(open('nlp_m21.pkl','rb'))
cv=pickle.load(open('trans.pkl','rb'))
# sentiment = SentimentIntensityAnalyzer()

# def floor_or_ceil(value):
#     decimal_part = value - int(value)

#     if decimal_part < 0.5:
#         return math.floor(value)  
#     elif decimal_part >= 0.5:
#         return math.ceil(value)
# def calculate_rating(pos, neg, neu):
#     positive_weight = 5
#     negative_weight = 2
#     neutral_weight = 1
#     weighted_sum = (pos * positive_weight +
#                 neg * negative_weight +
#                 neu * neutral_weight)
#     min_rating = 1  
#     max_rating = 5  

#     rating = min_rating + (weighted_sum / sum([positive_weight, negative_weight, neutral_weight])) * (max_rating - min_rating)
#     return rating
app=Flask(__name__)    
@app.route("/analyze",methods=["POST"])
def analyze():
    req=request.get_json()
    text=req["comment"]
    # pol=sentiment.polarity_scores(text)
    
    # pos_score = pol['pos']
    # neg_score = pol['neg']
    # neu_score = pol['neu']
    # rating = calculate_rating(pos_score, neg_score, neu_score)
    # return jsonify({"comment_rating":math.ceil(rating)})
    data=[text]
    vect=cv.transform(data).toarray()
    rating=clf.predict(vect)
    return jsonify({"comment_rating":str(rating[0])})

    


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=int("9060"),debug=True)