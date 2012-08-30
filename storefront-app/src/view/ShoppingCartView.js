var ns = namespace('dr.acme.view');

/**
 * Cart View
 * 
 * Will render the model in different ways depending on the function
 * called. They replace the html template in the layout specified
 * with the provided model
 * 
 */
ns.ShoppingCartView =  ns.BaseView.extend({	
	
	 /**
     * Name of the root element for this view
     */
    elementSelector: "#contentArea",
    layoutTemplate: "#shoppingCartTemplate",
    /**
     * Events this view dispatches
     */
    events: {
    	ADD_TO_CART: "AddToCart",
    	REMOVE_FROM_CART: "RemoveFromCart"
    },
    
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {    	
        this.addDomHandler(".js_remove", "click", this.showConfirmRemove);
        this.addDomHandler("#addOfferToCart", "click", this.onAddToCartButtonClick);        
    },
    
     /**
     * "Add to Cart" button click handler
     */
    onAddToCartButtonClick: function(e, productId) {
        this.dispatchEvent(this.events.ADD_TO_CART, {productId: $(e.target).attr("data-product-id"), addToCartUri:$(e.target).attr("addToCartUri"), qty:1});
    },
    
    /**
     * Remove line item from Cart on button click handler
     */
    showConfirmRemove: function(e) {
        console.debug("Removed button clicked");
        var lineItemId = $(e.currentTarget).attr("data-lineItemId");
        var productName = $(e.currentTarget).attr("data-productName");
    	
        var self = this;
    	dr.acme.util.DialogManager.showQuestion("Are you sure you want to remove the product '" + productName + "' from the cart?", function(response) {
    	    if(response) {
    	        self.dispatchEvent(self.events.REMOVE_FROM_CART, lineItemId);
    	    }
    	});
    },
    
	/**
	 * Grid rendering
	 */
	render:function() {
		if(!this.getCart()){
			  this.showLoaderOnComponent(".content", "Loading ShoppingCart...");
		}else{
			
			if(this.getCart().totalQuantity > 0){
				this.applyTemplate(".content", "#shoppingCartTemplateLoaded", {cart: this.getCart()});
			}else{
				this.applyTemplate(".content", "#shoppingCartEmpty", {});					
			}
		}
	},
	
	/**
	 * Candy Rack Rendering. 
	 * candyRack parameter can be a candy rack to show, or and error message. The renderer decides
	 * if it should show the candy rack or an error
	 */
	renderCandyRack:function(candyRack){
		// if candyRack.status is not null, the candyRack parameter is an error then showing an error message 
		var candyRackWidget = new dr.acme.view.CandyRackWidget("#candyRack", candyRack);
		if(candyRack && candyRack.status){
			candyRackWidget.renderError(candyRack);
		}else{
			candyRackWidget.render(false);
		}
	}, 
	
	/**
	 * Shopping Cart rendering at the top bar
	 */
	updateQuantityShoppingCart:function(quantity){
		if(!this.quantity || this.quantity != quantity) {
			this.quantity = quantity;

			$("#quantity").slideUp("slow", function(){
				$("#quantity").text("("+ quantity +")").slideDown('slow');			
			});
		}
	}, 
	
	/**
	 * Gets the cart
	 */
	getCart:function(){
		if(this.modelIsDefined()) {
            return this.model;
        } else {
            return null;
        }
	}, 
	
	/**
	 * set Cart in the model
	 */
	setCart: function(model) {
	    this.model = model;
	} 
	
	
});