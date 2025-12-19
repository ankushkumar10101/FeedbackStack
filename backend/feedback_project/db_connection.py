from pymongo import MongoClient
from django.conf import settings

# Connect to MongoDB
# Ensure MongoDB is running on localhost:27017
client = MongoClient('mongodb://localhost:27017/')
db = client['feedback_db']
feedback_collection = db['feedback']
