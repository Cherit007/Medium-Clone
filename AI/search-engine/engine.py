from flask import Flask ,request , jsonify
from elasticsearch import Elasticsearch
import pandas as pd
import json
import os
app=Flask(__name__)

# Create the client instance

#es = Elasticsearch(hosts=["http://localhost:9200"])
es = Elasticsearch(
    cloud_id='5c3d8718e4c04ecfa161f13670f71f55:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ2OTBhN2E0NjZmODA0MzhkOTYwOGQ4N2MwNzk1NTkxYSRlMzgyY2NlMmNlYzQ0ZWZiYmM3MGQ3MDNlMWJlYTk2Yw==',
    basic_auth=("elastic", "XIHCX7seGgbtin4bDUg8InVJ")
)
## THIS IS THE OCE TO CREATE INDEX IN THE ELASTC SEARCH AND LOAD THE DATA IN IT

index_name = 'article_index'  # Choose a suitable index name

# mapping = {
#     'properties': {
#         'article_id': {'type': 'text'},
#         'article_name': {'type': 'text'}
#     }
# }

# es.indices.create(index=index_name, ignore=400)
# es.indices.put_mapping(index=index_name, body=mapping)

def index_product(article_id, article_name):
    document = {
        'article_id': article_id,
        'article_name': article_name
    }
    es.index(index=index_name, body=document, id=article_id)

articles = [
    "Introduction to Python Programming",
    "Building RESTful APIs with Flask",
    "Data Structures and Algorithms in C++",
    "Machine Learning Fundamentals with Scikit-Learn",
    "Web Development with JavaScript and React",
    "Creating a Responsive Design with CSS Grid",
    "Debugging Techniques for Software Developers",
    "An Introduction to Git and GitHub Workflow",
    "Securing Your Web Applications: Best Practices",
    "Diving into Docker: Containerization Simplified",
    "Building a RESTful API with Node.js and Express",
    "Machine Learning Models for Image Recognition",
    "Exploring the World of Blockchain Technology",
    "Introduction to Cybersecurity and Ethical Hacking",
    "Effective Database Management with SQL",
    "Python Data Visualization with Matplotlib",
    "Full-Stack Development with MERN Stack",
    "Automating Tasks with Python Scripts",
    "Data Science: Exploring Pandas and NumPy",
    "Machine Learning in Healthcare: Applications and Challenges",
    "JavaScript Frameworks: React vs. Angular vs. Vue.js",
    "Mastering REST API Authentication",
    "Scaling Microservices with Kubernetes",
    "Software Testing Best Practices",
    "The Power of Functional Programming in JavaScript",
    "Web Security: Protecting Against Common Attacks",
    "Introduction to DevOps: Principles and Tools",
    "Creating Your First Mobile App with React Native",
    "Quantum Computing: The Future of Information Processing",
    "Exploring the Internet of Things (IoT) Development"
]

# for i in range(len(articles)):
#     index_product(i,articles[i])


@app.route('/search', methods=['POST'])
def search():
    req=request.get_json()
    data=req["keyword"].lower()
    body = {
    'query': {
        'wildcard': {
            'article_name': {
                'value': '*' + data + '*',
                'boost': 1.0,
                'case_insensitive': True
                }
            }
        }
    }
    response = es.search(index=index_name, body=body)
    hits = response['hits']['hits']
    print(hits)
    products=[]
    ids=[]
    for hit in hits:

      products.append(hit['_source']['article_name'])
      ids.append(hit['_source']['article_id'])
    d = pd.DataFrame({'articles': products, 'article_id': ids})
    data = d.to_dict(orient='records')

    # Convert the data to JSON
    json_data = json.dumps(data)
    return json_data


@app.route('/add-article-elastic-search',methods=["POST"])
def add():
   
    req=request.get_json()
    title=req["title"]
    article_id=req["article_id"]
    try:
        index_product(article_id, title)
        return "success"
    except :
        return "error in adding title to elastic search"

@app.route('/delete-article-elastic-search',methods=["POST"])
def delete():
    req=request.get_json()
    article_name=req["article_name"]
    body = {
        'query': {
            'match': {
                'article_name': article_name
            }
        }
    }
    response = es.search(index=index_name, body=body)
    hits = response['hits']['hits']
    doc_id = hits[0]['_id']
    try:
        es.delete(index=index_name, id=doc_id)
        return "success"
    except:
        return "error in deleting article from elastic search"

    



if __name__ == "__main__":
    app.run(host="0.0.0.0",port=int("8000"),debug=True)