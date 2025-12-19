from rest_framework import serializers

class FeedbackSerializer(serializers.Serializer):
    category = serializers.ChoiceField(choices=[
        ('Website', 'Website'),
        ('Teaching', 'Teaching'),
        ('Service', 'Service'),
        ('Product', 'Product'),
        ('Other', 'Other'),
    ])
    rating = serializers.IntegerField(min_value=1, max_value=5)
    message = serializers.CharField()
    suggestion = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField(read_only=True)
