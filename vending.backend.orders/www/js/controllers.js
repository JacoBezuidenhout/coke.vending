angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$rootScope,$http) {
  $scope.orders = [];

  var updateOrders = function()
  {
    $http.get(URL+'/order?done=false')
    .then(function(body) {
      if (body.data)
      {
        console.log('Sails responded with: ', body);
        $scope.orders = body.data;
      }
      else
      {
        console.log('ERR');
      }
    },function(err){
      console.log(err);
    });
  }
  updateOrders();
  
  setInterval(function(){
    if ($rootScope.warning)
    {
      if ($rootScope.navColor == 'red')
      {
        $scope.$applyAsync(function(){
          $rootScope.navColor = 'grey';
        })
      }
      else
      {
        $scope.$applyAsync(function(){
          $rootScope.navColor = 'red';
        })
      }
    }
    else
    {
      $rootScope.navColor = 'grey';
    }
    updateOrders();
  },1000);

  $scope.done = function(index,o)
  {
    console.log(index,o);
    $http.post(URL + "/order/update/" + o.id, {done:true})
    .then(function(body) {
      console.log('UPDATE: ', body.data);
      if (body.data)
      {
        if (body.data.done)
        {
          // $scope.$applyAsync(function(){
          //   $scope.orders.splice(index, 1);
          // });
          updateOrders();
        }
      }
      // return $scope.data.wifi;
    },function(err){
      console.log(err);
    });
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) { 
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$rootScope,$http,$ionicPopup) {
  $scope.stock = {};
  $scope.stock.qty = 10;
  $scope.addStock = function(p) {
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="number" ng-model="stock.qty">',
      title: 'Add more stock',
      subTitle: 'Number of stock to add to ' + $rootScope.getProductName(p),
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.stock.qty) {
              e.preventDefault();
            } else {
              console.log({qty:p.qty+$scope.stock.qty});
              $http.post(URL+"/product/update/" + p.id, {qty:p.qty+$scope.stock.qty})
              .then(function serverResponded (body) {
                console.log('UPDATE: ', body.data);
                $rootScope.updateStock();
                // return $scope.data.wifi;
              },function(err){
                console.log(err);
              });
            }
          }
        }
      ]
    });
    // myPopup.then(function(res) {
    //   console.log('Tapped!', res);
    // });
    // $timeout(function() {
    //    myPopup.close(); //close the popup after 3 seconds for some reason
    // }, 3000);
  };
});
