from faker import Faker
import csv
import random
import nltk

nltk.download('stopwords')

OUTPUT_FILE = "feedback.csv"
random_seed = 29

fake = Faker()
Faker.seed(random_seed)
random.seed(random_seed)

positive_words = [
    "excellent", "great", "wonderful", "fantastic", "amazing",
    "outstanding", "superb", "awesome", "brilliant", "terrific",
    "exceptional", "phenomenal", "splendid", "stellar", "superior",
    "commendable", "praiseworthy", "exceptionally", "extraordinary",
    "impressive", "remarkable", "marvelous", "top-notch", "first-rate",
    "perfect", "best", "ideal", "witty", "genius",
    "clever", "astounding", "awe-inspiring", "unbeatable", "unbelievable",
    "incredible", "sublime", "sensational", "fabulous", "remarkable",
    "praise", "kudos", "applause", "accolade", "victory",
    "win", "success", "achievement", "triumph", "congratulations",
    "commendation", "recognition", "appreciation", "admirable", "inspiring",
    "enjoyable", "delightful", "pleasing", "satisfying", "gratifying",
    "joyful", "uplifting", "optimistic", "happy", "content",
    "cheerful", "exhilarating", "rewarding", "fulfilling", "encouraging",
    "motivating", "invigorating", "energizing", "refreshing", "inspirational",
    "empowering", "enthusiastic", "positive", "constructive", "supportive",
    "beneficial", "favorable", "good", "valuable", "exemplary",
    "fine", "bright", "wholesome", "hopeful", "pleasant",
    "friendly", "kind", "warm", "thoughtful", "caring",
    "compassionate", "considerate", "respectful", "polite", "courteous",
    "helpful", "generous", "gracious", "kindhearted", "charitable",
    "benevolent", "honest", "trustworthy", "reliable", "dependable",
    "ethical", "upstanding", "integrity", "loyal", "dedicated",
    "committed", "devoted", "passionate", "enthusiastic", "hardworking",
    "diligent", "persevering", "efficient", "productive", "creative",
    "innovative", "resourceful", "adaptable", "flexible", "versatile",
    "capable", "competent", "skilled", "talented", "expert",
    "proficient", "knowledgeable", "experienced", "accomplished", "qualified",
    "effective", "successful", "high-achieving", "high-performing", "ambitious",
    "goal-oriented", "driven", "motivated", "focused", "determined",
    "resilient", "perseverance", "tenacity", "optimism", "positivity"
]

negative_words = [
    "poor", "bad", "terrible", "awful", "horrible",
    "disappointing", "unsatisfactory", "subpar", "inferior",
    "unacceptable", "inadequate", "lacking", "deficient",
    "faulty", "flawed", "weak", "unreliable", "inconsistent",
    "ineffective", "inefficient", "unproductive", "unsuccessful",
    "underwhelming", "displeasing", "unpleasant", "unfavorable",
    "unfortunate", "miserable", "unhappy", "dissatisfying",
    "unsatisfying", "frustrating", "annoying", "irritating",
    "bothersome", "disturbing", "disheartening", "discouraging",
    "demoralizing", "depressing", "dismal", "gloomy", "bleak",
    "grim", "doom", "hopeless", "desperate", "worrying", "concerning",
    "troubling", "distressing", "alarming", "frightening", "scary",
    "intimidating", "threatening", "daunting", "ominous", "menacing",
    "dangerous", "harmful", "hazardous", "unsafe", "risky", "perilous",
    "precarious", "vulnerable", "unstable", "fragile", "delicate",
    "sensitive", "volatile", "unpredictable", "chaotic", "disorderly",
    "messy", "confusing", "complicated", "difficult", "challenging",
    "complex", "tricky", "hard", "tough", "rough", "rigorous", "demanding",
    "exhausting", "draining", "taxing", "stressful", "hectic", "overwhelming",
    "burdensome", "onerous", "arduous", "grueling", "strenuous", "tiring",
    "fatiguing", "wearisome", "tedious", "boring", "monotonous", "repetitive",
    "dull", "mundane", "uninteresting", "uninspiring", "lifeless", "stale",
    "dreary", "dismaying", "depressing", "dispiriting", "demotivating",
    "demoralizing", "debilitating", "disheartening", "exhausted",
    "drained", "tired", "fatigued", "weary", "worn-out", "exhausting",
    "stressful", "frustrating", "challenging", "difficult", "demanding",
    "unpleasant", "upsetting", "troublesome", "annoying", "irritating",
    "bothersome", "disappointing", "unsatisfying", "underwhelming",
    "unfulfilling", "disheartening", "discouraging", "depressing",
    "daunting", "overwhelming", "daunted", "overwhelmed"
]

stopwords = nltk.corpus.stopwords.words('english')
stopwords = stopwords[:len(positive_words)]

def generate_positive_feedback_row():
    feedback = fake.sentence(nb_words=random.randint(10, 40), ext_word_list=positive_words + stopwords)
    return [feedback, "Positive"]

def generate_negative_feedback_row():
    feedback = fake.sentence(nb_words=random.randint(10, 40), ext_word_list=negative_words + stopwords)
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