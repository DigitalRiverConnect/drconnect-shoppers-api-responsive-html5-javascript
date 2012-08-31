var ns = namespace("dr.acme.controller");

/**
 * Controller that handles user authentication
 */
ns.UserController = ns.BaseController.extend({
	
	/**
     * init method override from the BaseController
     */		
    init: function(){
        this.model = {};
        this.requestedUrl = null;
        this.shopperService = dr.acme.service.manager.getShopperService();      
        this._super(new dr.acme.view.LoginView()); 
    },
    
    /**
     * Handles login notification
     */
    login: function(requestedUrl) {
        this.requestedUrl = requestedUrl;
        this.navigateTo(dr.acme.runtime.URI.LOGIN);
    },
    
    /**
     * Show login page
     */
    showLogin: function(params) {
        console.info("Displaying Login page");
        
        this.view.renderLayout();
        this.view.render();
		var self = this;
        var tokenExpirationTime = this.shopperService.client.getSessionInfo().tokenExpirationTime;
	    var actualTime = new Date().getTime()/1000;
	    // Compares current with tokenExpirationTime to decide if check connection or not
        if(actualTime < tokenExpirationTime) {
        	this.doLogin();	
        } else {
        	console.info("Checking session before calling login frame");
        	var p = this.shopperService.checkConnection();
        	
        	$.when(p).done(function() {
       			self.doLogin();
        	});
        }
        
    },
    
    doLogin: function() {
    	var self = this;
    	var p = this.shopperService.login();
        
        $.when(p).done(function() {
            self.notify(dr.acme.runtime.NOTIFICATION.USER_LOGGED_IN);
            if(self.requestedUrl) {
                console.info("Login successful, redirecting to " + self.requestedUrl);
                self.navigateTo(self.requestedUrl);
                self.requestedUrl = null;    
            } else {
                console.info("Login successful, redirecting to home");
                self.navigateTo(dr.acme.runtime.URI.ROOT);
            }
            
        }).progress(function() {
            self.view.setFormLoaded(true);
            self.view.render();
        }).fail(function(data){
        	dr.acme.util.DialogManager.showError("Code: " + data.details.error + " , Description: " + data.details.error_description, "Error Ocurred");
        });
    },
    
    /**
     * Logs out the user
     */
    logout: function(params) {
        console.info("Logging out");
        var self = this;
        var p = this.shopperService.logout();
        
        $.when(p).done(function() {
            self.notify(dr.acme.runtime.NOTIFICATION.USER_LOGGED_OUT);
            self.navigateTo(dr.acme.runtime.URI.ROOT);
        });
    },
    
    /**
     * Handles session reset. Two different approaches are taken according to the session status (anonymous/authenticated)
     */
    sessionReset: function(params) {
      
        if(this.shopperService.isAuthenticated()) {
            // If the user was authenticated, reset his data, 
            // send a LOG OUT notification to clear any other data (orders, cart, etc) and
            // show the login page with an error explaining the situation
            this.shopperService.resetUserData();
            this.notify(dr.acme.runtime.NOTIFICATION.USER_LOGGED_OUT);
            var redirectTo;
            // Tries to go to the requestedURL after login
            if(params.url){
            	requestedUrl = params.url;
            }else{
            	requestedUrl = dr.acme.runtime.URI.ROOT;
            }
            this.notify(dr.acme.runtime.NOTIFICATION.SHOW_LOGIN, requestedUrl);
            dr.acme.util.DialogManager.showError("Please login again to continue", "Session Expired");
        } else {
        	if(params.error.details.error.code != 'refresh_token_invalid'){
        		dr.acme.util.DialogManager.showError("Your token has been refreshed.", "Token Refreshed");	
        	}else{
        		this.notify(dr.acme.runtime.NOTIFICATION.USER_LOGGED_OUT);
        		dr.acme.util.DialogManager.showError("Your token has expired. A new session was started.", "Session Expired");
        	}
        }
    }
});