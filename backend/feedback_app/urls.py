from django.urls import path
from .views import FeedbackCreateView, AnalyticsView

urlpatterns = [
    path('feedback/', FeedbackCreateView.as_view(), name='submit-feedback'),
    path('analytics/', AnalyticsView.as_view(), name='analytics'),

]
