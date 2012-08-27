var ns = namespace('dr.api.auth');

/**
 * This class handles Authentication/Authorization by opening a auth view (new window/tab or iframe)
 * 
 */
ns.AuthManager = function(authUri, options) {
    this.redirectUri = options.authRedirectUrl;
    this.uri = authUri;
    
    this.views = {
        "IFRAME": dr.api.view.AuthIFrameView,
        "WINDOW": dr.api.view.AuthWindowView
    };
    
    this.view = this.createView(options.strategy, options);
}

/**
 * Creates the appropiate view according to the configuration
 */
ns.AuthManager.prototype.createView = function(strategy, options) {
    return new this.views[strategy](this.uri, this.redirectUri, options);
}

/**
 * Initializes the login process
 * @param reqToken Anonymous token identifying the current session 
 * @returns Promise to handle a successful auth
 */
ns.AuthManager.prototype.login = function(reqToken, onViewLoadedCallback) {
    var defer = Q.defer();
    dr.api.auth.currentRequest = {"defer": defer, "view": this.view};
    this.view.open(reqToken, onViewLoadedCallback);
    return defer.promise;
}

/**
 * Callback used by the view (iframe or window) to notify the library when it finished
 */
ns.authCallback = function(token, expiresIn, error, error_description) {
    var req = dr.api.auth.currentRequest;
    if(req) {
        req.view.close();
        req.view = null;        
        dr.api.auth.currentRequest = null;
        window.focus();
        if(!error){
        	var response = {"token": token, "expires_in": expiresIn};
    		req.defer.resolve(response);
        }
        else{
        	var errorResponse = {"error": error, "error_description": error_description}
        	req.defer.reject(errorResponse);
        }
    }
}

ns.getError = function(error) {
	switch (error) {
		case "invalid_request":
			return {"error": error, "error_description": "Invalid Request. Please check the parameters."};
			break;
		
	}
}

