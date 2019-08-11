# Foodie
### A mobile web application that searches for nearby restaurants

Mobile web application wherein you can search for nearby restaurants, thanks to [Google Places APi](https://developers.google.com/places/web-service/intro). 
There are a lot of things that improve user's experience: starting from user-friendly, intuitive interface, going through complex filters that makes results much more precise, ending up with cache system that improves performance (decreases loading times and server occupancy). **Below, you can read more about details**.

  
## How does it work?    
    
   
#### Home page:

When user opens app it displays home page, there user can search for nearby restaurants with default filters, or cutozmize options by clicking "Search options", and then search. It looks like this:

<img align="center" width="170" height="auto" src="https://i.imgur.com/JqQEpiY.png">  <img align="center" width="170" height="auto" src="https://i.imgur.com/riMtnB8.png">  <img align="center" width="170" height="auto" src="https://i.imgur.com/Yq2h667.png">  
  
#### Loading screens:

When user submited form, he sees loading animation while application requests server for data.

LOADING SCREEN PHOTOS


#### Restaurants list

After loading necessary data, it displays user list of places that match to his filters.  When user click on some place, he is redirected to restaurants details.

#### Restaurant details

Here, user can read exact information (like location, phone number, website) about restaurant that he clicked. Also gallery with photos related to selected place. 



### Instalation:

Instalation is pretty simple, just follow these steps:

**Frontend**: First of all, make sure you have installed react, and npm. You also have to satisfy dependencies that you can find in [/frontend/package.json](https://github.com/Dolidodzik/foodie/blob/master/frontend/package.json). 

Then, you just need to run those commands:

```  
git clone https://github.com/Dolidodzik/foodie.git
cd foodie
npm install 
npm start  <-- this command will start react app
```

**Backend**: First of all you have to make sure you have installed django, and needed packages:

```  
pip3 install Django
pip3 install djangorestframework
pip3 install django-cors-headers
```

Then go to root directory of this project, configure DATABASES in [settings file](https://github.com/Dolidodzik/foodie/blob/master/find_nearby_restaurants/settings.py). 
Then go to foodie/app/scripts_for_api_control/settings.py and paste [Your own api key there](https://developers.google.com/places/web-service/get-api-key).

Finally - run following commands:

```  
python3 manage.py migrate
python3 manage.py runserver
```  
And that's it! You can see foodie in localhost:3000 in your browser!











