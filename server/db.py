from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

def getConnectionString():
    return os.getenv("DB_URI")

def connectToDB():
    print("Starting to connect to DB table FeedBack")

    uri = getConnectionString()
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

if __name__ == "__main__":
    connectToDB()