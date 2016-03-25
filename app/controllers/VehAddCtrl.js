"use strict";

app.controller("VehAddCtrl", [

  "$scope",
  "$location",
  "$http",
  "authFactory",
  "firebaseURL",
  "VehicleFactory",
  "FirebaseFactory",
  "MaintenanceFactory",

  function ($scope, $location, $http, authFactory, firebaseURL, VehicleFactory, FirebaseFactory, MaintenanceFactory) {

    $scope.carMakes = [];
    $scope.carModels = [];
    $scope.carYears = [];

    $scope.selectedMakeObject = {};  
    $scope.selectedModelObject = {};  
    $scope.selectedYearObject = {};    

    $scope.newVehicle = {
      vehicleKey: 0,
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: 0
    };

    $scope.userVehicleList = [];

    VehicleFactory.getVehicle().then(
      vehicleCollection => {
        // console.log("vehicleCollection", vehicleCollection);
        getMakes(vehicleCollection);
        populateVehiclelList();
        $scope.api = vehicleCollection;

        // populate MAKE dropdown     
        function getMakes(api) {
          for (var i in api) {
            var makes = api[i];
            for (var j in makes) {
              var makesList = makes[j].name;
              $scope.carMakes.push({"name": makesList});
            }
          }
        }; // end getMakes

        function populateVehiclelList () {
          FirebaseFactory()
          .then(        
            userVehicles => {
              console.log("userVehicles", userVehicles);
                Object.keys(userVehicles).forEach(key => {
                  userVehicles[key].id = key;
                  $scope.userVehicleList.push(userVehicles[key]);
                });
            }
          )
        }
            
        //Loop through all MAKES and only display the MODELS that match the user-selected MAKE
        $scope.buildModels = function (selectedMake) {
          // console.log("selectedMake", selectedMake);
          var api = vehicleCollection;
          for (var i in api) {
            var makes = api[i];
            for (var j in makes) {
              // get MODEL object that matches MAKE selected
              if (selectedMake.name == makes[j].name) {
                $scope.selectedMakeObject = makes[j].models;
                      // console.log("selectedMake", selectedMake);
                      $scope.newVehicle.vehicleMake = selectedMake.name;
                      // console.log("$scope.selectedMakeObject", $scope.selectedMakeObject);
                for (var k in $scope.selectedMakeObject) {
                  var modelName = $scope.selectedMakeObject[k].name;
                  // populate MODEL list dropdown
                  $scope.carModels.push({"name": modelName});
                }
              }
            }
          }
        }; // end buildModels

        //Loop through all MODELS and only display the YEARS that match the user-selected MODEL
        $scope.buildYears = function (selectedModel) {
          // console.log("$scope.selectedMakeObject", $scope.selectedMakeObject);
          var modelList = $scope.selectedMakeObject;
          for (var i in modelList) {
            var modelYears = modelList[i].years;
            // get YEAR object that matches MODEL selected
            if (selectedModel.name == modelList[i].name) {
              $scope.selectedModelObject = modelList[i].years;
                    // console.log("selectedModel", selectedModel);
                    $scope.newVehicle.vehicleModel = selectedModel.name;

                    // console.log("$scope.selectedModelObject", $scope.selectedModelObject);
              for (var j in modelYears) {
                var modelYear = $scope.selectedModelObject[j].year;
                // populate YEAR list dropdown
                $scope.carYears.push({"year": modelYear});
              }
            }
          }
        }; // end buildYears

        $scope.getVehicle = function (selectedYear) {
          // console.log("$scope.selectedMakeObject", $scope.selectedMakeObject);                
          // console.log("$scope.selectedModelObject", $scope.selectedModelObject);   
          var modelYears = $scope.selectedModelObject;
          for (var i in modelYears) {
            var vehicleYear = modelYears[i].year;
            var vehicleKey = modelYears[i].id;
            // console.log("modelYears", modelYears[i].year);
            if (selectedYear.year == modelYears[i].year) {
              $scope.selectedYearObject = modelYears[i].year;
                  $scope.newVehicle.vehicleYear = vehicleYear;
                  $scope.newVehicle.vehicleKey = vehicleKey;
                  VehicleFactory.setVehicleKey(vehicleKey);
                  // console.log("vehicleYear", vehicleKey);
                  // console.log("vehicleKey", vehicleKey);
                  // console.log("selectedYear", selectedYear);
                  // console.log("$scope.selectedYearObject", $scope.selectedYearObject);
            }
          }
        }; // end getVehicle

       // add vehicle to database
        $scope.vehicleAdd = () => {
          let user = authFactory.getUser();
          let newVehicle = {
            uid: user.uid,
            vehicleKey: $scope.newVehicle.vehicleKey,
            vehicleMake: $scope.newVehicle.vehicleMake,
            vehicleModel: $scope.newVehicle.vehicleModel,
            vehicleYear: $scope.newVehicle.vehicleYear
          };
          console.log("newVehicle", newVehicle);

          // POST the vehicle to Firebase
          $http.post(`${firebaseURL}/vehicle.json`,
            // Remember to stringify objects/arrays before
            // sending them to an API
            JSON.stringify(newVehicle)
          // The $http.post() method returns a promise, so you can use then()
          ).then( function () {         
              populateVehiclelList();
            }
          ); 
     
        }; // end vehicleAdd

    }); // end VehicleFactory


    // console.log("MaintenanceFactory", MaintenanceFactory());



  } // end main function

]); // end VehAddCtrl

// clear drop downs on VEHICLE ADD
         