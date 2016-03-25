"use strict";
// Returning a promise of the user vehicle data
app.factory("FirebaseFactory", function ($q, $http, firebaseURL, authFactory) { 
  return () => {
    let user = authFactory.getUser();
    return $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get(`${firebaseURL}/vehicle.json?orderBy="uid"&equalTo="${user.uid}"`) 
        .success(
          userVehicles => resolve(userVehicles),
          error => reject(error)
        )
    )
  }
});
