import os
from pymongo import MongoClient
from django.conf import settings

# Connect to MongoDB
# Uses MONGO_URI from environment variables, defaults to localhost for development
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
db = client['feedback_db']
feedback_collection = db['feedback']
