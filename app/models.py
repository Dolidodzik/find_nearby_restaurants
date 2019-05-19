from django.db import models

from django.core.files import File
import os
from urllib.request import urlopen
from tempfile import NamedTemporaryFile


class Cached_Image(models.Model):
    image_url = models.CharField(max_length=600, default="defualt image_url for test")
    image_file = models.ImageField(upload_to='cached_images', default="defaults/default.png")

    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.image_url
