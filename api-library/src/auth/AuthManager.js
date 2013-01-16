define(['q', 'view/AuthWindowView', 'view/AuthIFrameView', 'view/AuthManualView'], function(Q, AuthWindowView, AuthIFrameView, AuthManualView) {
    /**
     * This class handles Authentication/Authorization by opening a auth view (new window/tab or iframe)
     * 
     */
    var AuthManager = function(authUri, options) {
        this.redirectUri = options.authRedirectUrl;
        this.uri = authUri;
        
        this.views = {
            "IFRAME": AuthIFrameView,
            "WINDOW": AuthWindowView,
            "MANUAL": AuthManualView
        };
        
        this.view = this.createView(options.strategy, options);
    }
    
    /**
     * Creates the appropiate view according to the configuration
     */
    AuthManager.prototype.createView = function(strategy, options) {
        return new this.views[strategy](this.uri, this.redirectUri, options);
    }
    
    /**
     * Initializes the login process
     * @param reqToken Anonymous token identifying the current session 
     * @returns Promise to handle a successful auth
     */
    AuthManager.prototype.login = function(reqToken, onViewLoadedCallback) {
        var defer = Q.defer();
        AuthManager.currentRequest = {"defer": defer, "view": this.view};
        this.view.open(reqToken, onViewLoadedCallback);
        return defer.promise;
    }
    
    /**
     * Callback used by the view (iframe or window) to notify the library when it finished
     */
    AuthManager.authCallback = function(token, expiresIn, code, error, error_description) {
        var req = AuthManager.currentRequest;
        if(req) {
            req.view.close();
            req.view = null;        
            AuthManager.currentRequest = null;
            window.focus();
            if(!error){
            	var response
            	if(token === "" && code != ""){ 
                	response = {"code": code};
                }else{
                	response = {"token": token, "expires_in": expiresIn};
                }
                req.defer.resolve(response);
            }
            else{
                var errorResponse = {"error": error, "error_description": error_description}
                req.defer.reject(errorResponse);
            }
        }
    }
    
    AuthManager.getError = function(error) {
        switch (error) {
            case "invalid_request":
                return {"error": error, "error_description": "Invalid Request. Please check the parameters."};
                break;
            
        }
    }

    return AuthManager;
});