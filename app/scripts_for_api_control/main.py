import app.scripts_for_api_control.settings as settings
from app.scripts_for_api_control.high_level_code import *


#print("API_KEY equals to ",settings.KEY)

data = "nothing"

# location should be taken from Ajax call, but I can use it like this for a dev time
location = {'Latitude': '50.143232', 'Longitude': '22.067609599999997'}

# Searching for places in location, in 99999 meters long radius that is openned now, and contain keyword "pizza" somewhere, with minprice = 2 and maxpirce = 4
places = places_info.get_places_in_circle(location, 99999, open_now=True, keyword="pizza", max_number_of_places_to_return=5, maxprice=4, minprice=2)

places_info.get_place_photo_by_reference("CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU")
