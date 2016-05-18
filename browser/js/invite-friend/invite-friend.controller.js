'use strict';

app.controller('InviteFriendCtrl', ($scope, user, friends, LoggedInUsersFactory, $stateParams, $state, $mdDialog, Socket, NotificationsFactory, $log) => {
    let loggedInUsers = LoggedInUsersFactory.getLoggedInUsers();
    let scenarioType = $stateParams.scenarioType;
    let scenarioId = $stateParams.scenarioId;
    let problemId = $stateParams.problemId;

    console.log('This is the problemId:', problemId);

    $scope.friends = friends;

    $scope.goBackToScenario = () => {
        if (scenarioType === 'workspace') $state.go('workspaceMain', { workspaceId: scenarioId });
        else $state.go('problems');
    };

    $scope.selectFriend = (ev, friend) => {
        let confirm = $mdDialog.confirm()
            .title('Invite ' + friend.username)
            .ariaLabel('Invite friend')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(() => {
            NotificationsFactory.sendNotification(friend, loggedInUsers[user.username], scenarioType, scenarioId, problemId)
            .then((sentNotification) => {
                Socket.on('offerAccepted', () => {
                    if (scenarioType === 'workspace') $state.go('workspaceMain', { workspaceId: scenarioId });
                    // TODO: need to add for other scenarios
                });

                $scope.friends[$scope.friends.findIndex((aFriend) => aFriend._id === friend._id)].invited = true;
                $scope.friends = $scope.friends.map((aFriend) => {
                    aFriend.disable = true;
                    return aFriend;
                });
            })
            .catch($log.error);
        });
    };

});
