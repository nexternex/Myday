myday.config(function (authProvider, $routeProvider, $locationProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'html/login.tpl.html',
    controller: 'LoginCtrl'
  });
  // Logged in route
  $routeProvider.when('/user-info', {
    templateUrl: 'html/userInfo.tpl.html',
    controller: 'UserInfoCtrl',
    requiresLogin: true
  });
  // Index in route
  $routeProvider.when('/', {
    templateUrl:'html/home.htm',
    controller:'mainController'
    });
  // Register in route
  $routeProvider.when('/register', {
    templateUrl:'html/register.htm',
    controller:'mainController'
    });

//  authProvider.init({
//    domain: 'myday.eu.auth0.com',
//    clientID: 'oFP2Wct8YTQvmWjmKAk4YgGmfLVZwJsl',
//    callbackURL: location.href,
//    // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
//    loginUrl: '/login'
//  });
});