//TODO: Set up Locations Controller
angular.module(`tadooApp.controller`, [])
    
    .controller(`CatController`, [`$scope`, function ($scope) {
        let request;
        let userLocation;

        //Set Up Google Map and Location

        let places = [];



        navigator.geolocation.getCurrentPosition(function (position) {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            request = {
                location: userLocation,
                radius: `3000`,
                types: [`restaurant`]
            };


            const map = new google.maps.Map($(`#mapContainer`), {
                center: userLocation,
                zoom: 14,
            });

            const service = new google.maps.places.PlacesService(map);

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

                        places.push(genInfo);
                        // If the request succeeds, draw the place location on
                        // the map as a marker, and register an event to handle a
                        // click on the marker.
                    }
                    console.log(places);
                }
                else {
                    console.log(status);
                }
            });
        });
        console.log(places, `test`);
    }])
    .controller(`ListController`, [`$scope`, `$routeParams`, function ($scope, $routeParams) {
        console.log($scope.places, `test2`);
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
    }]);
//TODO: Set up controller to find User Location