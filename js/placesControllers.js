//TODO: Set up Locations Controller
angular.module(`tadooApp.controller`, [])


// This is my Category Controller (controls the category.html/the initial state)
    .controller(`CatController`, function ($scope, $location, locate) {

        //Set Up Google Map and Location
        //Calls findUser fn from the locate Service
        locate.findUser();

        //reference function for ngClick (goes to list.html)
        $scope.goList = function(hash){
            $location.path(hash);
        }

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
            $scope.category = [`shopping_mall`,
                `clothing_store`,
                `department_store`,
                `shoe_store`];
            $scope.catHeader = `TaShop`;
        }
        else if (itemId == 3){
            $scope.category = [`park`,
                ``];
            $scope.catHeader = `TaPlay`;
        }
        else if (itemId == 4){
            $scope.category = [`art_gallery`,
                `cafe`,
                `night_club`];
            $scope.catHeader = `TaChill`;
        }

        let request = {
            location: locate.userLocation,
            radius: `8000`,
            types: $scope.category
        };


        places
            .findPlaces(request)
            .then(function(locations) {
                $scope.locations = locations;
                $scope.$apply();
            })
            .catch(function(err) {
                console.log(err);
            });


        console.log($scope.locations);


        console.log($scope.category);
    });
