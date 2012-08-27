var ns = namespace("dr.acme.controller")

/**
 * Home Controller manager
 * 
 * This Controller will link the views with the managers required
 * It overrides functions inherits from the BaseController, to initialize (init)
 * and exectute (doIt) the main purpose of this manager.   
 */
ns.HomeController = ns.BaseController.extend({
    FEATURED_CATEGORIES_ID: dr.acme.runtime.CONSTANTS.HOME_FEATURED_CATEGORIES_ID,
    PRODUCTS_PER_CATEGORY: dr.acme.runtime.CONSTANTS.HOME_PRODUCTS_PER_CATEGORY,
    
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
		var offersPromise = this.offerService.getPromotionalProducts();
		var categoriesPromise = this.categoryService.getCategories();

		var that = this;
        this.view.render();
		this.view.bindEvent();        
        this.view.renderCategoriesLoader();
        this.view.renderOffersLoader();
        
		$.when(categoriesPromise).done(function(categories) {
            that.model.categories = categories;
            that.view.renderCategories(that.model);
			
			// Render the featured categories widgets            
            for(var i = 0; i < that.FEATURED_CATEGORIES_ID.length; i++) {
                that.renderFeaturedCategoryWidget(that.categoryService.getCategoryById(that.FEATURED_CATEGORIES_ID[i]));    
            }
        });
		
		$.when(offersPromise).done(function(offerProduct) {
		    that.model.featuresProducts = offerProduct;
		    that.view.renderOffers(that.model);
		});
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
    
    createFeaturedCategoryWidgets: function(categoryIds) {
        this.featuredCategoryWidgets = [];
        for(var i = 0; i < this.FEATURED_CATEGORIES_ID.length; i++) {
            this.featuredCategoryWidgets.push(new dr.acme.view.HomeCategoryWidget("#home-categories"));
        }
    },
    
	/** 
	 * Creates and render featured categories widgets
	 */
	renderFeaturedCategoryWidget: function(category) {
	    var hcw = new dr.acme.view.HomeCategoryWidget("#home-categories");
        hcw.setCategory(category);
        hcw.render(true);
        $.when(this.productService.listProductsByCategory(category.id, 1, this.PRODUCTS_PER_CATEGORY))
            .done(function(page) {
                if(page.product) {
                    hcw.setProducts(page.product);    
                }
                hcw.renderProducts();        
                        
            });
	}
});
