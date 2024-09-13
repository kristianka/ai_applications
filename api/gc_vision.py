from google.cloud import vision
import io
import os
from dotenv import load_dotenv

load_dotenv()
# Set the environment variable for Google API access
google_credentials = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = google_credentials

client = vision.ImageAnnotatorClient()


def detect_labelsWithPath(image_path):
    """Detects labels in an image."""

    # Load the image into memory
    with io.open(image_path, "rb") as image_file:
        content = image_file.read()
    image = vision.Image(content=content)

    # Performs label detection on the image file
    response = client.label_detection(image=image)
    labels = response.label_annotations

    if response.error.message:
        raise Exception(f"{response.error.message}")

    # Extract and return label descriptions and scores
    label_data = [
        {"description": label.description, "score": label.score} for label in labels
    ]
    return label_data


def detect_labelsWithImage(file_content):
    """Detects labels in an image from file content."""

    # Create an image object from file content
    image = vision.Image(content=file_content)

    # Perform label detection on the image file
    response = client.label_detection(image=image)
    labels = response.label_annotations

    # Check for errors in the response
    if response.error.message:
        raise Exception(f"Error from Google Vision API: {response.error.message}")

    # Extract and return label descriptions and scores
    label_data = [
        {"description": label.description, "score": label.score} for label in labels
    ]
    return label_data


# Example usage
if __name__ == "__main__":
    # Path to your image
    image_path = "test_images/lung.png"
    labels = detect_labelsWithPath(image_path)
    print("Labels:")
    for label in labels:
        print(label)
