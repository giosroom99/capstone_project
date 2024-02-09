from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import datetime
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import pickle
from preprocessing import preprocess
import db

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/user', methods=['GET'])
@cross_origin()
def get_users():
    return db.get_users(), 200

@app.route('/user/<user_id>', methods=['GET'])
@cross_origin()
def get_user(user_id):
    return db.get_user(user_id), 200

@app.route('/user/<user_id>/chat', methods=['GET'])
@cross_origin()
def get_chats(user_id):
    return db.get_chats(user_id), 200

@app.route('/chat', methods=['POST'])
@cross_origin()
def upload_newmessage():
    data = request.get_json()

    sender_ID = data.get("sender_ID")
    recipient_ID = data.get("recipient_ID")
    message_text = data.get("message_text")
    is_manager_response = data.get("is_manager_response") == "true"
    timestamp = datetime.datetime.now(tz=datetime.timezone.utc)

    message = {
        "chat_ID": "-1",
        "sender_ID": sender_ID,
        "recipient_ID": recipient_ID,
        "message_text": message_text,
        "timestamp": timestamp,
        "is_manager_response": is_manager_response,
        "is_read": False
    }

    print("Posting message")
    db.post_message(message)
    return "Success", 200

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

    #app.config['MONGO_URI'] = db.getConnectionString()
    # db.connectToDB()
    app.run(port=5000, debug=True)


