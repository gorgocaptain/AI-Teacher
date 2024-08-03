from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import cohere
import csv

api_key = 'hqiRx0LzP0DQd4R4NY9beBtXgv3oT2byqU2mmf4e'  # Replace with your actual API key
co = cohere.Client(api_key)

app = Flask(__name__)
CORS(app)

@app.route('/sort-scholarships', methods=['POST'])
def sort_scholarships():
    data = request.json
    user_input = data.get('input')
    print(user_input)
    
    # Find and rerank scholarships
    scholarships = find_scholarships(user_input)
    
    # Return the top 12 scholarships
    top_12 = scholarships[:12]  # Get the top 12
    return jsonify(top_12)

def find_scholarships(user_query):
    csv_file_path = "C:/Users/akish/AI-Teacher/AITUTOR/backend/scholarships.csv"

    # Read the CSV file and create a list of scholarships
    scholarships = []
    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            scholarships.append({
                "name": row['Award Name'],
                "description": f"Organization: {row['Organization']}. Purpose: {row['Purpose']}. Level Of Study: {row['Level Of Study']}. Award Type: {row['Award Type']}. Award Amount: {row['Award Amount']}. Deadline: {row['Deadline']}"
            })

    # Create a list of text inputs for the Cohere rerank API
    texts = [f"{scholarship['name']}: {scholarship['description']}" for scholarship in scholarships]

    # Use Cohere's rerank function
    response = co.rerank(
        query=user_query,
        documents=texts
    )

    # Prepare the list of reranked scholarships
    reranked_scholarships = []
    for result in response.results:
        index = result.index
        relevance_score = result.relevance_score
        scholarship = scholarships[index]
        reranked_scholarships.append({
            "Name": scholarship["name"],
            "Description": scholarship["description"],
            "RelevanceScore": relevance_score,
            "Amount": scholarship["description"]  # Adjust if needed
        })

    return reranked_scholarships

if __name__ == '__main__':
    app.run(debug=True)
