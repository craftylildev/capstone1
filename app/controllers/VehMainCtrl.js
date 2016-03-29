"use strict";

app.controller("VehMainCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authFactory",
  "firebaseURL",
  "MaintenanceFactory",
  "FirebaseFactory",
  "VehicleFactory",

  function ($scope, $location, $http, authFactory, firebaseURL, MaintenanceFactory, FirebaseFactory, VehicleFactory) {
    
    $scope.vid = "";

    $scope.vehicleMainList = [];
    $scope.mainItem = "";
    $scope.mainAction = "";
    $scope.intervalMileage = "";

    $scope.goToVehicle = function (vehicleKey, car) {
      $scope.car = car;
      MaintenanceFactory(vehicleKey)
      .then(
        maintenanceList => {
          console.log("maintenanceList", maintenanceList.actionHolder);
          $scope.vehicleMainList = maintenanceList.actionHolder;
        
      }); 
      populateVehicle();
    } // end goToVehicle

    function populateVehicle () {
      FirebaseFactory()
        .then(        
          userVehicles => {
            // console.log("userVehicles", userVehicles);
            Object.keys(userVehicles).forEach(key => {
              $scope.vid = userVehicles[key].id;
              // console.log("vid", $scope.vid);
              // $scope.vehicleMainList.push(userVehicles[key]);
            });
          }
        )
    } // end populateVehicle




  } // end main function
]); // end VehMainCtrl
