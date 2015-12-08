// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ngCordova', 'ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('app', function($scope, $cordovaGeolocation, $timeout, $cordovaDevice) {

    $timeout(function () {
      $scope.getLocation();
    }, 500);


    $scope.getLocation = function () {

      var device = $cordovaDevice.getDevice();

      $scope.manufacturer = device.manufacturer;
      $scope.model = device.model;
      $scope.platform = device.platform;
      $scope.uuid = device.uuid;

      window.plugins.imeiplugin.getImei(callback);

      if (window.cordova) {
        cordova.plugins.diagnostic.isLocationEnabled(
          function (e) {
            if (e) {
              var posOptions = {timeout: 10000, enableHighAccuracy: true};
              $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                  //alert(position.coords.latitude + " "+position.coords.longitude);
                  $scope.lat = position.coords.latitude;
                  $scope.long = position.coords.longitude;
                }, function (err) {
                  console.log("Geolocation error:" + err);
                });
            }
            else {
              //CommonUtility.showAlert("Location Not Turned ON");
              cordova.plugins.diagnostic.switchToLocationSettings();
            }
          },
          function (e) {
            console.log('Error ' + e);
          }
        );
      }
    }


    function callback(imei) {
      $scope.imei = imei;

      console.log("My Android IMEI :" + imei);
    }

  });
