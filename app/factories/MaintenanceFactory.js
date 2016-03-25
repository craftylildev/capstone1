"use strict";

app.factory("MaintenanceFactory", ($q, $http, VehicleFactory) => {
  // (list) => 
  return () => {
    let vehicleKey = VehicleFactory.getVehicleKey();
    return $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get(`https://api.edmunds.com/v1/api/maintenance/actionrepository/findbymodelyearid?modelyearid=${vehicleKey}&fmt=json&api_key=knjxcgxbdwh2tvq4pf7s7srn`)
        .success(
          maintenanceList => resolve(maintenanceList),
          error => reject(error)
        )
      )
    }
  }
);


