var ns = namespace('dr.acme.view');

/**
 * Product View
 * 
 * Will render the model in different ways depending on the function
 * called. They replace the html template in the layout specified
 * with the provided model
 * 
 */
ns.ProductDetailView =  ns.BaseView.extend({
    /**
     * Name of the root element for this view
     */
    elementSelector: "#contentArea",
    layoutTemplate: "#productDetailTemplate",
    /**
     * Events this view dispatches
     */
    events: {
        ADD_TO_CART: "AddToCart"
    },
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {
        this.addDomHandler("#addToCart", "click", this.onAddToCartButtonClick);
    },
    /**
     * "Add to Cart" button click handler
     */
    onAddToCartButtonClick: function(e) {
        this.dispatchEvent(this.events.ADD_TO_CART, {product: this.getProduct(), qty: this.getQuantity()});
    },
    /**
     * Gets the quantity to add to the cart
     */
    getQuantity: function() {
        return $(".quantity_select").val();
    },
    /**
     * Gets the product
     */
    getProduct: function() {
        if(this.modelIsDefined()) {
            return this.model;
        } else {
            return null;
        }
    },
	/**
	 * Render loader or the actual product
	 */
	render: function() {
	    if(!this.getProduct()) {
	        this.showLoaderOnComponent(".productDetail", "Loading Product...");
	    } else {
	       this.applyTemplate(".productDetail", "#productDetailTemplateLoaded", {product: this.getProduct()});    
	    } 
	},
	
	/**
	 * Render loader or the actual product
	 */
	renderError: function(error) {
		this.applyTemplate(".productDetail", "#resourceNotFoundTemplate", error);    
	},
	
	/**
	 * Product detail rendering
	 */
	setProduct: function(model) {
	    this.model = model;
	}
});