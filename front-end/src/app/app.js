angular.module( 'templateBasedAuthoring', [
    'templates-app',
    'templates-common',
    'templateBasedAuthoring.createModel',
    'templateBasedAuthoring.matrix',
    'templateBasedAuthoring.sharedVariablesService',
    'templateBasedAuthoring.snowowlService',
    'templateBasedAuthoring.conceptNameFilter',
    'templateBasedAuthoring.accountService',
    'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider, $provide) {
    // TODO: Move imsUrl into configuration.
    var imsUrl = 'https://dev-ims.ihtsdotools.org/#/';
    var imsUrlParams = '?serviceReferrer=' + window.location.href;
    $provide.decorator('$sniffer', function($delegate) {
      $delegate.history = false;
      return $delegate;
    });
    $stateProvider
    .state('login', {
        url: 'login'
    })
    .state('logout', {
        url: 'logout'
    })
    .state('settings', {
        url: 'settings'
    })
    .state('register', {
        url: 'register'
    });
    $urlRouterProvider
        .when('/login', function() { window.location = imsUrl + 'login' + imsUrlParams;})
        .when('/logout', function() { window.location = imsUrl + 'logout' + imsUrlParams;})
        .when('/settings', function() { window.location = imsUrl + 'settings' + imsUrlParams;})
        .when('/register', function() { window.location = imsUrl + 'register' + imsUrlParams;})
        .otherwise('/createModel');

    // This not working when app is not at the root of the domain
    //$locationProvider.html5Mode(true);
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