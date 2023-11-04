import requests

# URL of your Flask API endpoint
url = 'http://localhost:9090/text-to-speech'  # Replace with your actual API URL

# JSON data to send in the request
data = {
    "text": """Let’s design a Netflix like video streaming service, similar to services like Amazon Prime Video, Disney Plus, Hulu, Youtube, Vimeo, etc.

What is Netflix?
Netflix is a subscription-based streaming service that allows its members to watch TV shows and movies on an internet-connected device. It is available on platforms such as the Web, iOS, Android, TV, etc.

Requirements
Our system should meet the following requirements:

Functional requirements
Users should be able to stream and share videos.
The content team (or users in YouTube’s case) should be able to upload new videos (movies, tv shows episodes, and other content).
Users should be able to search for videos using titles or tags.
Users should be able to comment on a video similar to YouTube.
Non-Functional requirements
High availability with minimal latency.
High reliability, no uploads should be lost.
The system should be scalable and efficient.
Extended requirements
Certain content should be geo-blocked.
Resume video playback from the point user left off.
Record metrics and analytics of videos.
Estimation and Constraints
Let’s start with the estimation and constraints.

Note: Make sure to check any scale or traffic-related assumptions with your interviewer."""
}

response = requests.post(url, json=data)

if response.status_code == 200:
    # Save the audio response to a file
    with open("output.mp3", "wb") as f:
        f.write(response.content)
    print("Audio file saved as 'output.mp3'")
else:
    print(f"Error: {response.status_code} - {response.text}")
