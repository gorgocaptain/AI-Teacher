from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere
import csv
import requests

api_key = 'hqiRx0LzP0DQd4R4NY9beBtXgv3oT2byqU2mmf4e'  # Replace with your actual API key
co = cohere.Client(api_key)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes by default

@app.route('/sort-scholarships', methods=['POST'])
def sort_scholarships():
    data = request.json
    user_input = data.get('input')
    
    scholarships = find_scholarships(user_input)
    
    top_12 = scholarships[:12]
    return jsonify(top_12)

@app.route('/generate-essay-feedback', methods=['POST'])
def generate_essay_feedback():
    data = request.json
    user_input = data.get('input')
    
    feedback = get_feedback_from_ai(user_input)
    if feedback:
        return jsonify({"feedback": feedback})
    else:
        return jsonify({"error": "Unable to generate feedback"}), 500

def find_scholarships(user_query):
    csv_file_path = "./scholarships.csv"

    scholarships = []
    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            scholarships.append({
                "name": row['Award Name'],
                "description": f"Organization: {row['Organization']}. Purpose: {row['Purpose']}. Level Of Study: {row['Level Of Study']}. Award Type: {row['Award Type']}. Award Amount: {row['Award Amount']}. Deadline: {row['Deadline']}"
            })
    
    texts = [f"{scholarship['name']}: {scholarship['description']}" for scholarship in scholarships]

    response = co.rerank(
        query=user_query,
        documents=texts
    )

    reranked_scholarships = []
    for result in response.results:
        index = result.index
        relevance_score = result.relevance_score
        scholarship = scholarships[index]
        reranked_scholarships.append({
            "Name": scholarship["name"],
            "Description": scholarship["description"],
            "RelevanceScore": relevance_score,
            "Amount": scholarship["description"]  
        })

    return reranked_scholarships

def get_feedback_from_ai(user_input):
    API_KEY = 'your-openai-api-key'  # Replace with your actual API key
    URL = 'https://api.openai.com/v1/chat/completions'

    HEADERS = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {
        'model': 'gpt-3.5-turbo',
        'messages': [
            {"role": "system", "content": "Provide feedback on the essay."},
            {"role": "user", "content": user_input}
        ],
    }

    response = requests.post(URL, headers=HEADERS, json=data)
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        print(f"Error: {response.status_code}")
        print(response.json())
        return None

if __name__ == '__main__':
    app.run(port=5000, debug=True)
