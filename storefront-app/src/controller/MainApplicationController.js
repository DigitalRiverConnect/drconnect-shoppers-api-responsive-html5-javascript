var ns = namespace("dr.acme.controller")

/**
 * Main Application Controller
 *
 * Manages the application-wide elements: main layout (header, footer) and message dialogs 
 */
ns.MainApplicationController = ns.BaseController.extend({
	
	/**
     * init method override from the BaseController
     */
    init:function (){
        this._super(new dr.acme.view.MainLayoutView());
        this.blocked = false; 
    },

	/**
     * initEventHandlers method override from the BaseController
     */	    
    initEventHandlers: function() {     
    },
    
	/**
     * doIt method override from the BaseController
     */	     
    doIt:function(){
        console.info("Displaying Application");
        this.view.render();
    },
    
    /**
     * Notifies its view that the authentication mode has changed
     */
    authenticationModeChanged: function(isAuthenticated) {
        if(isAuthenticated) {
            this.view.switchToAuthenticatedMode();
        } else {
            this.view.switchToAnonymousMode();
        }
    },
    
    /**
     * Handles the page change notification
     */
    pageChanged: function(params) {
        this.view.pageChanged(params.path);
    },

	/**
     * blockApp method override from the BaseController
     */	    
    blockApp: function(message) {
    	// If UI is already blocked, do nothing
        if(this.blocked) return;
        
        console.debug("Blocking UI");
        if(!message) message = "Please wait...";
        $.blockUI(
			{ message: '<div><img src="img/loading.gif" /></div><h1> ' + message + '</h1>' 
			  
			 }
			);
        this.blocked = true;
    },
    
	/**
     * unblockApp method override from the BaseController
     */	      
    unblockApp: function() {
        console.debug("Unblocking UI");
        $.unblockUI();
        this.blocked = false;
    },
    
    /**
     * Sets the server error and redirect to the Server Error Page to show the message 
     */
    setServerError: function (error) {
      this.serverError = error;
      this.navigateTo(dr.acme.runtime.URI.SERVER_ERROR);
    },
    
    /**
     * Shows the Server Error Page
     */
    showServerError: function(){
		var errorView = new dr.acme.view.ServerErrorView();
		if(!this.serverError){
			this.serverError = {"status": 500, "code": "A problem ocurred", "description": "There was a problem with the connection, please try again later"};
		}
		errorView.render(this.serverError);
    }
    
    
});
