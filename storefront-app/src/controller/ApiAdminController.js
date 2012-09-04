var ns = namespace("dr.acme.controller")

/**
 * Product Controller manager
 * 
 * This Controller will link the views with the managers required
 * It overrides functions inherits from the BaseController, to initialize (init)
 * and exectute (doIt) the main purpose of this manager.   
 */
ns.ApiAdminController = ns.BaseController.extend({
	
	/**
     * init method override from the BaseController
     */	
	init:function(){
		this.model = {};
		this.view = new dr.acme.view.ApiAdminView();
		this.client = dr.acme.service.manager.client;		
		this._super(this.view);	
	},

	/**
     * initEventHandlers method override from the BaseController
     */		
	initEventHandlers: function() {
        this.view.addEventHandler(this.view.events.REFRESH_TOKEN, this, this.onRefreshToken);
        this.view.addEventHandler(this.view.events.RESET_SESSION, this, this.onRestartSession);
    },
    /**
     * Handles the Refresh token button click
     */
    onRefreshToken: function(e) {
    	this.client.forceRefreshToken(function(){
			dr.acme.application.getDispatcher().refreshPage();
    	});
    },
    /**
     * Handles the Restart Session button click
     */
    onRestartSession: function(e) {
    	var self = this;
    	this.client.forceResetSession(function(){
			self.notify(dr.acme.runtime.NOTIFICATION.USER_LOGGED_OUT);
			// Resets the userData to simulate the the user has logged out
			dr.acme.service.manager.getShopperService().resetUserData();
			dr.acme.application.getDispatcher().refreshPage();
    	});
    },
	/**
     * doIt method override from the BaseController
     */       
	doIt:function(params){
	    console.info("Displaying Api Administration page" );
		var that = this;
		
		this.view.setSessionInfo(this.client.getSessionInfo());
	    this.view.render();
	} 
});
