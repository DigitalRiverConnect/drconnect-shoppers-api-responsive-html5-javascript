var ns = namespace("dr.acme.controller")

/**
 * Checkout Controller 
 * 
 * This Controller will link the views with the managers required
 * It overrides functions inherits from the BaseController, to initialize (init)
 * and exectute (doIt) the main purpose of this manager.   
 */
ns.CheckoutController = ns.BaseController.extend({
	
	/**
     * init method override from the BaseController
     */	
	init:function(){
		this.model = {};
		this.summaryView = new  dr.acme.view.CheckoutSummaryView();
		this.editView = new dr.acme.view.CheckoutEditView();
		this.thanksView = new dr.acme.view.ThanksView();
		this.shoppingCartService = dr.acme.service.manager.getShoppingCartService();
		this.shopperService = dr.acme.service.manager.getShopperService();
		this._super(this.summaryView);
	},

	/**
     * initEventHandlers method override from the BaseController
     */		
	initEventHandlers: function() {
		// add handler for confirmation
		this.mapEventToNotification(this.summaryView.events.SUBMIT_CART, dr.acme.runtime.NOTIFICATION.SUBMIT_CART);
		this.summaryView.addEventHandler(this.summaryView.events.SHIPPING_METHOD_CHANGE, this, this.onShippingMethodChange);
		this.summaryView.addEventHandler(this.summaryView.events.EDIT_CHECKOUT_OPTION, this, this.editOptions);
		this.editView.addEventHandler(this.editView.events.SAVE_OPTIONS, this, this.saveOptions);
    },

	/**
     * doIt method override from the BaseController
     */	     
	doIt:function(data){	
	    console.info("Displaying Checkout summary page");
		this.summaryView.renderLayout();
		this.summaryView.render();		
	    var that = this;
	    
	    var getCartPromise = that.shoppingCartService.get();
	    
	    
	    // Check if shoppingCart has products before applying the shopper
	    $.when(getCartPromise).done(function(cart) {
 	
	    	//if cart has no products 
	    	if(!cart.lineItems || !cart.lineItems.lineItem){
	    		that.navigateTo(dr.acme.runtime.URI.SHOPPING_CART);
	    		return;
	    	}
	    	// Else applies the shopper to the cart
	    	var applyShopperPromise = that.shoppingCartService.applyShopper();
			$.when(applyShopperPromise).done(function(cart) {
				that.summaryView.setCart(cart);
				that.summaryView.render();
			});
			
			$.when(applyShopperPromise).fail(function(error) {
				dr.acme.util.DialogManager.showError(error.details.error.description + " Please edit your account options.\n Redirecting to My Account", "Checkout Error");
				that.notify(dr.acme.runtime.NOTIFICATION.SHOW_ACCOUNT_EDIT, dr.acme.runtime.URI.CHECKOUT);  
			});
	    });
	},
	
	/**
	 * Receives the cart and renders the summary page after options where edited and saved. It avoids calling
	 * applyShopper because the response of apply options gets an updated cart
	 */
	renderSummaryPage: function(cart){
		console.info("Displaying Checkout summary page post Edition");
		this.summaryView.renderLayout();
		this.summaryView.setCart(cart);
		this.summaryView.render();
	},
	
	/**
	 * Changing Shipping Method
	 */
	onShippingMethodChange:function(e, optionId){
		console.debug("Changing Shipping Method");
		var that = this;
		that.summaryView.renderLoaderTotals();
		$.when(that.shoppingCartService.applyShippingOption(optionId)).done(function(data) {
			console.info("Rendering totals again");
			that.summaryView.setCart(data);
			that.summaryView.renderTotals();
		});
	},
	
	/**
	 * Edit checkout options as Addresses and Payment method
	 */
	editOptions:function(e, data){
		console.info("Displaying edit checkout options");
		this.editView.renderLayout();
		this.editView.setCart(data.cart);
		this.editView.render();
	    var that = this;

	    // Rendering Billing and Shipping Address
		$.when(that.shopperService.getAddresses()).done(function(addresses) {
			that.editView.setAddresses(addresses);
			that.editView.renderBillingAddresses();
			that.editView.renderShippingAddresses();
		});
		// Rendering Payment options
		$.when(that.shopperService.getPaymentOptions()).done(function(paymentOptions) {
			that.editView.setPaymentOptions(paymentOptions);
			that.editView.renderPaymentOptions();
		});
	},
	
	/**
	 * Saves checkout options as Addresses and Payment method
	 */
	saveOptions:function(e, parameters){
		console.info("Saving checkout options");
				
	    var that = this;
    	this.blockApp();
    	var applyShopperPromise = that.shoppingCartService.applyShopper(parameters.shippingAddressId, parameters.billingAddressId,
	    		parameters.paymentOptionId);
	    $.when(applyShopperPromise).done(function(cart) {
	    	that.unblockApp();
	    	that.notify(dr.acme.runtime.NOTIFICATION.CHECKOUT_OPTIONS_APPLIED, cart);
	    });
	    
	    $.when(applyShopperPromise).fail(function(error) {
	    	// If there is an error applying the shopper only unblocks the app, the default handler will do the
	    	// rest of the work
	    	that.unblockApp();
	    });
    
	},
	
	/**
	 * Submitting Cart
	 */
	submitCart:function(data){
		console.info("Submitting Cart");
		var that = this;
		
		this.blockApp();
		this.thanksView.reset();
		$.when(that.shoppingCartService.submit()).done(function() {
		    that.unblockApp();
			console.info("Displaying Thanks page");
			that.thanksView.setOrderId(data.orderId);
			that.thanksView.render();
		});
	}
});