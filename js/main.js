//TODO: Initialize Angular Module
const tadooApp = angular.module(`tadooApp`, [
    `ngRoute`,
    `tadooApp.controller`/*,
    `tadooApp.service`
*/]);

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
    otherwise({
        redirectTo: `/categories/`
    });
}]);