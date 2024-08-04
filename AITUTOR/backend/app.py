from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import cohere
import csv

api_key = 'hqiRx0LzP0DQd4R4NY9beBtXgv3oT2byqU2mmf4e' 
co = cohere.Client(api_key)

app = Flask(__name__)
CORS(app)

@app.route('/sort-scholarships', methods=['POST']) #Specifies the endpoint users can make post requests from
def sort_scholarships():
    data = request.json #Retrieves the JSON file with the data that was sent from the front-end
    user_input = data.get('input') #Retrieves input from the JSON file
    
    scholarships = find_scholarships(user_input) #Call the find scholarship function to find scholarships that best fit based on users data
    
    top_12 = scholarships[:12]  #Takes the first 12 scholarships from the list
    return jsonify(top_12) #Returns the data as a json file

def find_scholarships(user_query):
    csv_file_path = "C:/Users/akish/AI-Teacher/AITUTOR/backend/scholarships.csv"

    scholarships = [] #initialize an emptry list to store the scholarships
    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file) #Opens and reads the CSV file
        for row in reader: #Adds each scholorship to the list as a dictionary
            scholarships.append({
                "name": row['Award Name'],
                "description": f"Organization: {row['Organization']}. Purpose: {row['Purpose']}. Level Of Study: {row['Level Of Study']}. Award Type: {row['Award Type']}. Award Amount: {row['Award Amount']}. Deadline: {row['Deadline']}"
            })
        
    texts = [f"{scholarship['name']}: {scholarship['description']}" for scholarship in scholarships]

    response = co.rerank( #Sends a request to Cohere's rerank program to rank the list of scholarships based on the user query.
        query=user_query,
        documents=texts
    )

    reranked_scholarships = []
    for result in response.results: #Loop through the results given by the Cohere ranking
        index = result.index #Finds the index of the scholorship in the orginal list
        relevance_score = result.relevance_score #Gets the relevance score assigned to the scholorship based on ranking
        scholarship = scholarships[index] 
        reranked_scholarships.append({ #Create and add a dictionary with the following details to the reranked list
            "Name": scholarship["name"],
            "Description": scholarship["description"],
            "RelevanceScore": relevance_score,
            "Amount": scholarship["description"]  
        })

    return reranked_scholarships #return the new list 

if __name__ == '__main__':
    app.run(port=5000, debug=True)
