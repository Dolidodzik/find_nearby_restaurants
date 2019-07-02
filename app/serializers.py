from rest_framework import serializers

# Serializer that contains all places list data (full googleapi response)

class places_list_serializer(serializers.Serializer):
   # Full request got from google api
   json_data = serializers.JSONField()

class places_details(serializers.Serializer):
   # Full request got from google api
   json_data = serializers.JSONField()
