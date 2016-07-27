//TODO: Set up Locations Controller
angular.module(`tadooApp.controller`, [])
    
    .controller(`PlacesController`, [function ($scope) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
        });
}]);
//TODO: Set up controller to find User Location