import requests
import app.scripts_for_api_control.settings as settings

print("API_KEY equals to ",settings.API_KEY)
data = "JD"

data = requests.get("http://google.com")
