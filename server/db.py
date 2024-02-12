from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
from bson.json_util import dumps

load_dotenv()

def get_users():
    print("Getting users collection")
    users = DB_USERS.find()

    json_data = dumps(users)
    return json_data



def get_user(user_id):
    print(f'Finding user with id: {user_id}')
    
    # Find user data
    user = db["Users"].find_one({'p_id': user_id})
    
    if user:
        # Find manager data
        user_role = DB_ROLES.find_one({"user_mngr_assigned_to_role":user_id})
        if(user_role):
            
            user['role'] = "Manager"
            user['employees'] =user_role['users_reporting_mngr']
        else:
            user['role'] = "Employee"
        user_manager_data = db["Roles"].find_one({
            "users_reporting_mngr": user_id
        })

        if user_manager_data:
            user['manager_info'] = user_manager_data
        else:
            user['manager_info'] = None

        # Convert user dictionary to JSON
        json_data = dumps(user)
        return json_data
    else:
        return "User not found"
   

    

def get_chats(user_id):
    print(f'Getting chats from user_id: {user_id}')
    chats = DB_CHATS.find({
    '$or': [
        {'sender_ID': user_id},
        {'recipient_ID': user_id}
    ]
})


    json_data = dumps(chats)
    return json_data

def post_message(message):
    DB_CHATS.insert_one(message)
    print("Sucessfully inserted message into database")

def attempt_login(email, password):
    user = DB_USERS.find_one({'email': email})

    if user and user["password"] == password:
        return user["p_id"]
    else:
        return ""

def get_connection_string():
    return os.getenv("DB_URI")

def connect_to_db():
    print("Starting to connect to DB table FeedBack")

    uri = get_connection_string()
    print(f'Connection String: {uri}')

    client = MongoClient(uri, server_api=ServerApi('1'))
    print("Connected to client")

    try:
        client.admin.command('ping')
        print("Succesfully pinged client")
    except Exception as e:
        print(e)

    db = client["FeedBack"]
    print(f'All collections in Database: {db.list_collection_names()}')
    return db

db = connect_to_db()
DB_CHATS = db["Chat"]
DB_USERS = db["Users"]
DB_ROLES = db["Roles"]