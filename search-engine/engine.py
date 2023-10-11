from flask import Flask ,request , jsonify
from elasticsearch import Elasticsearch
import pandas as pd
import json
import os
app=Flask(__name__)

# Create the client instance

#es = Elasticsearch(hosts=["http://localhost:9200"])
es = Elasticsearch(
    cloud_id='Mindscribe-deployment:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDJjYmY4MjBkNTc5ZjQ5OGVhODZhNTVkNmQxOGVlYTFmJGJkNGY3NWJkM2ExNzRlMjk5NDFlMjM4ODI3N2E5ZGM2',
    api_key='UEJkQkhZc0JVaTAyTUkxRHFQN186ZlVJZnNJblRTMi1vNWhKbnlJVlZiQQ==',
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
    
    



if __name__ == "__main__":
    app.run(host="0.0.0.0",port=int("8000"),debug=True)