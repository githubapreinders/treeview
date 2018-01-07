(function()
    {

 'use strict';
angular.module('confab', ['ui.router','ui.tree'])
    .config(function ($stateProvider, $urlRouterProvider)
    {
        $stateProvider
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
    });

}());



