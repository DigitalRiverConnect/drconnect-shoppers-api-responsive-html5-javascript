var ns = namespace("dr.acme.controller")

/**
 * Cart Controller manager
 * 
 * This Controller will link the views with the managers required
 * It overrides functions inherits from the BaseController, to initialize (init)
 * and exectute (doIt) the main purpose of this manager.   
 */
ns.ShoppingCartController = ns.BaseController.extend({
	
	/**
     * init method override from the BaseController
     */	
	init:function(){
		this.model = null;
		this.view = new dr.acme.view.ShoppingCartView();
		this.headerButton = new dr.acme.view.ShoppingCartHeaderButton();
		this.shoppingCartService = dr.acme.service.manager.getShoppingCartService();
		this.productService = dr.acme.service.manager.getProductService();		
		this._super(this.view);
	},

	/**
     * initEventHandlers method override from the BaseController
     */		
	initEventHandlers: function() {
	    // Add handler for remove line items
	    this.view.addEventHandler(this.view.events.ADD_TO_CART, this, this.onAddToCart);
        this.mapEventToNotification(this.view.events.REMOVE_FROM_CART, dr.acme.runtime.NOTIFICATION.REMOVE_FROM_CART);
    },

	/**
     * doIt method override from the BaseController
     */	    
	doIt:function(data){	
        this.updateAndShowCart();
	},
	
	
	/**
     * Handler for "add to cart" events on candyRack' products
     */
    onAddToCart:function(e, params) {
        if(!params.productId) return;
        var self = this;
        var product = this.getProductFromCandyRack(params.productId);
        self.notify(dr.acme.runtime.NOTIFICATION.ADD_TO_CART, {product: product, qty: 1, addToCartUri:params.addToCartUri});       
    },
	 
	/**
	 * Call Cart Services and update the ShoppingCartView
	 */
	updateAndShowCart: function() {
        console.info("Displaying Shopping cart page");
        this.view.renderLayout();       
        this.view.render();
        
        var that = this;
        
        $.when(that.shoppingCartService.get()).done(function(cart) {
              that.setCart(cart);

              that.updateViews(true);   
        });	 
        
        if(this.app.config.candyRack.visible==true && this.app.config.candyRack.pop) {
            this.view.renderCandyRack();
            // Get the candyRack Offers for the cart
            var getCandyRackPromise = that.shoppingCartService.getCandyRackProducts({});
            $.when(getCandyRackPromise).done(function(productOffer) {
    			that.candyRack = productOffer;
    
    			that.view.renderCandyRack(productOffer);   
            });	    
            $.when(getCandyRackPromise).fail(function(error) {
            	that.view.renderCandyRack(error);
            });
        }
	},
	
	/**
	 * Add A product to the cart
	 * @params product to be added, quantity
	 */
	addProductToCart:function(params){		
		var that = this;
        // Block App UI
        this.blockApp();
        
        $.when(that.shoppingCartService.addProductToCart(params.product, params.qty, params.addToCartUri))
    	 .done(function(){
            //Ublock UI
            that.unblockApp();
            
    		// display message 
    		dr.acme.util.DialogManager.showSuccess("The product '" + params.product.displayName + "' was added to the cart successfully", "Product added to the cart!");

  		    //The product can be added from the CandyRack, if so updateCurrentView, if not go to the shoppingCart page
  		    if(dr.acme.application.getDispatcher().getCurrentUrl() == dr.acme.runtime.URI.SHOPPING_CART){
  		    	that.updateAndShowCart();
  		    }else{
	  		    // Redirect to shopping cart
	    		that.navigateTo(dr.acme.runtime.URI.SHOPPING_CART);
	    	}
    	});
	}, 
	
	/**
	 * Removes a product from the shopping cart
	 * @lineItemId id of the lineItem to be removed
	 */
	removeProductFromCart:function(lineItemId){		
		var that = this;
		// Block App UI
		this.blockApp();		
		var lineItem = this.getLineItemById(lineItemId);
        $.when(that.shoppingCartService.removeProductFromCart(lineItem))
    	 .done(function(){
    	     // Unblock App UI
    	     that.unblockApp();
    	     // Display notification
    		 dr.acme.util.DialogManager.showSuccess("The product '" + lineItem.product.displayName + "' was removed from the cart successfully", "Product removed from the cart");
    		  
    		 that.updateAndShowCart();
    	});
	},
	
	/**
	 * Update the views
	 */
	updateViews: function(goToCartPage) {
	  //update quantity on the top of the page
      this.headerButton.render(this.getCart());
      
      if(goToCartPage) {
          //Render the cart page
          this.view.setCart(this.getCart());       
          this.view.render();
      }
	},
	
	/**
	 * Clears the cart data
	 */
	clearCart: function() {
	    this.model = null;
	    this.shoppingCartService.invalidateCache();
	    this.updateViews(false);
	},
	
	/**
	 * Sets the cart model and adds the total quantity by calculating it.
	 */
	setCart: function(cart) {
        this.model = cart;
        
        // Add calculated property
        this.model.totalQuantity = this.getProductQuantity(cart);    
	},
	
	/**
	 * Gets the current cart
	 */
	getCart: function() {
	    return this.model;
	},
	
	/**
	 * Returns the quantity of products currently added to the cart
	 * @param cart the shopping cart
	 */
	getProductQuantity:function(cart) {
		var quantity = 0;
		if(!cart.lineItems || !cart.lineItems.lineItem) {
		    return 0;
		}
		$(cart.lineItems.lineItem).each(function(index, elem) {
			quantity += parseInt(elem.quantity);
		});
		return quantity;
	},
	
	/**
	 * Returns the cart lineItem that matches with the lineItemId
	 * @param lineItemId id of the lineItem to get
	 */
	getLineItemById :function(lineItemId){
		var lineItemToReturn = "";
		$(this.getCart().lineItems.lineItem).each(function(index, lineItem){
			if($(lineItem).attr('id') === parseInt(lineItemId)){
				lineItemToReturn = lineItem;
				return false;
				}	        
			});
		return lineItemToReturn;
	},
	
	/**
	 * Gets the candyrack product that matches with productId
	 * @param productId id of the product to get
	 */
	getProductFromCandyRack:function(productId){
		for(var i = 0; i < this.candyRack.productOffer.length; i++) {
            var productOffer = this.candyRack.productOffer[i];
            if(productOffer.product.id == productId){
            	return productOffer.product;
            }
        }
		return null;
	}
});
