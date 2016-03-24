"use strict";

app.factory("VehicleFactory", ($q, $http) =>
  (carList) =>
    $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get(`https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=knjxcgxbdwh2tvq4pf7s7srn`)
        .success(
          vehicleCollection => resolve(vehicleCollection),
          error => reject(error)
        )
    )
);
