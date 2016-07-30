//TODO: Initialize Angular Module
const tadooApp = angular.module(`tadooApp`, [
    `ngRoute`,
    `tadooApp.service`,
    `tadooApp.controller`
]);

tadooApp.config([`$routeProvider`, function ($routeProvider) {
    $routeProvider.
    when(`/categories/`, {
            templateUrl: `partials/categories.html`,
            controller: `CatController`
    }).
    when(`/list/:itemId`, {
        templateUrl: `partials/list.html`,
        controller: `ListController`
    }).
    when(`/info/`, {
        templateUrl: `partials/info.html`,
        controller: `ListController`,
    }).
    when(`/map/`, {
        templateUrl: `partials/map.html`,
        controller: `ListController`
    }).
    otherwise({
        redirectTo: `/categories/`
    });
}]);