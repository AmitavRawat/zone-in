from flask import Flask, request, send_file
import openai
import clip
from PIL import Image as PILImage
import torch
from io import BytesIO
import requests

# Initialize Flask app
app = Flask(__name__)

# Set the OPENAI_API_KEY environment variable
openai.api_key = "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"


def load_model():
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model, preprocess = clip.load("ViT-B/32", device=device)
    return model, preprocess, device


def generate_image(input_image, description):
    model, preprocess, device = load_model()

    # Process the image
    image = preprocess(input_image).unsqueeze(0).to(device)

    # Tokenize and encode text and image
    with torch.no_grad():
        image_features = model.encode_image(image)

    # For demonstration, we use a static prompt. Integrate actual usage accordingly
    detailed_prompt = f"Create a super realistic render of the image considering the modifications and based on the original features of the house: {description}"

    # Call OpenAI API to generate the image
    response = openai.Image.create(
        prompt=detailed_prompt,
        n=1,
        size="512x512"
    )

    # Assuming the response includes an image, convert to PIL image
    if response.data:
        image_url = response.data[0].url
        image_response = requests.get(image_url)
        generated_image = PILImage.open(BytesIO(image_response.content))
        return generated_image
    else:
        raise Exception("No image data found in response")


@app.route('/main', methods=['POST'])
def main():
    text = request.form.get('text')
    file = request.files.get('image')

    if not text or not file:
        return "Missing text or image", 400

    input_image = PILImage.open(file.stream)

    try:
        generated_image = generate_image(input_image, text)
        # Save the generated image to a buffer
        buffer = BytesIO()
        generated_image.save(buffer, format="PNG")
        buffer.seek(0)

        return send_file(buffer, mimetype='image/png')
    except Exception as e:
        return str(e), 500


if __name__ == '__main__':
    app.run(debug=True, port = 8001)
