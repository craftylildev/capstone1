"use strict";

app.controller("VehAddCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authFactory",
  "firebaseURL",
  "VehicleFactory",

  function ($scope, $location, $http, authFactory, firebaseURL, VehicleFactory) {

    $scope.carMakes = [];
    $scope.carModels = [];
    $scope.carYears = [];

    $scope.selectedMakeObject = {};  
    $scope.selectedModelObject = {};  
    $scope.selectedYearObject = {};    

    VehicleFactory().then(
      vehicleCollection => {
        // console.log("vehicleCollection", vehicleCollection);
        getMakes(vehicleCollection);
        $scope.api = vehicleCollection;

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
                      // console.log("$scope.selectedMakeObject", $scope.selectedMakeObject);
                for (var k in $scope.selectedMakeObject) {
                  var modelName = $scope.selectedMakeObject[k].name;
                  // populate MODEL list dropdown
                  $scope.carModels.push({"name": modelName});
                }
              }
            }
          }
        }

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
                    // console.log("$scope.selectedModelObject", $scope.selectedModelObject);
              for (var j in modelYears) {
                var modelYear = $scope.selectedModelObject[j].year;
                // populate YEAR list dropdown
                $scope.carYears.push({"year": modelYear});
              }
            }
          }
        }

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
                  console.log("vehicleYear", vehicleYear);
                  console.log("vehicleKey", vehicleKey);
                  // console.log("selectedYear", selectedYear);
                  // console.log("$scope.selectedYearObject", $scope.selectedYearObject);
            }
          }
        }

    });
  
    // populate MAKE dropdown     
    function getMakes(api) {
      for (var i in api) {
        var makes = api[i];
        for (var j in makes) {
          var makesList = makes[j].name;
          $scope.carMakes.push({"name": makesList});
        }
      }
    }
      
    // $scope.vehicleAdd = function() {
    //     // add vehicle to database
    //     // add to DOM
           // clear drop downs

           // let vehicle-data = {
              // uid: "",
              // vehicleKey: ""
              // user-make: "",
              // user-model: "",
              // user-year: "",
           // };

          // let maintenance-data = {
              // uid: "",
              // vehicleKey: ""
              // action: "",
              // intervalMileage: 0,
              // currentmileage: 0,
              // item: "",
              // maintenanceID: 0,
              // modelYearID: 0,
           // };

          // $http.post(
          //   //"firebaseURL",
          //   JSON.stringify(vehicle-data)
          // ).then(
          //   () => console.log("Added vehicle data to firebase"),// Handle resolve
          //   (response) => console.log(response)  // Handle reject
          // );

    // }


  }
]);




    // $scope.vehicleDelete = function () {
    //     // remove vehicle from database
    //     // remove vehicle form DOM
    // }
