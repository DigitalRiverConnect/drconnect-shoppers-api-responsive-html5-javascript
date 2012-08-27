var ns = namespace('dr.api.view');

/**
 * IFrame auth view.
 * Opens an IFrame inside the specified DOM Element (using the parent size).
 * Visually, it looks like the login form is part of the application
 * 
 */
ns.AuthIFrameView = function(uri, redirectUri, options) {
    this.uri = buildUriFromOptions(uri, redirectUri, options);
    this.id = dr.api.config.AUTH_FRAME_ID;
    this.parentElementId = options.elementId;
}

/**
 * Opens the IFrame
 */
ns.AuthIFrameView.prototype.open = function(reqToken, onViewLoadedCallback) {
    var authFrame = document.getElementById(this.id);
    if(!authFrame) {
        authFrame = this.create();
    } 
    
    var finalUri = getUriWithToken(this.uri, reqToken); 
    authFrame.onload = function() {
        if(this.src == finalUri) {
            onViewLoadedCallback();
        }
    }
    authFrame.src = finalUri;
}

/**
 * Removes the IFrame when finished
 */
ns.AuthIFrameView.prototype.close = function() {
    console.log("Closing Auth IFrame");
    var iframe = document.getElementById(this.id);
    
    if(iframe) {
        iframe.parentNode.removeChild(iframe);
    }
}

/**
 * Creates a new IFrame with the correct properties
 */
ns.AuthIFrameView.prototype.create = function() {
    var authFrame = document.createElement("iframe");
    authFrame.id = this.id;   
    authFrame.width = "100%";
    authFrame.height = "100%";
    authFrame.style.margin="auto";
    authFrame.style.border="none";
    authFrame.scrolling = "auto";
    
    var parent = (this.parentElementId != "")? document.getElementById(this.parentElementId) : document.body; 
    parent.appendChild(authFrame);
    
    return authFrame;
}

ns.AuthIFrameView.prototype.AddOnLoadedHandler = function() {
    authFrame
}
