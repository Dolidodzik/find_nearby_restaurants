import app.scripts_for_api_control.settings as settings
from app.scripts_for_api_control.high_level_code import *


#print("API_KEY equals to ",settings.KEY)

data = "nothing"

# location should be taken from Ajax call, but I can use it like this for a dev time
location = {'Latitude': '50.143232', 'Longitude': '22.067609599999997'}

# Searching for places in location, in 99999 meters long radius that is openned now, and contain keyword "pizza" somewhere, with minprice = 2 and maxpirce = 4
places = places_info.get_places_in_circle(location, 99999, open_now=True, keyword="pizza", max_number_of_places_to_return=5, maxprice=4, minprice=2)

#places_info.get_place_photo_by_reference("CmRaAAAAFLEl3eLW-8zXbrs65OgWEc5Gu-21a_ItTAPqIvfo7ojEYf-5J_V3Q6vPFQk-JjxV3Yx_Rhb2aVD556d7Ej-cLJtFbCdaMnbroZEHqTSaVueyNGfOi56WlFE3rBqJF64EEhCRj2z1Awnm4qgTon2G1vC7GhTo15wSx_gsAJytLKsV231yc7WBGw")
