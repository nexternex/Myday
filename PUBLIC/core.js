// public/core.js
var myday = angular.module('myday', ['ngRoute','auth0', 'angular-storage', 'angular-jwt']);

myday.config(function (authProvider) {
  authProvider.init({
    domain: 'myday.eu.auth0.com',
    clientID: 'oFP2Wct8YTQvmWjmKAk4YgGmfLVZwJsl'
  });
})

myday.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
});

myday.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
  // ...

  // We're annotating this function so that the `store` is injected correctly when this file is minified
  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');
  // ...
});

myday.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
});

// app.js
