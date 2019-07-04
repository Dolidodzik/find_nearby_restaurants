from django.db import models

from django.core.files import File
import os
from urllib.request import urlopen
from tempfile import NamedTemporaryFile
import urllib

import app.scripts_for_api_control.settings as settings


'''class Cached_Image(models.Model):
    reference = models.CharField(max_length=255, default=None, primary_key=True)

    # Saved image file got from google api
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
