# This file contain code, fucntions, classes that can be called in "main.py" from here only.
# This file contains "high level" code, and use another python files that contain "low level code"

import requests
import json
from collections import namedtuple

import app.scripts_for_api_control.settings as settings
import app.scripts_for_api_control.low_level_code as low_level_code

# This function return places in radius from location
# radius is just intiger (1 = 1 meter),
# location should be formated like this:   location = {'Latitude': '50.140408099999995', 'Longitude': '22.0593805'}
# if open_now == True function will return only places openned now. If open_now == false or None it won't change anythnig
def get_places_in_circle(location, radius, open_now=None):

    # Setting up url
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ location['Latitude'] +","+ location['Longitude'] +"&radius="+ str(radius) +"&type=restaurant&key=" + settings.KEY

    if open_now == True:
        url += "&opennow="+str(open_now)

    # Returning response got from this url
    return low_level_code.get_data_from_url(url)
