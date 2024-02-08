import faker
import random
import uuid
import json


fake = faker.Faker()

# Function to generate a unique ID
def generate_unique_id():
    return str(uuid.uuid4())

# Function to generate random date and time
def generate_random_timestamp():
    return fake.date_time_this_decade()

people_data_list = []
for _ in range(1000):  
    person_data = {
        'f_name': fake.first_name(),
        'l_name': fake.last_name(),
        'p_id': generate_unique_id(),
        'email': fake.email(),
        'password': fake.password(),
    }
    people_data_list.append(person_data)

with open('People.json', 'w') as json_file:
    json.dump(people_data_list,json_file)

print("completed")