from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import pickle
from preprocessing import preprocess

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    data = request.get_json()

    text = "Manager not doing a good job."
    text = preprocess(text)

    input_data = cv.transform([text])

    res = model.predict(input_data)[0]
    return jsonify(res)

if __name__ == "__main__":
    model = pickle.load(open('MNB_feedback_model.pkl', 'rb'))
    cv = pickle.load(open('countvectorizer.pkl', 'rb'))

    app.run(port=5000)


