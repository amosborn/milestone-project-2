var map, places;
var markers = [];
var autocomplete;
var countryRestrict = {'country': 'za'};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {
            lat: -28.7282,
            lng: 24.7499
        }
    });

autocomplete = new google.maps.places.Autocomplete((
    document.getElementById('autocomplete')), {
        types: ['(cities)'],
        componentRestrictions: countryRestrict
    });

    places = new google.maps.places.PlacesService(map);

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(14);
    } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
    }
}

