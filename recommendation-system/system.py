from flask import Flask ,request , jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import csv
app=Flask(__name__)
# Initialize and load articles

tfidf_vectorizer = TfidfVectorizer()

# Function to get recommendations
def get_recommendations(title,df, cosine_sim):
    idx = df[df['Title'] == title].index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:6]  # Get the top 5 most similar articles
    article_indices = [i[0] for i in sim_scores]
    # print(type(df['Title'].iloc[article_indices]))
    return jsonify({"recommendations":df['Title'].iloc[article_indices].tolist()})

@app.route("/get-recommendations",methods=["POST"])
def get_recom():
    req=request.get_json()
    article=req["article_name"]
    ndf=pd.read_csv("data.csv")
    tfidf_matrix = tfidf_vectorizer.fit_transform(ndf['Title'])
    # Compute the cosine similarity between articles
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    return get_recommendations(article,ndf,cosine_sim)

@app.route("/add-to-recommendations",methods=["POST"])
def add_recom():
    try:
        req=request.get_json()
        article=req["article_name_to_add"]
        df=pd.read_csv("data.csv")
        n={"Title":article}
        df=df._append(n,ignore_index=True)
        df.to_csv("data.csv",index=False)
        return "success"
    except Exception as e:
        # Handle the error and print the exception message
        return(f"An error occurred: {e}")
    
@app.route("/delete-recommendation",methods=["POST"])
def del_recom():
    try:
        req=request.get_json()
        title_to_delete=req["article_name_to_delete"]
        ddf=pd.read_csv("data.csv")
        if title_to_delete in ddf['Title'].values:
            # Use boolean indexing to exclude the row with the specified title
            ddf = ddf[ddf['Title'] != title_to_delete]
        ddf.to_csv("data.csv",index=False)
        return "success"
    except:
        return "error in deleting article"

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=int("9000"),debug=True)