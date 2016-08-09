
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
                locate.map = new google.maps.Map($('#mapContainer'), {
                    center: locate.userLocation,
                    zoom: 14,
                });

                return (locate.userLocation);
            });
        };
    }])


    //service to find places
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
                                //TODO: implement open now status to show under info
                                //openNow: place.opening_hours.open_now,
                                address: place.vicinity,
                                categories: place.types
                            };

                            if (place.rating == undefined){
                                genInfo.googleRating = `N/A`;
                            }

                            //TODO: adjust filter logic to improve places found
                            if (place.rating >= 3.8 | place.types.includes(`gas_station`)) {

                                places.found.push(genInfo);
                                j++;

                            }

                        }

                        //test out places
                        resolve(places.found);
                        reject($location.hash(`#/categories/`));
                    }
                    //TODO: Handle Error
                    else {
                        console.log(status);
                    }
                });


                //TODO: find details on specified place
/*
                places.findDetails = function (id) {
                    $http.get({
                        method: 'GET',
                        url: 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+id+'&extensions=review_summary&key=AIzaSyCr4811V1lwPq2VvTTUPhIyawTwUy6wbCo'
                    })
                    .success(function callbackSuccess (data) {
                        console.log(data);
                    });

                }
 */
            });
        };
    });