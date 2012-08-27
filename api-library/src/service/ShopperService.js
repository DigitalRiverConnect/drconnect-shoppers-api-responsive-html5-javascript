var ns = namespace('dr.api.service');
/**
 * Service Manager for Shopper Resource
 */
ns.ShopperService = ns.BaseService.extend({
    
    uri: ns.URI.SHOPPER,
	
    /**
     * get Shopper 
     */
    get: function(parameters, callbacks) {
        return this.makeRequest(this.session.retrieve(this.uri, parameters), callbacks);
    },    

    /**
     * get Shopper Addresses
     */
    getAddresses:function(parameters, callbacks){
    	var uri = dr.api.service.URI.ADDRESS;    	
        return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
    },
    
    /**
     * Gets the payment options for the shopper
     */
    getPaymentOptions: function(parameters, callbacks){
    	var uri = dr.api.service.URI.SHOPPER_PAYMENT_OPTION; 
		return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
    },
    
    /**
     * Edit shopper account
     */
    editAccount: function(options, callbacks, editViewLoadedCallback){
    	
    	var uri = dr.api.connection.URI.BASE_URL + dr.api.connection.URI.VERSION + "/" + dr.api.service.URI.SHOPPER_ACCOUNT; 
    	var defer = Q.defer();
		var redirectUri = dr.api.config.EDIT_ACCOUNT_REDIRECT_URI;

    	this.view =  new dr.api.view.EditAccountIFrameView(uri, redirectUri, options);
    	dr.api.service.currentRequest = {"defer": defer, "view": this.view};
    	
    	this.view.open(this.session.token, editViewLoadedCallback);

		return this.makeRequest(defer.promise, callbacks);
    }
        
});

/**
 * Callback used by the view (iframe or window) to notify the library when it finished
 */
ns.editCallback= function() {
    var req = dr.api.service.currentRequest;
    if(req) {
        req.view.close();
        req.view = null;        
        dr.api.auth.currentRequest = null;
        window.focus();
        req.defer.resolve();
    }
}