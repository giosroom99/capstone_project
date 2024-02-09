from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem.porter import PorterStemmer
import pickle
import re

model = pickle.load(open('MNB_feedback_model.pkl', 'rb'))
cv = pickle.load(open('countvectorizer.pkl', 'rb'))

def stem_words(feedback):
    ps = PorterStemmer()
    return ' '.join([ps.stem(word) for word in feedback.split()])

def preprocess(feedback):
    feedback = feedback.lower()
    feedback = re.sub("[^a-z\s]", "", feedback)
    feedback = stem_words(feedback)

    return feedback

def predict_sentiment(text):
    text = preprocess(text)
    input_data = cv.transform([text])
    res = model.predict(input_data)[0]

    return res
