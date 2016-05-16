app.factory('LoggedInUsersFactory', function(Socket, AuthService, $rootScope, $http) {
    const LoggedInUsersFactory = {};
    const usersWhoAreLoggedIn = {};

    function isEmpty(obj) {
        for(let prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    function getData(res) {
        return res.data;
    }

    Socket.on('updateLoggedInUsers', function(loggedInUsers) {
        angular.copy(loggedInUsers, usersWhoAreLoggedIn);
        localStorage.setItem('usersWhoAreLoggedIn', JSON.stringify(usersWhoAreLoggedIn));
        $rootScope.$evalAsync();
    });

    Socket.on('receiveOffer', function(apiKey, sessionId, fromUser) {
        $http.get('getToken/' + apiKey + '/' + sessionId)
            .then(getData)
            .then(function(tokens) {
                usersWhoAreLoggedIn[fromUser.username].tokens = tokens;
                localStorage.setItem('usersWhoAreLoggedIn', JSON.stringify(usersWhoAreLoggedIn));
            });
    });

    LoggedInUsersFactory.getLoggedInUsers = function () {
        if (!isEmpty(usersWhoAreLoggedIn)) return usersWhoAreLoggedIn;
        return JSON.parse(localStorage.getItem('usersWhoAreLoggedIn'));
    };

    return LoggedInUsersFactory;
});
