from rest_framework import serializers

# Serializer that contains all places list data (full googleapi response)
class places_list_serializer(serializers.Serializer):
   json_data = serializers.JSONField()
