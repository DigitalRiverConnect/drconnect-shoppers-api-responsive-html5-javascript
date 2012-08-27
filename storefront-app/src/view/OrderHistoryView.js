var ns = namespace('dr.acme.view');

/**
 * Order History View
 * 
 * Will render the model in different ways depending on the function
 * called. They replace the html template in the layout specified
 * with the provided model
 * 
 */
ns.OrderHistoryView =  ns.BaseView.extend({
    /**
     * Name of the root element for this view
     */
    elementSelector: "#contentArea",
    layoutTemplate: "#orderHistoryTemplate",
    /**
     * Events this view dispatches
     */
    events: {
        //This view doesn't have notifications
    },
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {
        //This view doesn't have notifications
    },
    /**
     * Get the orders
     */
    getOrders: function() {
        if(this.modelIsDefined()) {
            return this.model;
        } else {
            return null;
        }
    },
	/**
	 * Render loader or the actual orders for current shopper
	 */
	render: function() {
	    if(!this.getOrders()) {
	        this.showLoaderOnComponent(".content", "Loading Orders...");
	    } else {
	    	if(this.getOrders().totalResults == "0"){
	    		this.applyTemplate(".content", "#orderHistoryEmpty", {});
	    	}else{
	    		this.applyTemplate(".content", "#orderHistory_widget", {orders: this.getOrders()});    
	    		
	    	}
	    } 
	},
	/**
	 * Orders detail rendering
	 */
	setOrders: function(model) {
	    this.model = model;
	}
});