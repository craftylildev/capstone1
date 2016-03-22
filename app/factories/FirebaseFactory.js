"use strict";

// Returning a promise of the user movie data
app.factory("FirebaseFactory", ($q, $http) =>
  () =>
    $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get("https://solima-capstone-1.firebaseio.com/data.json")
        .success(
          userCollection => {
            for (let key in userCollection){
              userCollection[key].id = key;
            }
            resolve(userCollection)
          },
          error => reject(error)
        )
    )
);