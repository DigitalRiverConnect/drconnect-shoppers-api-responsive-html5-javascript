var ns = namespace('dr.acme.view')

/**
 * Checkout Summary View
 * 
 * Will render the model in different ways depending on the function
 * called. They replace the html template in the layout specified
 * with the provided model
 * 
 */
ns.CheckoutSummaryView = ns.BaseView.extend({
	
 	/**
     * Name of the root element for this view
     */
    elementSelector: "#contentArea",
    layoutTemplate: "#checkoutSummaryLayoutTemplate",
	
    /**
     * Events this view dispatches
     */
    events: {
        SUBMIT_CART: dr.acme.runtime.NOTIFICATION.SUBMIT_CART,
    	SHIPPING_METHOD_CHANGE: dr.acme.runtime.NOTIFICATION.SHIPPING_METHOD_CHANGE,
        EDIT_CHECKOUT_OPTION: dr.acme.runtime.NOTIFICATION.EDIT_CHECKOUT_OPTION
    },
    
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {
    	this.addDomHandler("#shippingMethodDropDown", "change", this.onShippingOptionChange);
        this.addDomHandler("#submit", "click", this.onSubmitButtonClick);
        this.addDomHandler(".edit", "click", this.onEditButtonClick);
    },
    
    /**
     * Submit checkout click handler
     */
    onSubmitButtonClick: function(e) {
        this.dispatchEvent(this.events.SUBMIT_CART, {orderId: this.getCart().id});
    },
    
    /**
     * Shipping Option change handler
     */
    onShippingOptionChange: function(e){
    	this.dispatchEvent(this.events.SHIPPING_METHOD_CHANGE, {shippingOptionId: e.currentTarget.value});
    },
    
    /**
     * Edit checkout option click handler
     */
    onEditButtonClick: function(e){
    	this.dispatchEvent(this.events.EDIT_CHECKOUT_OPTION, {cart: this.getCart()});
    },
	
	/*********************************************************/
	
	/**
	 * Render loader or the actual cart
	 */
	render: function() {
	    if(!this.getCart()) {
			this.showLoaderOnComponent(".content", "Loading Checkout summary...");
	    } else {
	    	this.applyTemplate(".content", "#checkoutSummaryInfoTemplate", this.getCart());
	    	this.renderAddresses();
	    	this.renderShippingMethod();
	    } 
	},
	
	/**
	 * Render Address Widgets
	 */
	renderAddresses: function(){
		shippingAddressWidget = new dr.acme.view.AddressWidget("#shippingAddress", this.getCart().shippingAddress);
		shippingAddressWidget.showTitle(false);
		shippingAddressWidget.render(true);
		billingAddressWidget = new dr.acme.view.AddressWidget("#billingAddress", this.getCart().billingAddress);
		billingAddressWidget.showTitle(false);
		billingAddressWidget.render(true);
	},
	
	/**
	 * Render Cart Totals
	 */
	renderShippingMethod: function(){
		this.applyTemplate("#shippingMethodContainer", "#shippingMethodOptions", this.getCart());
	},
	
	renderLoaderTotals:function(){
		this.applyTemplate("#totals", "#loaderTotals");		
	},
	
	/**
	 * Render Cart Totals
	 */
	renderTotals: function(){
		this.applyTemplate("#totals", "#summaryCartTotals", this.getCart());
	},
	
	
	renderApplyError: function(errorMessage){
		this.applyTemplate(".content", "#checkoutSummaryInfoTemplate", errorMessage);
		
	},
	
	/**
     * Gets the Cart
     */
    getCart: function() {
        if(this.modelIsDefined()) {
            return this.model;
        } else {
            return null;
        }
    },
    
    /**
	 * Cart detail setter
	 */
	setCart: function(model) {
	    this.model = model;
	}
	
});
