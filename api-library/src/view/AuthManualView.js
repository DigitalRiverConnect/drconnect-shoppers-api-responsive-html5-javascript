define(['view/AuthViewUtil', 'Config'], function(Util, Config) {
    /**
     * IFrame manual view.
     * Empty view used when the client app handles the UI portion of the logic process
     * It will call a callback with the required info to perform the login
     * 
     * The client app should call the client.login() method with a onDataReadyCallback callback, that callback will include this manual view
     * The process can be performed using the view's .uri attribute and the setResults(token, expires_in) 
     * or setError(error, error_description) methods 
     */
    var AuthManualView = function(uri, redirectUri, options) {
        this.uriWithoutToken = Util.buildUriFromOptions(uri, redirectUri, options);
    }
    
    /**
     * Calls the passed callback with this "view" as parameter
     */
    AuthManualView.prototype.open = function(reqToken, onDataReadyCallback) {
    	var finalUri = Util.getUriWithToken(this.uriWithoutToken, reqToken); 
    	this.uri = finalUri;
        if(onDataReadyCallback) {
            onDataReadyCallback(this);
        }
    }
    
    /**
     * Does nothing
     */
    AuthManualView.prototype.close = function() {
    }
    
    /**
     * Completes the process with the passed results (collected by the client app)
     */
    AuthManualView.prototype.setResults = function(token, expires_in) {
        dr.api.callbacks.auth(token, expires_in, null, null);
    }
    
    /**
     * Finishes the process with the passed error (collected by the client app)
     */
    AuthManualView.prototype.setError = function(error, error_description) {
        dr.api.callbacks.auth(null, null, error, error_description);
    }
    
    
    return AuthManualView;
});