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

        console.log(locate.userLocation);


        let itemId = $routeParams.itemId;
        if (itemId == 0){
            $scope.category = [`restaurant`];
            $scope.catHeader = `TaEat`;
        }
        else if (itemId == 1){
            $scope.category = [`amusement_park`,
                `aquarium`,
                `campground`,
                `park`];
            $scope.catHeader = `TaGo`;
        }
        else if (itemId == 2){
            $scope.category = [`mall`];
            $scope.catHeader = `TaShop`;
        }
        else if (itemId == 3){
            $scope.category = [`parks`];
            $scope.catHeader = `TaExplore`;
        }
        else if (itemId == 4){
            $scope.category = [`chill`];
            $scope.catHeader = `TaChill`;
        }

        let request = {
            location: locate.userLocation,
            radius: `3000`,
            types: $scope.category
        };

        $scope.locations = places.findPlaces(request);

        console.log($scope.locations);


        console.log($scope.category);
    });
