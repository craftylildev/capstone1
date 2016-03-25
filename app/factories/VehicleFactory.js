"use strict";
app.factory("VehicleFactory", ($q, $http) => {

  let vehicleKey = 0;

    return {
      getVehicle: function() {
        return $q((resolve, reject) => // Return a promise for our async XHR
        $http
          .get(`https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=knjxcgxbdwh2tvq4pf7s7srn`)
          .success(
            vehicleCollection => resolve(vehicleCollection),
            error => reject(error)
          )
        )
      },
      setVehicleKey: function (key) {
        vehicleKey = key;
      },
      getVehicleKey: function () {
        return vehicleKey;
      }
    }
  }

);
