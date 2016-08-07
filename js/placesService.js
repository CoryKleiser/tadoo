
angular.module(`tadooApp.service`, [])


//This service locates the user
    .service(`locate`, [function(){
        const locate = this;
        locate.map;
        locate.userLocation;

        locate.findUser = function(){
            return new Promise(function (resolve, reject) {


                navigator.geolocation.getCurrentPosition(function (position) {
                    locate.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
                    console.log(locate.userLocation);
                locate.map = new google.maps.Map($(`#mapContainer`), {
                    center: locate.userLocation,
                    zoom: 14,
                });

                return (locate.userLocation);
            });
        };
    }])


    //This service finds the places
    .service(`places`, function($http, $location, locate) {

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
                        //value to set spot in array
                        var j = 0;
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];

                            //set results
                            const genInfo = {
                                index: j,
                                id: place.place_id,
                                name: place.name,
                                googleRating: place.rating,
                                photo: place.icon,
                                //openNow: place.opening_hours.open_now,
                                address: place.vicinity,
                                //photoLink: place.photos[0].html_attributions[0],
                                categories: place.types
                            };

                            //TODO: filter results here
                            if (place.rating >= 3.8 | place.types.includes(`gas_station`) | place.types.includes(`convenience_store`)) {



                                //TODO:: take the previous if statement out and filter results to improve places found
                                // if(genInfo.categories.includes(`restaurant`)&&genInfo.googleRating<3.8){
                                //     continue;
                                // }
                                places.found.push(genInfo);
                                j++;

                                //:TODO work on making photos functional
                                // if(place.photos[0]){
                                //     genInfo.photo = place.photos[0];
                                // }
                            }
                        }

                        //test out places
                        console.log(places);
                        resolve(places.found);
                        reject($location.hash(`#/categories/`));
                    }
                    //TODO: Handle Error
                    else {
                        console.log(status);
                    }
                });

                places.findDetails = function (id) {
                    const requestUrl = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+
                        id+"&extensions=review_summary&key=AIzaSyCr4811V1lwPq2VvTTUPhIyawTwUy6wbCo&libraries=places"
                    $http.get({
                        method: 'GET',
                        url: requestUrl
                    })
                    .success(function callbackSuccess (data) {
                        console.log(data);
                    });
                }
            });
        };
    });