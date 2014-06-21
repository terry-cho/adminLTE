'use strict';

describe('Controller: ShoplistCtrl', function () {

  // load the controller's module
  beforeEach(module('mutzipAdminApp'));

  var ShoplistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShoplistCtrl = $controller('ShoplistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
