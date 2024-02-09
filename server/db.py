from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
from bson.json_util import dumps

load_dotenv()

def get_connection_string():
    return os.getenv("DB_URI")

def get_users():
    print("Getting users collection")
    users = db["Users"].find()

    json_data = dumps(users)
    return json_data

def get_user(user_id):
    print(f'Finding user with id: {user_id}')
    user = db["Users"].find_one({'p_id': user_id})

    json_data = dumps(user)
    return json_data

def get_chats(user_id):
    print(f'Getting chats from user_id: {user_id}')
    chats = db["Chat"].find({'sender_ID': user_id})

    json_data = dumps(chats)
    return json_data

def post_message(message):
    chats = db["Chat"]
    chats.insert_one(message)
    print("Sucessfully inserted message into database")

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