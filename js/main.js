//TODO: Initialize Angular Module
const tadooApp = angular.module(`tadooApp`, [
    `ngRoute`
    `tadooApp.controller`
]);

tadooApp.config([`$routeProvider`, function ($routeProvider) {
    $routeProvider.
    when(`/categories`), {
            templateUrl: `partials/list.html`,
            controller: `PlacesController`
    }
    otherwise(`/categories`)
}]);