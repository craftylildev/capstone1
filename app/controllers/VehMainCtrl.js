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
  "$route",

  function ($scope, $location, $http, authFactory, firebaseURL, MaintenanceFactory, FirebaseFactory, VehicleFactory, $route) {
    
    $scope.vehicleMainList = [];
    $scope.vehicleSelected = false;
    $scope.mileageFilter = {};

    // display selected vehicle & service info
    $scope.goToVehicle = function (vehicleKey, car) {
      $scope.car = car;
      MaintenanceFactory(vehicleKey)
      .then(
        maintenanceList => {
          // console.log("maintenanceList", maintenanceList.actionHolder);
          $scope.vehicleMainList = maintenanceList.actionHolder;
      });
      // set filter for mileage over 0
      $scope.mileageOverZero($scope.vehicleMainList);
      $scope.vehicleSelected = true; 
    }; // end goToVehicle
    
    $scope.mileageOverZero = function(vehicleMainList) {
      return vehicleMainList.intervalMileage > 0;
    }
   
    $scope.clearVehicleInfo = function () {
      $scope.vehicleSelected = false;
    }

    // delete a selected vehicle
    $scope.vehicleDelete = (car) => { 
      // console.log("car", car);
      FirebaseFactory(car.vehicleKey)
        .then(
          userVehicles => {
            $http.delete(`${firebaseURL}/vehicle/${car.id}.json`);
            $route.reload();
          })
      $scope.vehicleSelected = false; 
    }; // end vehicleDelete

  } // end main function
]); // end VehMainCtrl
