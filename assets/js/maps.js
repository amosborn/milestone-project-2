var map, places;
var markers = [];
var autocomplete;
var countryRestrict = {'country': 'za'};
var infoWindow;     

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {
            lat: -28.7282,
            lng: 24.7499
        },
    });

    autocomplete = new google.maps.places.Autocomplete((
        document.getElementById('autocomplete')), {
            types: ['(cities)'],
            componentRestrictions: countryRestrict
    });

    autocomplete.addListener('place_changed', onPlaceChanged);

    places = new google.maps.places.PlacesService(map);

    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('iw-content')
    });
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
                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    label: labels[i % labels.length]
                });
            markers[i].placeResult = results[i];
            google.maps.event.addListener(markers[i], 'click', showInfoWindow);
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

function showInfoWindow() {
    var marker = this;
    places.getDetails({placeId: marker.placeResult.place_id},
    function(place, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
              }
              infoWindow.open(map, marker);
              createInfoWindow(place);
    });
}

function createInfoWindow(place) {
    document.getElementById('iw-icon').innerHTML = '<img ' + 'src="' + place.icon + '"/>';
    document.getElementById('iw-name').innerHTML = place.name;
    document.getElementById('iw-address').innerHTML = place.vicinity;
    
    document.getElementById('iw-phone').innerHTML = place.formatted_phone_number;    
    
    if (place.rating) {
        var ratingHtml = '';
        for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
                ratingHtml += '&#10025;';
            } else {
                ratingHtml += '&#10029;';
            }
            document.getElementById('iw-rating-row').style.display = '';
            document.getElementById('iw-rating').innerHTML = ratingHtml;
        }
        } else {
            document.getElementById('iw-rating-row').style.display = 'none';
        }

       if (place.website == null) {
            document.getElementById('iw-website').innerHTML = ' '
        } else {
            document.getElementById('iw-website').innerHTML = '<a target="_blank" href="' + place.website +'">' + place.website + '</a>';
        } 
}