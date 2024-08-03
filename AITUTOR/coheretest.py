import cohere
import csv

# Initialize the Cohere client with your API key
api_key = 'hqiRx0LzP0DQd4R4NY9beBtXgv3oT2byqU2mmf4e'  # Replace with your actual API key
co = cohere.Client(api_key)

# Path to the CSV file
csv_file_path = "C:/Users/camel/PycharmProjects/AI Tutor/scholarships.csv"

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
user_query = "I am a female student looking for scholarships in STEM with a need for financial aid."

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
