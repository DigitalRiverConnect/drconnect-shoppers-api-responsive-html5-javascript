var ns = namespace('dr.api.view');

/**
 * Window auth view.
 * It opens a new window or tab with the login form and closes it when finished 
 * 
 */
ns.AuthWindowView = function(uri, redirectUri, options) {
    this.uri = buildUriFromOptions(uri, redirectUri, options);
    this.id = dr.api.config.AUTH_FRAME_ID;
}

/**
 * Opens the new window/tab with the login form
 */
ns.AuthWindowView.prototype.open = function(reqToken, onViewLoadedCallback) {
    if(this.popup) {
        this.close();
    }
    
    var finalUri = getUriWithToken(this.uri, reqToken);
    this.popup = window.open(finalUri, this.id);
    
    this.popup.focus();  
}

/**
 * Closes the login form window
 */
ns.AuthWindowView.prototype.close = function() {
    console.log("Closing Auth popup");
    if(this.popup) {
        this.popup.close();
        this.popup = null;
    }
}
