angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$rootScope) {

  io.socket.get('/order?done=false', function serverResponded (body, JWR) {
    if (JWR.statusCode == 200)
    {
      console.log('Sails responded with: ', body);
      $scope.orders = body;
    }
    else
    {
      console.log('ERR');
    }
  });
  
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

  },1000);

  io.socket.on('order', function serverResponded (body, JWR) {
      console.log('Sails responded with: ', body);
      if (body.verb == "created")
      {
        body.data.smileyOne = {id:body.data.smileyOne};
        body.data.smileyTwo = {id:body.data.smileyTwo};
        body.data.stickerOne = {id:body.data.stickerOne};
        body.data.stickerTwo = {id:body.data.stickerTwo};
        $scope.$applyAsync(function(){
          $scope.orders.push(body.data);
        })
      }
  });

  $scope.done = function(index,o)
  {
    console.log(index,o);
    io.socket.post("/order/update/" + o.id, {done:true}, function serverResponded (body, JWR) {
      console.log('UPDATE: ', body);
      if (body)
      {
        if (body.done)
        {
          $scope.$applyAsync(function(){
            $scope.orders.splice(index, 1);
          });
        }
      }
      // return $scope.data.wifi;
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
              io.socket.post("/product/update/" + p.id, {qty:p.qty+$scope.stock.qty}, function serverResponded (body, JWR) {
                console.log('UPDATE: ', body);
                $rootScope.updateStock();
                // return $scope.data.wifi;
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
