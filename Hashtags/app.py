from flask import Flask ,request , jsonify
import string
import nltk
import re

def tokenize_text(text):
    # Use regular expression to split text into words
    words = re.findall(r'\w+', text.lower())
    return words

# nltk.download('stopwords')
#nltk.download('punkt')

# Function to extract main context and generate hashtags using NLTK
def extract_context_and_generate_hashtags(article_text, num_keywords=5):
    # Tokenize the article text into words
    words = tokenize_text(article_text.lower())

    # Remove punctuation and stopwords
    stop_words = set(["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
                     "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she",
                     "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
                     "theirs", "themselves", "what", "which", "who", "whom", "this", "that",
                     "these", "those", "am", "is", "are", "was", "were", "be", "been", "being",
                     "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an",
                     "the", "and", "but", "if", "or", "because", "as", "until", "while", "of",
                     "at", "by", "for", "with", "about", "against", "between", "into", "through",
                     "during", "before", "after", "above", "below", "to", "from", "up", "down",
                     "in", "out", "on", "off", "over", "under", "again", "further", "then", "once"])
    filtered_words = [word.strip(string.punctuation) for word in words if word.strip(string.punctuation) not in stop_words]

    # Calculate word frequencies
    word_freq = nltk.FreqDist(filtered_words)

    # Get the top keywords
    top_keywords = [word for word, freq in word_freq.most_common(num_keywords)]

    # Generate hashtags from the top keywords
    hashtags = ['#' + keyword.replace(' ', '') for keyword in top_keywords if keyword]

    return hashtags





app=Flask(__name__)
@app.route('/tag', methods=['POST'])
def hashtag():
    req=request.get_json()
    data=req["text"]
    r=extract_context_and_generate_hashtags(data)
    return jsonify({"Tags":r})
    
    
               

if __name__ == "__main__":
    app.run(debug=True)