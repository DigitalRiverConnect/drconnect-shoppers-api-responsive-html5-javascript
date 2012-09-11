define(['Config'], function(Config) {
    /**
     * IFrame auth view.
     * Opens an IFrame inside the specified DOM Element (using the parent size).
     * Visually, it looks like the login form is part of the application
     * 
     */
    var EditAccountIFrameView = function(uri, redirectUri, options) {
        this.uri = uri + "?redirect_uri=" + encodeURIComponent(redirectUri);
        this.id = Config.config.EDIT_ACCOUNT_FRAME_ID;
        this.parentElementId = options.elementId;
    }
    
    /**
     * Opens the IFrame
     */
    EditAccountIFrameView.prototype.open = function(reqToken, onViewLoadedCallback) {
        var iframe = document.getElementById(this.id);
        if(!iframe) {
            iframe = this.create();
        } 
        
        var finalUri = this.uri + "&token=" + reqToken; 
        iframe.onload = function() {
            if(this.src == finalUri) {
                if(onViewLoadedCallback) {
                    onViewLoadedCallback();
                }
            }
        }
        iframe.src = finalUri;
    }
    
    /**
     * Removes the IFrame when finished
     */
    EditAccountIFrameView.prototype.close = function() {
        console.log("Closing Edit Account IFrame");
        var iframe = document.getElementById(this.id);
        
        if(iframe) {
            iframe.parentNode.removeChild(iframe);
        }
    }
    
    /**
     * Creates a new IFrame with the correct properties
     */
    EditAccountIFrameView.prototype.create = function() {
        var iframe = document.createElement("iframe");
        iframe.id = this.id;   
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.margin="auto";
        iframe.style.border="none";
        iframe.scrolling = "auto";
        
        var parent = (this.parentElementId != "")? document.getElementById(this.parentElementId) : document.body; 
        parent.appendChild(iframe);
        
        return iframe;
    }
    
    return EditAccountIFrameView;
});