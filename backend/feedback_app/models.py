from django.db import models

class Feedback(models.Model):
    CATEGORY_CHOICES = [
        ('Website', 'Website'),
        ('Teaching', 'Teaching'),
        ('Service', 'Service'),
        ('Product', 'Product'),
        ('Other', 'Other'),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    rating = models.IntegerField()
    message = models.TextField()
    suggestion = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category} - {self.rating} Stars"
