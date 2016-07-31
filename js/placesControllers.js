//TODO: Set up Locations Controller
angular.module(`tadooApp.controller`, [])


// This is my Category Controller (controls the category.html/the initial state)
    .controller(`CatController`, function ($scope, $location, locate) {

        //reference function for ngClick (goes to list.html)
        $scope.goList = function(hash){
            $location.path(hash);
        }

        //Set Up Google Map and Location
        //Calls findUser fn from the locate Service
        locate.findUser();

    })

// My List Controller THIS IS WHERE SOMETHING GOES WRONG (or in list.html)
    .controller(`ListController`, function ($scope, $routeParams, locate, places) {

        console.log(locate.userLocation);

        //instantiate locations var
        $scope.locations = [];
        console.log($scope.locations);

        //finds itemId
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
