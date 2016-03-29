"use strict";

app.factory("MaintenanceFactory", ($q, $http, VehicleFactory) => {
  // (list) => 
  return (key) => {
    let vehicleKey = key;
    // let vehicleKey = VehicleFactory.getVehicleKey();
    console.log("vehicleKey", vehicleKey);
    return $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get(`https://api.edmunds.com/v1/api/maintenance/actionrepository/findbymodelyearid?modelyearid=${vehicleKey}&fmt=json&api_key=knjxcgxbdwh2tvq4pf7s7srn`)
        .success(
          maintenanceList => { 
          // console.log("maintenanceList", maintenanceList);
          resolve(maintenanceList)
        },
          error => reject(error)
        )
      )
    }
  }
);


