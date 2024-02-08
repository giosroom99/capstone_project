from faker import Faker
import csv
import random

OUTPUT_FILE = "feedback.csv"
random_seed = 29

fake = Faker()
Faker.seed(random_seed)
random.seed(random_seed)

positive_words = [
    "appreciate", "helpful", "commendable", "responsive", "innovative", "improved", "productive", "excellent", "great",
    "satisfactory", "pleased", "efficient", "accomplished", "valuable", "supportive", "encouraging", "motivated", 
    "dedicated", "fantastic", "wonderful", "superb", "outstanding", "exemplary", "admire", "praiseworthy", "successful",
    "stellar", "exceptional", "extraordinary", "fabulous", "terrific", "awesome", "inspiring", "delighted", "positive"
]

negative_words = [
    "overwhelmed", "difficult", "lack", "misunderstandings", "disappointed", "concerned", "direction", "reassess", "issues",
    "problematic", "unresolved", "challenging", "frustrating", "troublesome", "stressful", "displeased", "dissatisfied",
    "unsatisfactory", "ineffective", "inefficient", "unreliable", "unacceptable", "negative", "unhappy", "unfavorable",
    "poor", "unsuitable", "inadequate", "lousy", "subpar", "dreadful", "terrible", "bad", "horrible", "disastrous",
    "awful", "deplorable", "unpleasant", "disheartening", "demoralizing", "grim", "unfortunate"
]

neutral_words = [
    "the", "and", "of", "a", "to", "in", "that", "it", "is", "was", "for", "you", "on", "are", "with", "as", 
    "at", "this", "be", "have", "from", "or", "an", "but", "by", "about", "they", "can", "we", "if"
]

def generate_positive_feedback_row():
    feedback = fake.sentence(nb_words=random.randint(5, 20), ext_word_list=positive_words + neutral_words)
    return [feedback, "Positive"]

def generate_negative_feedback_row():
    feedback = fake.sentence(nb_words=random.randint(5, 20), ext_word_list=negative_words + neutral_words)
    return [feedback, "Negative"]

num_positive_records = 500
num_negative_records = 500

positive_feedback_data = [generate_positive_feedback_row() for _ in range(num_positive_records)]
negative_feedback_data = [generate_negative_feedback_row() for _ in range(num_negative_records)]

datarows = positive_feedback_data + negative_feedback_data
random.shuffle(datarows)

with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["feedback", "sentiment"]
    )
    writer.writerows(datarows)