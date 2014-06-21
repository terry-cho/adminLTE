'use strict';

angular
    .module('mutzipAdminApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        var access = routingConfig.accessLevels;

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('anon', {
                abstract: true,
                template: '',
                data: {
                    access: access.anon
                }
            })
            .state('anon.login', {
                url: '/login/',
                templateUrl: 'views/login.html',
                controller:'LoginCtrl'
            });

        $stateProvider
            .state('user', {
                abstract: true,
                data: {
                    access: access.user
                }
            })
            .state('user.shop-list', {
                url: '/',
                templateUrl: 'views/shop-list.html',
                controller:'ShoplistCtrl'
            });
    })
    .run(function($rootScope, $state, Auth){
        $rootScope.$on('$viewContentLoaded',function(event, viewConfig){

            });

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (!Auth.authorize(toState.data.access)) {
                //$rootScope.error = "Seems like you tried accessing a route you don't have access to...";
                event.preventDefault();

                if(fromState.url === '^') {
                    if(Auth.isLoggedIn()) {
                        $state.go('user.shop-list');
                    } else {
                        $rootScope.error = null;
                        $state.go('anon.login');
                    }
                }
            }
        });
    });
