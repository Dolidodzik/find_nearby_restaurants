from django.db import models

from django.core.files import File
import os
from urllib.request import urlopen
from tempfile import NamedTemporaryFile
import urllib

import app.scripts_for_api_control.settings as settings

# dont do that, I will use django cache framework
'''class Cached_Details(models.Model):
    # Place id (this from google api)
    place_id = models.CharField(max_length=255, default=None, primary_key=True)

class Cached_Image(models.Model):
    # Image reference (from google api)
    reference = models.CharField(max_length=255, default=None, primary_key=True)

    # Parent gallery of this image
    gallery = models.ForeignKey(Cached_Details, default=None, on_delete=models.CASCADE)

    image_file = models.ImageField(upload_to='cached_images', default="defaults/default.png")

    def save_image(self):
        print("REQUESTING IMAGE")
        # Creating URL to request
        URL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=" + settings.KEY
        URL += "&photoreference=" + self.reference
        result = urllib.request.urlretrieve(URL)
        img_temp = NamedTemporaryFile(delete = True)
        img_temp.write(urlopen(URL).read())
        img_temp.flush()

        self.image_file.save("CACHED_IMAGE", File(img_temp))

    def __str__(self):
        return self.reference'''
