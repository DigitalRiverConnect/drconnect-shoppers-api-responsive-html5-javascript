var ns = namespace('dr.acme.service');

/**
 * Service Manager for Cart Resource
 */
ns.ShoppingCartService = Class.extend({
	
	init: function(client) {
    	this.client = client;
		this.cart = null;
		this.shippingOptions = null;
		this.candyRackProducts = null;
	},
	invalidateCache: function() {
	    console.debug("Invalidating cached cart");
	    this.cart = null;
	    this.shippingOptions = null;
	    this.candyRackProducts = null;
	},
	/**
     * Gets the Cart
     * @returns Cart
     */
	get: function() {
	    if(this.cart) {
            console.debug("Using cached version of the cart");
            return this.cart;
        }
        var self = this;
	    console.debug("Calling DR getCart service");
		var defer = new $.Deferred();
		
		// Used to get the product Id in the line-item so we can link back to the product page
		var params = {expand: "lineItems.lineItem.product.id"};
		
    	this.client.cart.get(params, function(data) {
    	       self.cart = data;             
			   defer.resolve(data);
            });
		return defer.promise();	
	},
	
	/**
     * Adds a Product to the Cart
     * @param product product to be added
     * @param qty quantity of product to be added
     * @param addToCartUri Uri to call the service and add the product to the cart. If not null, the service uses this
     * parameter to add the product, otherwise it uses @product
     * @returns 
     */
    addProductToCart: function (product, qty, addToCartUri){
            this.invalidateCache();
            console.debug("Calling DR addProductToCart service");                          
            var defer = new $.Deferred();            
             this.client.cart.addLineItem(product, addToCartUri, {quantity:qty}, function(data) {
                console.info("Product '" + product.displayName + "' (qty:" + qty + ") added to cart");
                defer.resolve(data);
            });       
            return defer.promise();
    },
    
    /**
     * Removes a Product from the Cart
     * @param lineItem to be removed
     * @returns Cart
     */ 
    removeProductFromCart: function (lineItem){ 
        var self = this;               
        console.debug("Calling DR removeFrom service");  
        var defer = new $.Deferred();            
        this.client.cart.removeLineItem(lineItem, {}, function(data) {
            // Invalidate cached cart after submitting it
            self.invalidateCache();        	
        	console.info("Removed line item");
            defer.resolve();
        });       
        return defer.promise();
	},
	
	/**
	 * Gets the shipping options available to the cart
	 * @returns shippingOptions
	 */
	getShippingOptions: function(params){
		 if(this.shippingOptions) {
            console.debug("Using cached shippingOptions");
            return this.shippingOptions;
        }
        var self = this;
	    console.debug("Calling DR getShippingOptions service");
		var defer = new $.Deferred();
	
    	this.client.cart.getShippingOptions(params, function(data) {
    	       self.shippingOptions = data;             
			   defer.resolve(data);
            });
		return defer.promise();
	},
	
	/**
	 * Gets the CandyRack Products for the cart
	 * @returns candyRackProducts
	 */
	getCandyRackProducts: function(params){
		if(this.candyRackProducts) {
            console.debug("Using cached version of the CandyRack");
            return this.candyRackProducts;
        }
        var popName = dr.acme.application.config.candyRack.pop;
        
        var self = this;
	    console.debug("Calling DR getOffersForCart");
		var defer = new $.Deferred();
	
    	this.client.cart.getOffers(popName,{"expand": "all"}, {success: function(data) {
    		if(typeof data.offer != 'undefined'){
    			var offerId = data.offer[0].id;
    	        self.client.productOffers.list(popName, offerId, {"expand": "all"}, function(data) {
             		self.candyRackProducts = data;
             		defer.resolve(data);
        		});
    		}else{
    			defer.resolve(data);
    		}
        }, error: function(data){
        	defer.reject(data);
        }, callDefaultErrorHandler: true});     
        return defer.promise();
	},
	
	/**
	 * Applies Shipping Options to the cart
	 * @returns
	 */
	applyShippingOption: function(params){
		console.debug("Calling DR applyShippingOption service");  
        var defer = new $.Deferred();
        
        var that = this;
        this.client.cart.applyShippingOption(params, function(data) {
             that.cart = data;
             console.info("Shipping Option applied to Cart");
             defer.resolve(data);
        });
        return defer.promise();	   
	},
	
	/**
     * Apply Billing and Shipping Addresses to the Cart
     * @param shippingAddressId Id of the shipping address to be applied
     * @param billingAddressId Id of the billing address to be applied
     * @param payementOptionId Id of the payment option to be applied
     * @returns Cart
     */
	applyShopper: function(shippingAddressId, billingAddressId, paymentOptionId) {
		console.debug("Calling DR applyShopper service");  
        var defer = new $.Deferred();
        
        var that = this;
        var params = {}
        
        params.expand = "all";
        if(shippingAddressId) params.shippingAddressId = shippingAddressId;
        if(billingAddressId) params.billingAddressId = billingAddressId;
        if(paymentOptionId) params.paymentOptionId = paymentOptionId;
        
        this.client.cart.applyShopper(params, {success: function(data) {
             that.cart = data;
             console.info("Billing and Shipping Addresses applied to Cart");
             defer.resolve(data);
        }, error: function(data) {
        	defer.reject(data);
        }, callDefaultErrorHandler: true});
        return defer.promise();	    
	},
	
	/**
     * Submits the Cart
     * @returns Cart
     */
	submit: function(params) {
		console.debug("Calling DR submitCart service"); 
        var defer = new $.Deferred();
        
        var that = this;
        this.client.cart.submit({"cartId": "active", "includeTestOrders": "true"}, function(data) {
             // Invalidate cached cart after submitting it
             that.invalidateCache();
             console.info("Cart Submitted Successfully");
             defer.resolve(data);
        });
        return defer.promise();	    
	}
   
});
	
