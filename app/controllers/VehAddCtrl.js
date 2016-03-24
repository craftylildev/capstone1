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

    VehicleFactory().then(
      vehicleCollection => {
        // console.log("vehicleCollection", vehicleCollection);
        getMakes(vehicleCollection);
        $scope.api = vehicleCollection;
    });

    $scope.carMakes = [];
    $scope.carModels = [];
    // $scope.carYears = [];
    // $scope.selectedMake = {};  
    // $scope.selectedModel = {};  
    // $scope.selectedYear = {};  
    // $scope.vehicleKey = {};  
    // $scope.newVehicle;


    function getMakes(api) {
      for (var i in api) {
        // console.log("api", api[i]);
        var make = api[i];
        for (var j in make) {
          console.log("make[j]", make[j]);
          $scope.carMakes.push({"name": make[j].name});
        }
      }
    }

    $scope.buildModels = function (selectedMake) {
      // Loop through all cars and only select the ones that match the user-selected make, do the filtering in the function
      // console.log("test", $scope.api);
      console.log("selectedMake", selectedMake);


      for (var i in $scope.api) {
        var make = $scope.api[i];
        for (var j in make) {
          // console.log("make", make[j].models);
          var models = make[j].models;
          for (var k in models) {
            // console.log("models", models[k].name);
            var modelName = models[k].name;
            // populate dropdown with models that match make selected

          }
        }
      }


      // bind selection to 
    }




    $scope.buildYears = function () {
      // Loop through all cars and only select the years that match the user-selected model
    }

    // function getModels(api) {
    //   for (var i in api.makes) {
    //     var model = api.makes[i].models;
    //     // console.log("make", api.makes[i].name);

    //     for (var j in model) {
    //     $scope.carModel.push({"name": model[j].name, "make": {"name": api.makes[i].name}});
    //       // console.log("model", $scope.carModel);
    //     }
    //   }  
    // }

    // function getYears(api) {
    //   for (var i in api.makes) {
    //     // console.log("api.makes", api.makes);
    //     var model = api.makes[i].models;
    //     // console.log("model", model);

    //     for (var j in model) {
    //       var yearArr = [];
    //       var modelYears = model[j].years;

    //       for (var k in modelYears) {
    //         var year = modelYears[k].year;

    //         yearArr.push({year});
    //         // console.log("yearArr", yearArr);
    //         // console.log("vehicle key", modelYears[k].id);
    //       }
    //       var car = {
    //         "model": model[j].name,
    //         "years": yearArr
    //       };

    //       // console.log("car", car);
    //       $scope.carYear.push(car);
    //     }
    //   }  
    //       console.log("$scope.carYear", $scope.carYear);
    // }
      
    $scope.vehicleAdd = function() {
        // add vehicle to database
        // grab model year id, add to database
        // add to DOM
    }

    $scope.vehicleDelete = function () {
        // remove vehicle from database
        // remove vehicle form DOM
    }

    $scope.modelYears = [];

  }
]);
