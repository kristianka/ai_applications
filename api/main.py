from flask import Flask, request, jsonify
from flask_cors import CORS

from gc_vision import detect_labelsWithImage
from local import detect_labelsWithImagePython

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}})


@app.route("/", methods=["GET"])
def home():
    return "Welcome to the file upload API! See the GitHub repository for usage instructions."


@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"message": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"message": "No selected file"}), 400

    if file:
        file_contents = file.read()
        try:
            # return the labels detected in the image
            gc_labels = detect_labelsWithImage(file_contents)
            python_labels = detect_labelsWithImagePython(file_contents)

            # convert float32 to float for JSON serialization
            python_labels = [
                (label[0], label[1], float(label[2])) for label in python_labels
            ]

            print("Successfully detected labels in the image")
            print("GC labels:", gc_labels)
            print("Python labels:", python_labels)

            return (
                jsonify({"GC_labels": gc_labels, "Python_labels": python_labels}),
                200,
            )
        except Exception as e:
            return jsonify({"message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
