var ns = namespace('dr.api');

// IE FIX
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };

/**
 * Main library object to be instanced at the App
 * 
 * @param data
 * @param callback
 * @returns {Client}
 */
ns.Client = ns.AsyncRequester.extend({
    init: function (key, options){  
        // Default options (may be overriden by the user)
        this.options = {
            env: "prod",
            // Auth configuration
            authElementId: "",
            authRedirectUrl: dr.api.config.DEFAULT_REDIRECT_URI,
            authMode: dr.api.authMode.IFRAME
        };
        this.options = merge(this.options, options);
        this.setEnvironment(this.options.env);
        this.session = new dr.api.connection.Session(key, this.createAuthConfig(key, this.options));
    
        this.cart  = new dr.api.service.CartService(this);
        this.categories = new dr.api.service.CategoryService(this);
        this.products = new dr.api.service.ProductService(this);
        this.offers = new dr.api.service.OfferService(this);
        this.productOffers = new dr.api.service.ProductOfferService(this);
        this.shopper = new dr.api.service.ShopperService(this);
        this.orders = new dr.api.service.OrderService(this);
        
        this._super(this.session);
    },
    /**
     * Set Production or Development Environment (Change BASE_URL)
     */
    setEnvironment: function(env){
    	if(env == 'dev'){
    		dr.api.connection.URI.BASE_URL = dr.api.connection.URI.DEV_BASE_URL;
    	}else{
    		dr.api.connection.URI.BASE_URL = dr.api.connection.URI.PRD_BASE_URL;
    	}
    },
    /**
     * Creates the Auth config using the general config
     */
    createAuthConfig: function(clientId, options) {
        return {
                elementId: options.authElementId, 
                authRedirectUrl: options.authRedirectUrl, 
                strategy: options.authMode,
                client_id: clientId
               }
    },
    /**
     * Creates a new anonymous session by connecting to DR Service
     */    
    connect: function(callback) {
        return this.makeRequest(this.session.anonymousLogin(), callback);
    },
    /**
     * Triggers an OAuth flow to authenticate the user
     */    
    login: function(callback, onViewLoadedCallback){
        return this.makeRequest(this.session.authenticate(onViewLoadedCallback), callback);
    },
    /**
     * Ends the user session and starts an anonymous one.
     * Only useful when the user is authenticated (NOT anonymous).
     */    
    logout: function(callback){
        return this.makeRequest(this.session.logout(), callback);
    },
    /**
     * Disconnects from the DR Service. Reconnection will be required to continue using the API
     */    
    disconnect: function(callback){
        return this.makeRequest(this.session.disconnect(), callback);
    },
    checkConnection: function(callback){
		var defer = Q.defer();
    	
    	this.cart.get({"fields": "id"}, function(data){
    		callback();
    	});
    	return defer.promise;
    },
    /**
     * Retrieves the current session information
     */
    getSessionInfo: function() {
        return { 
            connected: this.session.connected,
            authenticated: this.session.authenticated,
            token: this.session.token,
            tokenExpirationTime : this.session.tokenExpirationTime
        };
    }    
    
});

