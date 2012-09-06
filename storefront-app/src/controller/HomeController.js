var ns = namespace("dr.acme.controller")

/**
 * Home Controller manager
 * 
 * This Controller will link the views with the managers required
 * It overrides functions inherits from the BaseController, to initialize (init)
 * and exectute (doIt) the main purpose of this manager.   
 */
ns.HomeController = ns.BaseController.extend({
    /**
     * Events this view dispatches
     */
    events: {
        ADD_TO_CART: "AddToCart"
    },  
    
    /**
     * init method override from the BaseController
     */
	init:function (){
        //this.createFeaturedCategoryWidgets(this.FEATURED_CATEGORIES_ID);
		this._super(new dr.acme.view.HomeView());
		this.offerService = dr.acme.service.manager.getOfferService();
		this.categoryService = dr.acme.service.manager.getCategoryService();
		this.productService = dr.acme.service.manager.getProductService();
	},

	/**
     * initEventHandlers method override from the BaseController
     */	
	initEventHandlers: function() {		
	    this.view.addEventHandler(this.view.events.ADD_TO_CART, this, this.onAddToCart);
	    this.view.addEventHandler(this.view.events.CATEGORY_SELECTED, this, this.onCategorySelected);
    },

	/**
     * doIt method override from the BaseController
     */
	doIt:function(param){
		var that = this;
        this.view.render();
		this.view.bindEvent();        
		
		var categoriesPromise = this.categoryService.getCategories();
        this.view.renderCategoriesLoader();
        $.when(categoriesPromise).done(function(categories) {
            that.model.categories = categories;
            that.view.renderCategories(that.model);
			
			var ids = that.app.config.featuredCategories.ids;
			
			// Render the featured categories widgets            
            for(var i = 0; i < ids.length; i++) {
            	var catId = ids[i];
            	var categoryByIdPromise = that.categoryService.getCategoryById(catId);
            	$.when(categoryByIdPromise).done(function(categories) {
                	// that.renderFeaturedCategoryWidget(that.categoryService.getCategoryById(catId));
                	that.renderFeaturedCategoryWidget(categories);
		        });
                $.when(categoryByIdPromise).fail(function(error) {
                	that.renderFeaturedCategoryError(error);
                });      
            }
        });
        
        if(this.app.config.featuredProducts.visible==true && this.app.config.featuredProducts.pop) {
    		var offersPromise = this.offerService.getPromotionalProducts();
    		this.view.renderOffersLoader();
    		$.when(offersPromise).done(function(offerProduct) {
    		    that.model.featuresProducts = offerProduct;
    		    that.view.renderOffers(that.model);
    		});
    		$.when(offersPromise).fail(function(error) {
    		    that.view.renderOfferError(error);
    		});
        }
	},
	    
    /**
     * Handler for "add to cart" events on featured categories' products
     */
    onAddToCart:function(e, params) {
        if(!params.productId) return;
        var self = this;
        // The product should be already cached, but just in case, the UI is blocked
        this.blockApp();
        $.when(this.productService.getProductById(params.productId))
            .done(function(product) {
                self.notify(dr.acme.runtime.NOTIFICATION.ADD_TO_CART, {product: product, qty: 1});       
            });
        
    },

    /**
     * Handler for category selection events
     */    
    onCategorySelected: function(e, params){
    	this.navigateTo(dr.acme.runtime.URI.CATEGORY + params.value);
    },
	/** 
	 * Creates and render featured categories widgets
	 */
	renderFeaturedCategoryWidget: function(category) {
	    var hcw = new dr.acme.view.HomeCategoryWidget("#home-categories");
        hcw.setCategory(category);
        hcw.render(true);
        $.when(this.productService.listProductsByCategory(category.id, 1, this.app.config.featuredCategories.numberOfProducts))
            .done(function(page) {
                if(page.product) {
                    hcw.setProducts(page.product);    
                }
                hcw.renderProducts();        
                        
            });
	},
	/** 
	 * Renders a featured category widget with an error message
	 */
	renderFeaturedCategoryError: function(error) {
	    var hcw = new dr.acme.view.HomeCategoryWidget("#home-categories");
	    var category = {};
	    category.displayName = 'Error';
	    hcw.setCategory(category);
        hcw.render(true);
      	hcw.renderErrorOrEmpty(error);
	}
});
