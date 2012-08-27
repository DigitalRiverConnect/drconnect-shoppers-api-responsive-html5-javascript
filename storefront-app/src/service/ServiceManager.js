var ns = namespace('dr.acme.service');

/**
 * Main Service Manager
 * 
 * will provide the instance of each resource service required
 */
ns.ServiceManager = Class.extend({
    init: function(isDummy, env) {
        var ns = namespace('dr.acme.service');
        this.client = new dr.api.Client("604df5ac990fbc67dab8fc098af271e6", this.getApiConfig(isDummy, env));
        this.productService = new ns.ProductService(this.client);
        this.offerService = new ns.ProductService(this.client);
        this.categoryService = new ns.CategoryService(this.client);
        this.shoppingCartService= new ns.ShoppingCartService(this.client);
        this.shopperService= new ns.ShopperService(this.client);
        this.orderService= new ns.OrderService(this.client);
    },
    getApiConfig: function(isDummy, env) {
        return {
            authElementId: "loginFormDiv",
            error: this.errorHandler, 
            isDummy: isDummy,
            env : env
        };
    },
    initialize: function() {
        var defer = new $.Deferred();
        this.client.connect(function() {
           defer.resolve(); 
        });
        return defer.promise();
    },
    getProductService: function() {
        return this.productService;
    },
    getOfferService: function() {
        return this.offerService;
    },
    getCategoryService: function() {
        return this.categoryService;
    },
    getShoppingCartService: function() {
        return this.shoppingCartService;
    },    
    getShopperService: function() {
        return this.shopperService;
    },
    getOrderService: function() {
        return this.orderService;
    },
    /**
     * Handles errors for DR Service
     */    
    errorHandler: function(response) {
        var code = "";
        var description = "";
        var status = response.status;
        if(response.details.error) {
            code = (response.details.error.code)? response.details.error.code: "";
            description = (response.details.error.description)? response.details.error.description: "";
        } 
        
        console.error("DR API Library Error: (status " + status + ") " + code + " - " + description);

        var manager = dr.acme.service.manager;
        
        // If status = 401, special handling is required
        if(status == 401) {
            manager.sessionExpiredErrorHandler();
        } else {
            manager.genericErrorHandler(status, code, description);
        }
    },
    /**
     * Handles session expired errors
     */
    sessionExpiredErrorHandler: function() {
        console.info("Session Expired, reconnecting...");
        this.initialize().done(function() {
            console.info("Reconnected to DR!");
            var dispatcher = dr.acme.application.getDispatcher();
            dispatcher.handle(dr.acme.runtime.NOTIFICATION.UNBLOCK_APP);
            dispatcher.handle(dr.acme.runtime.NOTIFICATION.SESSION_RESET);
        });
    },
    /**
     * Handles any error but session expiration 
     */
    genericErrorHandler: function(status, code, description) {
        // Show an error notification
        var error = "There was a problem with the connection, please try again later";
        if(description && description != "") error = description;
        
        var dispatcher = dr.acme.application.getDispatcher();
        dispatcher.handle(dr.acme.runtime.NOTIFICATION.UNBLOCK_APP);
        dr.acme.util.DialogManager.showError(error, "A problem ocurred");        
    }
});


