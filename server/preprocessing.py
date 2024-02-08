from nltk.stem.porter import PorterStemmer
import re

def stem_words(feedback):
    ps = PorterStemmer()
    return ' '.join([ps.stem(word) for word in feedback.split()])

def preprocess(feedback):
    feedback = feedback.lower()
    feedback = re.sub("[^a-z\s]", "", feedback)
    feedback = stem_words(feedback)

    return feedback
