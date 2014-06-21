'use strict';

angular.module('mutzipAdminApp')
    .factory('Auth', function($http, $cookies){
        var accessLevels = routingConfig.accessLevels
            , userRoles = routingConfig.userRoles
            , currentUser = jQuery.parseJSON($cookies.user) || { username: '', role: userRoles.public };

        $.cookie.json = true;

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        return {
            authorize: function(accessLevel, role) {
                if(role === undefined) {
                    role = currentUser.role;
                }
                return accessLevel.bitMask & role.bitMask;
            },
            isLoggedIn: function(user) {
                if(user === undefined) {
                    user = currentUser;
                }
                return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
            },
            register: function(user, success, error) {
                $http.post('/register', user).success(function(res) {
                    changeUser(res);
                    success();
                }).error(error);
            },
            login: function(user, success, error) {
                /*$http.post('/login', user).success(function(user){
                 changeUser(user);
                 success(user);
                 }).error(error);*/
                if (user.username == 'admin' && user.password == 'admin') {
                    $.cookie('user', {username: user.username, role: userRoles.user }, { expires: 1 });
                    changeUser({ username: user.username, role: userRoles.user });
                    success(user);
                }
                else {
                    error();
                }
            },
            logout: function(success, error) {
                /*$http.post('/logout').success(function(){
                    changeUser({
                        username: '',
                        role: userRoles.public
                    });
                    success();
                }).error(error);*/
                changeUser({
                    username: '',
                    role: userRoles.public
                });
                $cookies.user = null;
                success();
            },
            accessLevels: accessLevels,
            userRoles: userRoles,
            user: currentUser
        };
    });
