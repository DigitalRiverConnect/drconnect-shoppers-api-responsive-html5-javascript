var ns = namespace('dr.acme.service');

/**
 * Service Manager for Order Resource
 */
ns.OrderService = Class.extend({
	
	init: function(client) {
	    this.client = client;
    	this.resetOrders();
	},
	
	/**
	 * Clears all User (Shopper) related data
	 */
	resetOrders: function() {
		console.debug("Invalidating cached orders");
        this.orders = null;
	},
	
	/**
     * return orders by current user
     */
	getListOrders: function(params) {
        if(this.orders) {
            return this.orders; 
        }
        var defer = new $.Deferred();        
        var that = this;
        that.client.orders.list({pageSize: 8, pageNumber: 1, "expand": "all"}, function(data) {
             that.orders = data;
             defer.resolve(data);
        });
        return defer.promise();	    
	},

	/**
     * return an specific order with details
     * Cache not implemented for this service
     */	
	getOrder: function(orderId) {        
        var defer = new $.Deferred();        
        var that = this;
        that.client.orders.get(orderId, {"expand": "shippingAddress, billingAddress"}, function(data) {
             defer.resolve(data);
        });
        return defer.promise();	    
	}
});	