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
    
    MaintenanceFactory().then(
      maintenanceList => {
        console.log("maintenanceList", maintenanceList);

      function goToVehicle() {
        console.log("test");
      }
    });

  }
]);
