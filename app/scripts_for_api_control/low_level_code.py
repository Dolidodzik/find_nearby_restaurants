# This file contains "low_level_code". Code from here is used in "high_level_code.py" to make things easier

import requests
import json
from collections import namedtuple

import app.scripts_for_api_control.settings as settings

# This function returns response JSON data represented as python object
def get_data_from_URL(URL):

    print("requesting URL", URL)
    # Full, pure, response
    response = requests.get(URL)

    # Getting request json
    data = response.json()

    # converting dict to string
    data = json.dumps(data)

    # converting JSON to python object
    data = json.loads(data, object_hook=lambda d: namedtuple('X', d.keys())(*d.values()))

    return data
