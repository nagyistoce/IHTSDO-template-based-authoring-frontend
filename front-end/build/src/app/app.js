angular.module( 'templateBasedAuthoring', [
    'templates-app',
    'templates-common',
    'templateBasedAuthoring.createModel',
    'templateBasedAuthoring.matrix',
    'templateBasedAuthoring.sharedVariablesService',
    'templateBasedAuthoring.snowowlService',
    'templateBasedAuthoring.conceptNameFilter',
    'templateBasedAuthoring.accountService',
    'ngRoute'
])

.config( ["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    // TODO: Move imsUrl into configuration.
    var imsUrl = 'https://dev-ims.ihtsdotools.org/#/';
    var imsUrlParams = '?serviceReferrer=' + window.location.href;
    $routeProvider
        .when('/login', {
            redirectTo: function(){ window.location = imsUrl + 'login' + imsUrlParams;}
          })
        .when('/logout', {
            redirectTo: function(){ window.location = imsUrl + 'logout' + imsUrlParams;}
          })
        .when('/settings', {
            redirectTo: function(){ window.location = imsUrl + 'settings' + imsUrlParams;}
          })
        .when('/register', {
            redirectTo: function(){ window.location = imsUrl + 'register' + imsUrlParams;}
          })
        .otherwise({
            redirectTo: '/createModel'
        });
}])

.run( function run () {
})

.controller( 'AppCtrl', ["$scope", "$location", "accountService", function AppCtrl ( $scope, $location, accountService ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, accountService){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
        $scope.pageTitle = toState.data.pageTitle + ' | templateBasedAuthoring' ;
//        accountService.getAccount().then(function(data) {
//                console.log(data);
//            }); 
    }
  });
}]);