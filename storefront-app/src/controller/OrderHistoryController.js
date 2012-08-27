var ns = namespace("dr.acme.controller")

/**
 * controller for Order History 
 */
ns.OrderHistoryController = ns.BaseController.extend({
	
	/**
     * init method override from the BaseController
     */		
	init:function(){
		this.model = {};
		this.view = new dr.acme.view.OrderHistoryView();
		this.orderService = dr.acme.service.manager.getOrderService();		
		this._super(this.view);	
	},

	/**
     * doIt method override from the BaseController
     */		
	doIt:function(params){
	    console.info("Displaying Order history page");
		var that = this;
		var orders = that.orderService.getListOrders();
		
		this.view.renderLayout();
	    this.view.render();

		$.when(orders).done(function(data) {
		    that.model.orders = data;
            that.view.setOrders(that.model.orders);            
            that.view.render();  
		});
	},
	 	
	/**
	 * Clears the Orders data
	 */
	clearOrders: function() {
	    this.model.orders = null;
	    this.orderService.resetOrders();
	}
});
