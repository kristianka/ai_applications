from google.cloud import vision
import io
import os
from dotenv import load_dotenv

load_dotenv()
# Set the environment variable for Google API access
google_credentials = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = google_credentials

client = vision.ImageAnnotatorClient()


def detect_labels(image_path):
    """Detects labels in an image."""

    # Load the image into memory
    with io.open(image_path, "rb") as image_file:
        content = image_file.read()
    image = vision.Image(content=content)

    # Performs label detection on the image file
    response = client.label_detection(image=image)
    labels = response.label_annotations

    print("Labels:")
    for label in labels:
        print(label.description)

    if response.error.message:
        raise Exception(f"{response.error.message}")


# Path to your image
image_path = "test_images/lung.png"
detect_labels(image_path)
