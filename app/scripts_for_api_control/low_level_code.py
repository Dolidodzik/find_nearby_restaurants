# This file contains "low_level_code". Code from here is used in "high_level_code.py" to make things easier

import requests
import json
from collections import namedtuple
import urllib.request

import app.scripts_for_api_control.settings as settings

from django.core import files
from io import BytesIO
import requests
from app.models import *
from django.core.files import File
import os
from urllib.request import urlopen
from tempfile import NamedTemporaryFile
import urllib


# This function returns response JSON data represented as python object
# If JSON is true, JSON data will be returned instead of JSON converted to dict
def get_data_from_URL(URL, JSON=False):

    #print("requesting URL", URL)
    # Full, pure, response
    response = requests.get(URL)

    if JSON == False:
        # Getting request json
        data = json.loads(response.text)
    else:
        data = response.text

    return data

# This function saves image from given photo_reference to Cached_Image  (without any validation)
# and returns url of this image
def get_image_from_URL_and_save_to_DB(photo_reference):

    to_save_image_instance = Cached_Image(reference=photo_reference)
    to_save_image_instance.save_image()

    return 0
