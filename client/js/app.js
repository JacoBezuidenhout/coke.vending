// Load native UI library
var ngui = require('nw.gui');
// Get the current window
var nwin = ngui.Window.get();
onload = function() {
    nwin.show();
    nwin.maximize();
}

var url = "http://localhost:1337";

var app = angular.module('bcfood', ['ngRoute'])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      // when('/', {
      //   templateUrl: './pages/index.html',
      //   controller: 'indexController'
      // }).
      when('/employers/:searchText', {
        templateUrl: './pages/employers.html',
        controller: 'employersController'
      }).
      when('/employers', {
        templateUrl: './pages/employers.html',
        controller: 'employersController'
      }).

      when('/employer/:id', {
        templateUrl: './pages/employer.html',
        controller: 'employerController'
      }).
      when('/employer', {
        templateUrl: './pages/employer.html',
        controller: 'employerController'
      }).

      when('/employees/:searchText', {
        templateUrl: './pages/employees.html',
        controller: 'employeesController'
      }).
      when('/employees', {
        templateUrl: './pages/employees.html',
        controller: 'employeesController'
      }).

      when('/owners/:searchText', {
        templateUrl: './pages/owners.html',
        controller: 'ownersController'
      }).
      when('/owners', {
        templateUrl: './pages/owners.html',
        controller: 'ownersController'
      }).

      when('/eOrganizations', {
        templateUrl: './pages/eOrganizations.html',
        controller: 'eOrganizationsController'
      }).

      when('/unions', {
        templateUrl: './pages/unions.html',
        controller: 'unionsController'
      }).

      otherwise({
        redirectTo: '/employers'
      });
  }]);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file,cb){
        var fd = new FormData();
        fd.append('avatar', file);
        $http.post( url + "/upload/upload", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            cb(response);
        })
        .error(function(){ 
            cb(response);
        });
    }
}])

app.controller('navController', function($scope,$http,$location) 
{
    var t = this;

    t.search = function()
    {
        $http.get(url + "/patient/?patientId=" + t.searchText)
        .then(function(response){
            if (response.data.length == 1)
                $location.path( "/patient/edit/" + response.data[0].id );
            else
                $location.path( "/patients/" + t.searchText );
        },console.log);
    }

});

app.controller('indexController', function($scope,$http) 
{
    var t = this;
    t.test = [1,2,3,4];
});

app.controller('employersController', function($scope,$http,$routeParams) 
{
    var t = this;
    t.employer = {};
    t.searchText = $routeParams.searchText;

    t.refresh = function(limit)
    {
        $http.get( url + "/employer?limit=50").
          then(function(response) {
            t.employers = response.data;
              $http.get( url + "/employer?skip=50&limit=0").
                then(function(response) {
                  $scope.$applyAsync(function(){
                    for (var i = 0; i < response.data.length; i++) {
                      t.employers.push(response.data[i]);
                    };
                  });
                }, function(response) {});
          }, function(response) {});
    }

    t.setEmployer = function(e)
    {
        console.log(e);
        $scope.$applyAsync(function(){
            t.employer = e;
            t.employerString = JSON.stringify(e,null,4);
        });
    }

    t.refresh();
});

app.controller('employeesController', function($scope,$http,$routeParams) 
{
    var t = this;
    t.employee = {};
    t.searchText = $routeParams.searchText;

    t.refresh = function(limit)
    {
        $http.get( url + "/employee?limit=50").
          then(function(response) {
            t.employees = response.data;
              $http.get( url + "/employee?skip=50&limit=0").
                then(function(response) {
                  $scope.$applyAsync(function(){
                    for (var i = 0; i < response.data.length; i++) {
                      t.employees.push(response.data[i]);
                    };
                  });
                }, function(response) {});
          }, function(response) {});
    }

    t.setEmployee = function(e)
    {
        console.log(e);
        $scope.$applyAsync(function(){
            t.employee = e;
            t.employeeString = JSON.stringify(e,null,4);
        });
    }

    t.refresh();
});

app.controller('ownersController', function($scope,$http,$routeParams) 
{
    var t = this;
    t.owner = {};
    t.searchText = $routeParams.searchText;

    t.refresh = function(limit)
    {
        $http.get( url + "/owner?limit=50").
          then(function(response) {
            t.owners = response.data;
              $http.get( url + "/owner?skip=50&limit=0").
                then(function(response) {
                  $scope.$applyAsync(function(){
                    for (var i = 0; i < response.data.length; i++) {
                      t.owners.push(response.data[i]);
                    };
                  });
                }, function(response) {});
          }, function(response) {});
    }

    t.setOwner = function(e)
    {
        console.log(e);
        $scope.$applyAsync(function(){
            t.owner = e;
            t.ownerString = JSON.stringify(e,null,4);
        });
    }

    t.refresh();
});

app.controller('eOrganizationsController', function($scope,$http,$routeParams) 
{
    var t = this;
    t.eOrganization = {};
    t.searchText = $routeParams.searchText;

    t.refresh = function(limit)
    {
        $http.get( url + "/employersorganisation?limit=50").
          then(function(response) {
            t.eOrganizations = response.data;
              $http.get( url + "/employersorganisation?skip=50&limit=0").
                then(function(response) {
                  $scope.$applyAsync(function(){
                    for (var i = 0; i < response.data.length; i++) {
                      t.eOrganizations.push(response.data[i]);
                    };
                  });
                }, function(response) {});
          }, function(response) {});
    }

    t.seteOrganization = function(e)
    {
        console.log(e);
        $scope.$applyAsync(function(){
            t.eOrganization = e;
            t.eOrganizationString = JSON.stringify(e,null,4);
        });
    }

    t.addeOrganization = function()
    {
      $http.post( url + "/employersorganisation/create", t.neweOrganization).
        then(function(response) {
          console.log(response);
          t.eOrganizations.push(response.data);
        }, function(response) {});
    }

    t.refresh();
});

app.controller('unionsController', function($scope,$http,$routeParams) 
{
    var t = this;
    t.union = {};
    t.searchText = $routeParams.searchText;

    t.refresh = function(limit)
    {
        $http.get( url + "/union?limit=50").
          then(function(response) {
            t.unions = response.data;
              $http.get( url + "/union?skip=50&limit=0").
                then(function(response) {
                  $scope.$applyAsync(function(){
                    for (var i = 0; i < response.data.length; i++) {
                      t.unions.push(response.data[i]);
                    };
                  });
                }, function(response) {});
          }, function(response) {});
    }

    t.setunion = function(e)
    {
        console.log(e);
        $scope.$applyAsync(function(){
            t.union = e;
            t.unionString = JSON.stringify(e,null,4);
        });
    }

    t.addunion = function()
    {
      $http.post( url + "/union/create", t.newUnion).
        then(function(response) {
          t.unions.push(response.data);
        }, function(response) {});
    }

    t.refresh();
});