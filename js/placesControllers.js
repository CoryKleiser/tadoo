//TODO: Set up Locations Controller
angular.module(`tadooApp.controller`, [])
    
    .controller(`CatController`, function (locate) {
        const CatController = this;
        let request;
        let userLocation;

        //Set Up Google Map and Location

        locate.findUser();

    })
    .controller(`ListController`, function ($scope, $routeParams, locate, places) {

        let request = {
            location: locate.userLocation,
            radius: `3000`,
            types: [`restaurant`]
        };

        $scope.locations = places.findPlaces(request);
        console.log($scope.locations);
        console.log(locate.userLocation);
        let itemId = $routeParams.itemId;
        if (itemId == 0){
            $scope.category = 'restaurant';
            $scope.catHeader = `TaEat`;
        }
        else if (itemId == 1){
            $scope.category = `adventure`;
            $scope.catHeader = `TaGo`;
        }
        else if (itemId == 2){
            $scope.category = `store`;
            $scope.catHeader = `TaShop`;
        }
        else if (itemId == 3){
            $scope.category = `parks`;
            $scope.catHeader = `TaPlay`;
        }
        else if (itemId == 4){
            $scope.category = `chill`;
            $scope.catHeader = `TaChill`;
        }



        console.log($scope.category);
    });
