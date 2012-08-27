var ns = namespace('dr.api.auth');

/**
 * This class handles Authentication/Authorization by opening a auth view (new window/tab or iframe)
 * 
 */
ns.DummyAuthManager = function() {
}

/**
 * Initializes the login process
 * @param reqToken Anonymous token identifying the current session 
 * @returns Promise to handle a successful auth
 */
ns.DummyAuthManager.prototype.login = function(reqToken) {
	var defer = Q.defer();
	defer.resolve("8913914960fa64353e431285da7cd829");
	return defer.promise;
} 