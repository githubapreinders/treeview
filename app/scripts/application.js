(function()
{
    var app = angular.module('confab',['ngAnimate','ui.router','ui.tree']);


app.config(function ($stateProvider, $urlRouterProvider)
{
    console.log('Application config...')
    $stateProvider

    // route for the home page
        .state('app', {
            url: '/',
            views: {
                'content': {
                    templateUrl: 'views/home.html',
                    controller: 'IndexController as vm'
                }
            }
        })
    ;
    $urlRouterProvider.otherwise('/');
})

})();