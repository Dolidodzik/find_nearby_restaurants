# Its the "header" file in those scripts


import requests
import app.scripts_for_api_control.settings as settings
import json
import sys
from collections import namedtuple
import ast


print("API_KEY equals to ",settings.KEY)

data = "nothing"

url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=id,photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBr2_qvl5DWf5gGNnAsv4LHFmlpDgUpqK4"

print("requesting url", url)

# Full, pure, response
response = requests.get(url)

# Getting request data/content represented in byte array
data = response.json()

data = json.dumps(data)

data = json.loads(data, object_hook=lambda d: namedtuple('X', d.keys())(*d.values()))
