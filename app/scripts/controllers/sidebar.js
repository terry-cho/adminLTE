'use strict';

angular.module('mutzipAdminApp')
  .controller('SidebarCtrl', function ($scope, Auth) {
        $scope.user = Auth.user;
        $scope.userRoles = Auth.userRoles;
        $scope.accessLevels = Auth.accessLevels;
  });
