# Its the "header" file in those scripts

import requests
import json
from collections import namedtuple

import app.scripts_for_api_control.settings as settings
import app.scripts_for_api_control.code as code

print("API_KEY equals to ",settings.KEY)

data = "nothing"


url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=id,photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBr2_qvl5DWf5gGNnAsv4LHFmlpDgUpqK4"
data = code.get_data_from_url(url)
