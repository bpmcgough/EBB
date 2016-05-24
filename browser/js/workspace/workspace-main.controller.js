'use strict';

app.controller('WorkspaceMainCtrl', ($scope, $log, RunTests, user, workspace, WorkspaceFactory, $mdToast, $mdDialog, $state, LoggedInUsersFactory, Socket, VideoChatFactory) => {

    const loggedInUsers = LoggedInUsersFactory.getLoggedInUsers();
    $scope.loggedInUsers = loggedInUsers;
    $scope.user = user;
    $scope.workspace = workspace;
    $scope.isCreator = user._id === workspace.creator._id;
    $scope.hasRunCode = false;
    if (workspace.collaborator) {
        $scope.partnerUser = $scope.isCreator ? workspace.collaborator : workspace.creator;
    }


    function showYouAreCorrectDialog(problemId) {
        let confirm = $mdDialog.confirm()
            .title('You are correct!!!')
            .ariaLabel('Correct')
            .ok('Go to solution page')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(() => {
          $state.go('solution', {hasSolved: true, problemId: problemId, solutionCode: $scope.workspace.text});
        });
    }

    function showYouAreWrongDialog() {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('You are incorrect')
            .textContent('Please try again.')
            .ariaLabel('Please try again')
            .ok('Okay')
        );
    }

    $scope.runCode = () => {
        const userCode = $scope.workspace.text;
        const testCode = $scope.workspace.problemId ? $scope.workspace.problemId.test : null;
        const scenario = $scope.workspace.scenarioType;

        RunTests.submitCode({ userCode, testCode, scenario })
        .then((testResults) => {
            $scope.testResults = JSON.parse(testResults);
            $scope.test1Error = $scope.testResults.tests[0].err;
            $scope.test2Error = $scope.testResults.tests[1].err;
            $scope.test3Error = $scope.testResults.tests[2].err;
            $scope.hasRunCode = true;
            if (!$scope.testResults.failures.length) showYouAreCorrectDialog($scope.workspace.problemId._id);
        })
        .catch($log.error);
    };

    // $scope.runCode = () => {
    //     let codeToRun = $scope.workspace.text + (workspace.scenarioType === 'solve' ? workspace.problemId.test : '')
    //     RunTests.submitCode({ code: codeToRun })
    //         .then((returnedValue) => {
    //             $scope.returnVal = returnedValue;
    //             if (workspace.problemId && $scope.returnVal.stdout.slice(0,-1) === workspace.problemId.testAnswer && workspace.scenarioType === 'solve') {
    //                 $scope.workspace.solved = true;
    //                 WorkspaceFactory.saveWorkspace($scope.workspace).
    //                 then(() => {
    //                     showYouAreCorrectDialog(workspace.problemId._id);
    //                     $scope.returnVal.stdout = 'You passed'
    //                 })
    //                 .catch($log.error);
    //             } else if (workspace.scenarioType === 'solve'){
    //                 showYouAreWrongDialog();
    //                 $scope.returnVal.stdout = 'Incorrect - please try again'
    //             }

    //         })
    //         .catch($log.error);
    // };

    // TODO: sanitize user console.logs
    // TODO: use process.stdout instead of console.log for the tests
    // TODO: be able to show user's console.logs (need to run code twice if solve)

});
