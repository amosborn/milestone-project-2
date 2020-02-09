# Discover! South Africa
Code Institute Interactive Frontend Development Milestone Project

This project provides a web page that uses Google Maps API and Google Places to allow the user to plan their holiday to South Africa by searching the map for accommodation, restaurants and tourist attractions.

## UX
The goal of this project is to create a website to make it easy for holiday makers planning a trip to South Arica to search a map of the country to find accommodation, restaurants and tourist attractions to visit on their holiday. They can select cities to search to find out what is on offer.

A user of this website would want help planning their holiday to South Africa. They are given the option to select either accommodation, restaurants or tourist attractions and then choose a city with the help of the autocomplete form. The results are presented as markers on the map and they can click on each one for more details. If a website is available, there is a link in the window. Links in the footer provided more inspiration.

## Features
This site uses Google Maps Javascript API to provide an interactive map and Google Places to search for results in the selected cities.

### Features left to Implement
I would like to add a list display of the results, possibly on bootstrap cards, to display on larger screens.

## Technologies Used
1. HTML
2. CSS
3. Bootstrap (4.4.1)
4. JQuery (3.4.1)
5. Google Maps Javascript API & Google Places

## Testing
I have tested this site as a potential user. Default radio button is checked city can't be search without a button being selected first. Autocomplete gives the user city options. The infowindow has been tested and if no website is available no link will be offered. Footer links have been tested to open to correct page and open a new page with target="_blank".
I found the map zoom I had originally chosen for the cities only displayed city center areas, which are often not the tourist areas, so I set the zoom further out.

## Credits
### Content
The content of the website was written by me.

### Media
The background photo used is from pixabay.com, a copyright free image library.

### Acknowledgements
This project relies on the Google Maps API and Google Places, so I have usesd their documentation and tutorials as inspiration.
The code for the rating stars in the infowindow comes from https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch