var ns = namespace("dr.acme.controller")

/**
 * controller for Order History Detail
 */
ns.OrderHistoryDetailController = ns.BaseController.extend({
	
	/**
     * init method override from the BaseController
     */	
	init:function(){
		this.model = {};
		this.view = new dr.acme.view.OrderHistoryDetailView();
		this.orderService = dr.acme.service.manager.getOrderService();		
		this._super(this.view);	
	},
    
	/**
     * doIt method override from the BaseController
     */    
	doIt:function(params){
	    console.info("Displaying Order details page (order id: " + params.orderId + ")");
		var that = this;
		var order = that.orderService.getOrder(params.orderId);
		
		this.view.renderLayout();
		this.view.renderLoaders();
		
		$.when(order).done(function(data) {	    
		    that.view.renderOrderInfo(data);              
		});
	} 
});
