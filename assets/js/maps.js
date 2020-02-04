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
       
    autocomplete.addListener('place_changed', onPlaceChanged);

    places = new google.maps.places.PlacesService(map);
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(14);
        search();
    } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
    }
}

function search() {
    var searchType = $('input[name=searchType]:checked').val();
    var search = {
        bounds: map.getBounds(),
        types: [searchType]
    };

    places.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers();
            for (var i = 0; i < results.length; i++) {
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location
                });
            setTimeout(addMarker(i), i * 100);
            }
        }
    });
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}

function addMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}

 