
angular.module(`tadooApp.service`, [])

    .service(`locate`, [function(){
        const locate = this;
        locate.map;
        locate.userLocation;

        locate.findUser = function(){
            navigator.geolocation.getCurrentPosition(function (position) {
                locate.userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log(locate.userLocation);
                locate.map = new google.maps.Map($(`#mapContainer`), {
                    center: locate.userLocation,
                    zoom: 14,
                });
            });
            console.log(locate.userLocation);
            return locate.userLocation;
        };
    }])

    .service(`places`, function(locate) {

        const places = this;
        places.found = [];


        places.findPlaces = function(request){

            const service = new google.maps.places.PlacesService(locate.map);

            service.nearbySearch(request, function(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {

                    //TODO: cycle through place results and filter needed information
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        //TODO: filter results here
                        if (place.rating === undefined){
                            continue;
                        }
                        genInfo = {
                            restaurantName: place.name,
                            googleRating: place.rating
                        };

                        places.found.push(genInfo);
                        // If the request succeeds, draw the place location on
                        // the map as a marker, and register an event to handle a
                        // click on the marker.
                    }
                }
                else {
                    console.log(status);
                }
            });
            return places.found;
        };

    });