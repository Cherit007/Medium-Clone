import requests

# URL of your Flask API endpoint
url = 'http://localhost:9090/text-to-speech'  # Replace with your actual API URL

# JSON data to send in the request
data = {
    "text": "Hello, dhanush iam here for a  conversion."
}

response = requests.post(url, json=data)

if response.status_code == 200:
    # Save the audio response to a file
    with open("output.mp3", "wb") as f:
        f.write(response.content)
    print("Audio file saved as 'output.mp3'")
else:
    print(f"Error: {response.status_code} - {response.text}")
