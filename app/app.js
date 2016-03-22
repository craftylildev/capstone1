"use strict";

let app = angular.module("VehicleApp", ["ngRoute", "firebase"]).constant('firebaseURL', "https://solima-capstone-1.firebaseio.com");


/*
  Define a promise for any view that needs an authenticated user
  before it will resolve (see below)
 */
let isAuth = (authFactory) => new Promise((resolve, reject) => {
  if (authFactory.isAuthenticated()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
      when("/", {
        templateUrl: "partials/display.html",
        resolve: { isAuth }
      }).
      when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
      }).
      when("/logout", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
      }).
      otherwise({
        redirectTo: "/"
      });
  }]);


/*
  When the application first loads, redirect the user to the login
  form if there is no authentication
 */
app.run([
  "$location",

  ($location) => {
    let appRef = new Firebase("https://solima-capstone-1.firebaseio.com");

    appRef.onAuth(authData => {
      if (!authData) {

        console.log("onAuth detected unauthenticated client");
        $location.path("/login");
      }
    });
  }
]);