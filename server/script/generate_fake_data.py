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

# people_data_list = []
# for _ in range(1000):  
#     person_data = {
#         'f_name': fake.first_name(),
#         'l_name': fake.last_name(),
#         'p_id': generate_unique_id(),
#         'email': fake.email(),
#         'password': fake.password(),
#     }
#     people_data_list.append(person_data)

# with open('People.json', 'w') as json_file:
#     json.dump(people_data_list,json_file)

# print("completed")

with open('People.json', 'r') as json_file:
    people_data_list = json.load(json_file)

# Calculate the number of people for the manager role (10%)
num_managers = int(0.1 * len(people_data_list))
random.shuffle(people_data_list)

# Split the people data into managers and non-managers
managers_data = people_data_list[:num_managers]
employees_data = people_data_list[num_managers:]

roles_data_list = []

# Assign people to the manager role
for manager_data in managers_data:
    role_data = {
        'r_id': generate_unique_id(),
        'r_name': 'Manager',
        'user_mngr_assigned_to_role': manager_data['p_id'],
        'users_reporting_mngr': [],
    }
    roles_data_list.append(role_data)

# Randomly distribute employees to each manager
for manager_data in managers_data:
    manager_id = manager_data['p_id']
    manager_role = next(role for role in roles_data_list if role['user_mngr_assigned_to_role'] == manager_id)

    # Calculate the number of employees to be assigned to this manager
    num_employees_for_manager = int(0.9 * len(employees_data) / num_managers)

    # Assign employees to the manager's list of reporting users
    manager_role['users_reporting_mngr'] = [employee_data['p_id'] for employee_data in employees_data[:num_employees_for_manager]]
    employees_data = employees_data[num_employees_for_manager:]


# Write Role data to a JSON file
with open('Roles.json', 'w') as json_file:
    json.dump(roles_data_list, json_file)

print("Role data written to 'roles_data.json' successfully.")

