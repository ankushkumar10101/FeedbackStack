from rest_framework import views, permissions, status
from rest_framework.response import Response
from .serializers import FeedbackSerializer
from feedback_project.db_connection import db
from datetime import datetime
from django.http import HttpResponse
import csv

CATEGORIES = ['Website', 'Teaching', 'Service', 'Product', 'Other']

def get_collection_name(category):
    return f"feedback_{category.lower()}"

class FeedbackCreateView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            data['created_at'] = datetime.now()
            
            # Determine specific collection
            category = data['category']
            collection = db[get_collection_name(category)]
            
            insert_data = data.copy()
            collection.insert_one(insert_data)
            return Response({'message': 'Feedback submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AnalyticsView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        total_feedback = 0
        total_rating_sum = 0
        category_breakdown = []
        rating_counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}

        for category in CATEGORIES:
            col = db[get_collection_name(category)]
            
            # Fetch all documents to process details
            docs = list(col.find())
            count = len(docs)
            total_feedback += count
            
            # Calculate stats for this category
            cat_rating_sum = 0
            cat_comments = []
            cat_suggestions = []
            
            for doc in docs:
                rating = doc.get('rating', 0)
                cat_rating_sum += rating
                
                # Collect comments/suggestions
                if doc.get('message'):
                    cat_comments.append(doc.get('message'))
                if doc.get('suggestion'):
                    cat_suggestions.append(doc.get('suggestion'))

            cat_avg = (cat_rating_sum / count) if count > 0 else 0
            
            category_breakdown.append({
                'category': category,
                'feedback_count': count,
                'average_rating': round(cat_avg, 2),
                'comments': cat_comments,
                'suggestions': cat_suggestions
            })
            
            total_rating_sum += cat_rating_sum

        average_rating = (total_rating_sum / total_feedback) if total_feedback > 0 else 0

        data = {
            'total_feedback': total_feedback,
            'average_rating': round(average_rating, 2),
            'category_breakdown': category_breakdown
        }
        return Response(data)


