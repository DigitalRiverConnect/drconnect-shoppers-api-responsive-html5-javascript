define(['view/AuthViewUtil', 'Config'], function(Util, Config) {
    /**
     * Window auth view.
     * It opens a new window or tab with the login form and closes it when finished 
     * 
     */
    var AuthWindowView = function(uri, redirectUri, options) {
        this.uri = Util.buildUriFromOptions(uri, redirectUri, options);
        this.id = Config.config.AUTH_FRAME_ID;
    }
    
    /**
     * Opens the new window/tab with the login form
     */
    AuthWindowView.prototype.open = function(reqToken, onViewLoadedCallback) {
        if(this.popup) {
            this.close();
        }
        
        var finalUri = Util.getUriWithToken(this.uri, reqToken);
        this.popup = window.open(finalUri, this.id);
        
        this.popup.focus();  
    }
    
    /**
     * Closes the login form window
     */
    AuthWindowView.prototype.close = function() {
        console.log("Closing Auth popup");
        if(this.popup) {
            this.popup.close();
            this.popup = null;
        }
    }
    
    return AuthWindowView;
});