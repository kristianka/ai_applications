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

model = EfficientNetB7(weights="imagenet")

img_path = "test_images/lung.png"

img = cv2.imread(img_path)

# Check if the image is loaded correctly
if img is None:
    raise ValueError(f"Image not found at path: {img_path}")


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
