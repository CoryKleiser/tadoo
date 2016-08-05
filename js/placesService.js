
angular.module(`tadooApp.service`, [])


//This is the service that locates the user
//                  if you see 'locate.' I'm getting the function/variable from here
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
            return (locate.userLocation);
        };
    }])


    //This is my service that finds the places for me.. It works the same as the above service just with different var/fn.
    //              If it starts with 'places.' it's being pulled from here
    .service(`places`, function(locate) {

        const places = this;

        // function to find places
        places.findPlaces = function(request){
            return new Promise(function(resolve, reject) {

                const service = new google.maps.places.PlacesService(locate.map);

                //instantiates found array
                places.found = [];

                //performs search and filters content in for loop
                service.nearbySearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {

                        console.log(results);

                        //TODO: cycle through place results and filter needed information
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            //TODO: filter results here
                            if (place.rating === undefined | place.rating < 3.8){
                                continue;
                            }
                            genInfo = {
                                index: i,
                                id: place.place_id,
                                name: place.name,
                                googleRating: place.rating,
                                // openNow: place.opening_hours.open_now,
                                address: place.vicinity,
                                //photoLink: place.photos[0].html_attributions[0],
                                categories: place.types
                            };

                            places.found.push(genInfo);
                            // If the request succeeds, draw the place location on
                            // the map as a marker, and register an event to handle a
                            // click on the marker.
                        }
                        console.log(places);
                        resolve(places.found);
                    }
                    //TODO: Handle Error
                    else {
                        console.log(status);
                    }
                });
            });
        };
    });