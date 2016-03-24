"use strict";

app.factory("MaintenanceFactory", ($q, $http) =>
  (carList) =>
    $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get(`https://api.edmunds.com/v1/api/maintenance/actionrepository/findbymodelyearid?modelyearid={model year ID}&fmt=json&api_key=knjxcgxbdwh2tvq4pf7s7srn`)
        .success(
          maintenanceCollection => resolve(maintenanceCollection),
          error => reject(error)
        )
    )
);