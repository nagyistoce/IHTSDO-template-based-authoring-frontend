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


.config( function ($routeProvider, $locationProvider) {
    // TODO: Move imsUrl into configuration.
    var imsUrl = 'https://dev-ims.ihtsdotools.org/#/';
    console.log(window.location.href);
    console.log(escape(window.location.href));
    var imsUrlParams = '?serviceReferer=' + window.location.href;
    $routeProvider
        .when('/login', {
            redirectTo: function(){ window.location = decodeURIComponent(imsUrl + 'login' + imsUrlParams);}
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
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, accountService ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, accountService){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
        $scope.pageTitle = toState.data.pageTitle + ' | templateBasedAuthoring' ;
//        accountService.getAccount().then(function(data) {
//                console.log(data);
//            }); 
    }
  });
});