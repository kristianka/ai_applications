import numpy as np
import matplotlib.pyplot as plt
import os
import cv2
from keras.applications.resnet50 import ResNet50
from keras.preprocessing import image
from keras.applications.efficientnet import (
    EfficientNetB7,
    preprocess_input,
    decode_predictions,
)


def detect_labelsWithImagePython(file_content):
    model = EfficientNetB7(weights="imagenet")

    # Convert the byte content to a NumPy array and decode it to an image
    file_bytes = np.frombuffer(file_content, dtype=np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Check if the image is loaded correctly
    if img is None:
        raise ValueError(f"Image not found received: {file_content}")

    # Preprocess the image
    img = cv2.resize(img, (600, 600))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    # Make predictions
    preds = model.predict(x)

    # Decode and display predictions
    print("Predicted:", decode_predictions(preds, top=3)[0])

    plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    plt.title("Input Image")
    plt.show()
    return decode_predictions(preds, top=3)[0]
