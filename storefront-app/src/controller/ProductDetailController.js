var ns = namespace("dr.acme.controller")

/**
 * Product Controller manager
 * 
 * This Controller will link the views with the managers required
 * It overrides functions inherits from the BaseController, to initialize (init)
 * and exectute (doIt) the main purpose of this manager.   
 */
ns.ProductDetailController = ns.BaseController.extend({
	
	/**
     * init method override from the BaseController
     */	
	init:function(){
		this.model = {};
		this.view = new dr.acme.view.ProductDetailView();
		this.productService = dr.acme.service.manager.getProductService();		
		this._super(this.view);	
	},

	/**
     * initEventHandlers method override from the BaseController
     */		
	initEventHandlers: function() {
        this.mapEventToNotification(this.view.events.ADD_TO_CART, dr.acme.runtime.NOTIFICATION.ADD_TO_CART);
    },

	/**
     * doIt method override from the BaseController
     */       
	doIt:function(params){
	    console.info("Displaying Product details page (Product id: " + params.id + ")" );
		var that = this;
		var p = that.productService.getProductById(params.id, {});
		
		this.view.renderLayout();
	    this.view.render();

		$.when(p).done(function(product) {
		    that.model.product = product;
            that.view.setProduct(that.model.product);
            that.view.render();  
		});
		
		$.when(p).fail(function(error) {
            that.view.renderError(error);  
		});
	} 
});
