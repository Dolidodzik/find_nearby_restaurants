from django.shortcuts import render
from django.http import HttpResponse

# Importing "header" file  of
import app.scripts_for_api_control.main as SFAC

def test(request):
    return HttpResponse(SFAC.data)
