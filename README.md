# Search4Weather

Web application for users to create and edit exercise routines and sessions.

Technology stack used:

* Front-End: React.js/JavaScript, CSS, HTML

* Back-End: Express/Node.js

* Weather REST API: OpenWeather

* Geocoding REST API: positionstack

* PaaS Provider: Heroku

## Back-End - server.js

### Back-End packages:
* CORS
* Dotenv
* Express

### Routes

#### weatherRouter.js
Back-end routes used for finding the weather of a city.

| Route | HTTP Method | Inputs | Use |
| - | - | - | - |
| /getLocationWeather | post | location |  Use positionstack to find city coordinates, then use these coordinates with OpenWeather to determine the weather. |
| /getWeather | get | N/A | Used for testing the OpenWeather API |
| /getLocation | get | location | Used for testing the positionstack API |  

## Front-End - weather-client

### Front-End packages:
* Axios

* Bootstrap/React-Bootstrap

* React, React-DOM, React-Router-DOM

### Components:
Type of Component: Functional or Classful.

Purpose: Use within the app.

| Component | Component Type | Purpose |
| - | - | - |
| Main.js | Functional | Application for a user to find the weather of a city. |
| Footer.js | Functional |  Creator information. |

