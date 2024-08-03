import requests

# Define your API key
api_key = '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'

# Set the endpoint URL
url = 'https://api.openai.com/v1/chat/completions'

# Set the headers with your API key
headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

# Define the function to interact with the API
def chat_with_gpt(messages):
    data = {
        'model': 'gpt-3.5-turbo',
        'messages': messages,
    }

    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.json())
        return None

# Read content from a text file
def get_content_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read().strip()
        return content
    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
        return None

# File path for the system prompt
system_file_path = "C:/Users/aryan/Downloads/Uni Essay Chatbot/system_prompt.txt"

# Get the system prompt
system_prompt = get_content_from_file(system_file_path)

if system_prompt:
    # Initialize messages with the system message
    messages = [
        {"role": "system", "content": system_prompt}
    ]

    print("Starting chat session. Type 'exit' or 'quit' to end the session.")

    # Start the chat loop
    while True:
        # Get user input
        user_input = input("User: ").strip()
        if user_input.lower() in ["exit", "quit"]:
            print("Ending chat session.")
            break

        # Add user's new input to the messages list
        messages.append({"role": "user", "content": user_input})

        # Call the API and print the response
        response = chat_with_gpt(messages)
        if response:
            assistant_response = response['choices'][0]['message']['content']
            print(f"Assistant: {assistant_response}")

            # Add the assistant's response to the messages list
            messages.append({"role": "assistant", "content": assistant_response})
