app.controller('ProblemsController', function($scope, ProblemsFactory, $stateParams, $state, user){
  ProblemsFactory.getAllProblems().then(function(problems){
    $scope.problems = problems.data;
  });

  $scope.user = user;

  $scope.problemToSolve = $stateParams.problemToSolve;

  $scope.createProblem = ProblemsFactory.createProblem;

  $scope.openFeed = false;

  $scope.openMenu = ($mdOpenMenu, ev) => {
    $mdOpenMenu(ev);
  };

  $scope.randomlyPair = function(){
    console.log('randomly pair hit')
    $state.go('programming-page');
  };

  $scope.workWithFriend = function(){
    console.log('work with friend hit')
    $state.go('programming-page');
  };
});

app.config(function($stateProvider){
  $stateProvider.state('problems', {
    url: '/problems',
    templateUrl: 'js/problems/views/problems.html',
    controller: 'ProblemsController',
    resolve: {
        user: (AuthService, $log) => {
            return AuthService.getLoggedInUser()
            .catch($log.error);
        }
    }
  })
  .state('createProblem', {
    url: '/createProblem',
    templateUrl: 'js/problems/views/createProblem.html',
    controller: 'ProblemsController'
  });
});
