//TODO: Set up Locations Controller
angular.module(`tadooApp.controller`, [])
    
    .controller(`CatController`, [`$scope`, function ($scope) {
        //category controller
}])
    .controller(`ListController`, [`$scope`, `$routeParams`, function ($scope, $routeParams) {
        $scope.itemId = $routeParams.itemId;
        if ($scope.itemId == 0){
            $scope.category = 'restaurant';
            $scope.catHeader = `TaEat`;
        }
        else if ($scope.itemId == 1){
            $scope.category = `adventure`;
            $scope.catHeader = `TaGo`;
        }
        else if ($scope.itemId == 2){
            $scope.category = `store`;
            $scope.catHeader = `TaShop`;
        }
        else if ($scope.itemId == 3){
            $scope.category = `parks`;
            $scope.catHeader = `TaPlay`;
        }
        else if ($scope.itemId == 4){
            $scope.category = `chill`;
            $scope.catHeader = `TaChill`;
        }
        console.log($scope.category);
        let request;
        //Set Up Google Map and Location


            const callback = function(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {

                    //TODO: cycle through place results and filter needed information
                    const places = [];
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

                        places.push(genInfo);
                        // If the request succeeds, draw the place location on
                        // the map as a marker, and register an event to handle a
                        // click on the marker.
                    }

                    console.log(places);
                    return places;

                }
                else {
                    console.log(status);
                }
            };

            navigator.geolocation.getCurrentPosition(function (position) {
                let LatLng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                request = {
                    location: LatLng,
                    radius: 25600,
                    types: [$scope.category]
                };


                const map = new google.maps.Map($(`#mapContainer`), {
                    center: LatLng,
                    zoom: 14,
                });

                const service = new google.maps.places.PlacesService(map);

                $scope.places = service.nearbySearch(request, callback);
            });
        }]);
//TODO: Set up controller to find User Location