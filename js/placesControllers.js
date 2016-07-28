//TODO: Set up Locations Controller
angular.module(`tadooApp.controller`, [])
    
    .controller(`CatController`, [`$scope`, function ($scope) {
        //category controller
}])
    .controller(`ListController`, [`$scope`, `$routeParams`, function ($scope, $routeParams) {
        $scope.itemId = $routeParams.itemId;
        $scope.list = {};
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

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            let LatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(LatLng);
            request = {
                location: LatLng,
                radius: 500,
                types: [$scope.category]
            };

            const callback = function(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    console.log(results);
                }
                else {
                    console.log(status);
                }
            };

            const service = new google.maps.places.PlacesService;
            service.nearbySearch(request, callback);
            console.log(request);

        });

    }]);
//TODO: Set up controller to find User Location