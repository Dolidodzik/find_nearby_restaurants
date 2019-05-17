# This file contain code, fucntions, classes that can be called in "main.py" from here only.
# This file contains "high level" code, and use another python files that contain "low level code"

import requests
import app.scripts_for_api_control.settings as settings
import json
from collections import namedtuple

# This function returns response JSON data represented as python object
def get_data_from_url(url):

    print("requesting url", url)

    # Full, pure, response
    response = requests.get(url)

    # Getting request json
    data = response.json()

    # converting dict to string
    data = json.dumps(data)

    # converting JSON to python object
    data = json.loads(data, object_hook=lambda d: namedtuple('X', d.keys())(*d.values()))

    return data
