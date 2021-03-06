'use strict';

app.directive('ebbWorkspaceToolbar', () => {

    return {
        restrict: 'E',
        templateUrl: 'js/ebb/ebb-workspace-toolbar.html',
        scope: {
            workspace: '=',
            user: '='
        },
        controller: 'EbbWorkspaceToolbarCtrl'
    };

});
