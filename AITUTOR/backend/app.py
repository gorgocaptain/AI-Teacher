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
    find_schloarships(user_input)
    # Load and sort the CSV based on user input
    df = pd.read_csv('C:/Users/akish/AI-Teacher/AITUTOR/backend/scholarships.csv')
    sorted_df = df[df['Deadline'].str.contains(user_input, case=False)]
    top_3 = sorted_df.head(3).to_dict(orient='records')
    
    return jsonify(top_3)



def find_schloarships(user_query):
    # Initialize the Cohere client with your API key

    # Path to the CSV file
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

        # Define a query representing the user's preferences or profile

        # Create a list of text inputs for the Cohere rerank API
    texts = [f"{scholarship['name']}: {scholarship['description']}" for scholarship in scholarships]

        # Use Cohere's rerank function
    response = co.rerank(
        query=user_query,
        documents=texts
    )

        # Output the reranked results
    print("Reranked Scholarships:")
    for idx, result in enumerate(response.results, start=1):
        index = result.index
        relevance_score = result.relevance_score
        print(f"{idx}. {texts[index]} (Relevance Score: {relevance_score})")


if __name__ == '__main__':
    app.run(debug=True)