// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var URL = "http://192.168.0.2:8080";

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$rootScope,$http) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    var productDesc = {"7":"emoji1","8":"emoji2","9":"emoji3","10":"emoji4","11":"emoji5","12":"emoji6","1":"Fun","2":"Together","3":"Holiday","4":"Summer","5":"Forever","6":"Love"};

    $rootScope.getProductName = function(prod)
    {
      return productDesc[prod.id];
    }

    $rootScope.updateStock = function()
    {
      $http.get(URL + '/product')
      .then(function(data) {
        // console.log(data);
        if (data.data)
        {
          console.log('Sails responded with: ', $rootScope.products);
          $rootScope.products = data.data;
          $rootScope.warning = false;
          for (var i = 0; i < $rootScope.products.length; i++) {
            if ($rootScope.products[i].qty < 100)
            {
              $rootScope.warning = true;
            }
          };
        }
        else
        {
          console.log('ERR');
        }
      },function(err){
        console.log(JSON.stringify(err));
      });
    }

    $rootScope.updateStock();
    setInterval(function()
    {
      $rootScope.updateStock();
    },10000);

  });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'index.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      },
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
