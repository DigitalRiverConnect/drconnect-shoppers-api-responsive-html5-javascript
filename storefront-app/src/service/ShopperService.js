var ns = namespace('dr.acme.service');

/**
 * Service Manager for Shopper Resource
 */
ns.ShopperService = Class.extend({
	
	init: function(client) {
	    this.client = client;
	    this.resetUserData();
	},
	
	/**
	 * Returns whether the user is authenticated or anonymous.
	 */
	isAuthenticated: function() {
	    return this.authenticated;
	},
	
	/**
	 * Clears all User (Shopper) related data
	 */
	resetUserData: function() {
	    this.authenticated = false;
	    this.shopper = null;
        this.resetPersonalInformation();
	},
	
	/**
	 * Resets Personal Info cache after editing it
	 */
	resetPersonalInformation: function(){
		this.addresses = null;
        this.paymentOptions = null;	
	},
	/**
	 * Triggers the login process
	 */
	login: function() {
	    var defer = new $.Deferred();
	    if(this.isAuthenticated()) {
	        console.warn("User is already authenticated. This method should not be called");
	        return true;
	    }
	    console.info("Triggering login flow");
	    var self = this;
	    this.client.login( 
	        function() {
                console.info("DR-Hosted Login form loaded");
                defer.notify();
            }, 
            {
                success:
                    function(data) {
    	               console.info("User authenticated!");
    	               self.authenticated = true;
    	               defer.resolve();
    	            }, 
	            error:
    	            function(data){
                        console.info("User NOT authenticated!");
    	    	        defer.reject(data);
    	            }
            });
	    return defer.promise();
	},
	
	/**
	 * Logs out the user
	 */
	logout: function() {
	    var defer = new $.Deferred();
	    var self = this;
	    this.client.logout(function() {
	        self.resetUserData();
	        defer.resolve();
	    });
	    return defer.promise();
	},
	
	/**
	 * Edit Shopper Account
	 */
	edit: function(parentId) {
	    console.info("Triggering edit account flow");
	    var defer = new $.Deferred();
	    var self = this;
	    var options = {};
	    options.redirectUri = dr.acme.runtime.URI.ROOT;
	    options.elementId = parentId;
	    this.client.shopper.editAccount(options, function() {
	        self.resetPersonalInformation();
	        defer.resolve();
	    }
	      ,function() {
			console.info("DR-Hosted Login form loaded");
			defer.notify();
	    });
	    return defer.promise();
	},
		
	/**
     * returns the Shopper from the api library
     */
	getShopper: function(params) {
        if(this.shopper) {
            return this.shopper; 
        }
        var defer = new $.Deferred();        
        var that = this;
        this.client.shopper.get({}, function(data) {
             that.shopper = data;
             defer.resolve(data);
        });
        return defer.promise();	    
	},
	
	/**
     * returns the Shopper Addresses from the api library
     */	
	getAddresses:function(){
		 if(this.addresses) {
	            return this.addresses; 
	        }
	        var defer = new $.Deferred();        
	        var that = this;
	        that.client.shopper.getAddresses({"expand": "all"}, function(data) {
	             that.addresses = data;
	             defer.resolve(data);
	        });
	        return defer.promise();	    
	},
	
	/**
	 * Gets the payment options for the shopper
	 */
	getPaymentOptions: function(){
		if(this.paymentOptions) {
            return this.paymentOptions; 
        }
        var defer = new $.Deferred();        
        var that = this;
        that.client.shopper.getPaymentOptions({"expand": "all"}, function(data) {
             that.paymentOptions = data;
             defer.resolve(data);
        });
        return defer.promise();
	},
	
	/**
	 * Checks if connection is still alive or the token has expired
	 */
	checkConnection:function() {
		var defer = new $.Deferred();
		this.client.checkConnection(function() {
			defer.resolve();
		});
		return defer.promise();
	}
});