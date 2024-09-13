from flask import Flask, request, jsonify

from gc_vision import detect_labelsWithImage

app = Flask(__name__)


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
            labels = detect_labelsWithImage(file_contents)
            return jsonify({"labels": labels}), 200
        except Exception as e:
            return jsonify({"message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
