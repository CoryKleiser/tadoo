//TODO: Set up Locations Controller
angular.module(`tadooApp.controller`, [])


// This is my Category Controller (controls the category.html/the initial state)
    .controller(`CatController`, function ($scope, $location, locate) {

        //Set Up Google Map and Location
        //Calls findUser fn from the locate Service
        $scope.goList = function(hash){
            if (locate.userLocation != undefined){

                $location.path(hash);

            }
            else{
                alert(`Please wait while we locate you.`);
            }

        }
        locate
            .findUser()
            .then($scope.userLocation = locate.findUser);


    })

// My List Controller THIS IS WHERE SOMETHING GOES WRONG (or in list.html)
    .controller(`ListController`, function ($scope, $routeParams, $location, locate, places) {

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
            $scope.category = [`convenience_store`,
                `gas_station`];
            $scope.catHeader = `TaFuel`;
        }
        else if (itemId == 4){
            $scope.category = [`art_gallery`,
                `cafe`,
                `night_club`];
            $scope.catHeader = `TaChill`;
        }
        else if (itemId == 5){
            $scope.category = [`park`];
            $scope.catHeader = `TaPlay`;
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


    })

    .controller(`InfoController`, function($scope, $routeParams, places){

        $scope.goBack = function(){
            window.history.back();
        };


        //find selected Place
        let whichPlace = $routeParams.itemId;
        console.log(whichPlace);

        //pull place data from Places Service
        $scope.placeInfo = places.found[whichPlace];
        console.log($scope.placeInfo);

        // $scope.specDetails = places.findDetails($scope.placeInfo.id);
        // console.log($scope.specDetails);


        //declare properties used in scope
        // $scope.placeName = data[itemId].name;
        // $scope.googleRating = data[itemId].googleRating;
        // $scope.placeAddress = data[itemId].address;
        // $scope.placePhotoLink = data[itemId].photoLink;

    });
