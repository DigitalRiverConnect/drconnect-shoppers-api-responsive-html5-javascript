define([
    'Config', 'q', 'Util', 'connection/Session', 
    'service/CartService', 'service/CategoryService', 
    'service/ProductService', 'service/OfferService', 
    'service/ProductOfferService', 'service/ShopperService',
    'service/OrderService', 'AsyncRequester'
], 
function(Config, Q, Util, Session, CartService, CategoryService, ProductService, OfferService, ProductOfferService, ShopperService, OrderService, AsyncRequester) {

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
    var Client = AsyncRequester.extend({
        init: function (key, options){  
            // Default options (may be overriden by the user)
            this.options = {
                env: "prod",
                // Auth configuration
                authElementId: "",
                authRedirectUrl: Config.config.DEFAULT_REDIRECT_URI,
                authMode: Config.authMode.IFRAME
            };
            this.options = Util.merge(this.options, options);
            this.setEnvironment(this.options.env);
            this.session = new Session(key, this.createAuthConfig(key, this.options));
        
            this.cart  = new CartService(this);
            this.categories = new CategoryService(this);
            this.products = new ProductService(this);
            this.offers = new OfferService(this);
            this.productOffers = new ProductOfferService(this);
            this.shopper = new ShopperService(this);
            this.orders = new OrderService(this);
            
            this._super(this.session);
        },
        /**
         * Set Production or Development Environment (Change BASE_URL)
         */
        setEnvironment: function(env){
            if(env == 'dev'){
                Config.connection.URI.BASE_URL = Config.connection.URI.DEV_BASE_URL;
            }else if(env == 'cte'){
            	Config.connection.URI.BASE_URL = Config.connection.URI.CTE_BASE_URL;
            }else if(env == 'dis'){
            	Config.connection.URI.BASE_URL = Config.connection.URI.DIS_BASE_URL;
            }else if(env == 'dte'){
            	Config.connection.URI.BASE_URL = Config.connection.URI.DTE_BASE_URL;
            }
            else{
                Config.connection.URI.BASE_URL = Config.connection.URI.PRD_BASE_URL;
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
         * Refreshes the current access_token
         */
        forceRefreshToken: function(callback) {
            return this.makeRequest(this.session.forceRefreshToken(), callback);
        },
        
        /**
         * Resets the session getting a new access_token
         */
        forceResetSession: function(callback) {
            return this.makeRequest(this.session.forceResetSession(), callback);
        },
        /**
         * Triggers an OAuth flow to authenticate the user
         */    
        login: function(onViewLoadedCallback, callback){
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
                clientId: this.session.apikey, 
                connected: this.session.connected,
                authenticated: this.session.authenticated,
                token: this.session.token,
                refreshToken: this.session.refreshToken,
                tokenExpirationTime : this.session.tokenExpirationTime
            };
        },
        
        /**
         * Sets the session info (usefull when an application activates after suspention)
         * Sets the token and other session variables
         */ 
         setSessionInfo: function(sessionInfo){
         	this.session.setSessionInfo(sessionInfo);
         }   
        
    });
    return Client;
});
