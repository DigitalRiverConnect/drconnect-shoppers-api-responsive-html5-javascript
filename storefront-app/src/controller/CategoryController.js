var ns = namespace('dr.acme.controller');

/**
 * Category Controller manager
 * 
 * This Controller will link the views with the managers required
 * It overrides functions inherits from the BaseController, to initialize (init)
 * and exectute (doIt) the main purpose of this manager.   
 */
ns.CategoryController = ns.BaseController.extend({
	PAGE_SIZE:dr.acme.runtime.CONSTANTS.DEFAULT_PAGE_SIZE,
	
	/**
     * init method override from the BaseController
     */
	init:function(){
		this.model = {};
		this.categoryService = dr.acme.service.manager.getCategoryService();
		this.productService = dr.acme.service.manager.getProductService();
		this._super(new dr.acme.view.CategoryView());
		this.resetModel();	
	},
	
	/**
     * initEventHandlers method override from the BaseController
     */	
	initEventHandlers: function() {
	    this.mapEventToNotification(this.view.events.ADD_TO_CART, dr.acme.runtime.NOTIFICATION.ADD_TO_CART);
	    this.mapEventToNotification(this.view.events.NAVIGATE_PAGE, dr.acme.runtime.NOTIFICATION.NAVIGATE_PAGE);
	    this.view.addEventHandler(this.view.events.CATEGORY_SELECTED, this, this.onCategorySelected);
	    this.view.addEventHandler(this.view.events.PRODUCT_SORT_CHANGED, this, this.onProductSortChanged);
    },
    
	/**
     * doIt method override from the BaseController
     */	    
	doIt:function(params){
		console.info("Displaying Category page for category " + params.id);
		
		var that = this;
		
		//Clear Cached Variables
		this.resetModel();
		
		var categoriesPromise = that.categoryService.getCategoryById(params.id, true);
		var productsPromise = this.getProducts({id:params.id,numberPage:this.currentPageNumber,sort:this.currentSort});
		
		var that = this;
		this.view.reset();
		//render skeleton for this view
        this.view.render();        
        //loader for categories
        this.view.renderCategoriesLoader();
        //loader for productss
        this.view.renderProductsListLoader();
        
        /**
         *  async response of the subcaregories by category
         */
		$.when(categoriesPromise).done(function(categories) {
            that.model.categories = categories;
            that.view.renderCategories(that.model);
            that.view.renderProductListPanel(that.model, that.currentSort);
            that.subcategoriesResponseReceived = true;
        });
        
		/**
		 * async response of the products by category  
		 */
		$.when(productsPromise).done(function(products) {
		    that.model.productsList = products;
		    that.productListResponseReceived = true;
			that.renderProductList();
			if(products.totalResultPages>1)
            	that.view.applyPagination(products.totalResultPages,that.currentPageNumber);
		});
	},
    
    /**
     * Handles when a new category is selected
     */
    
    onCategorySelected: function(e, params){
    	this.navigateTo(dr.acme.runtime.URI.CATEGORY + params.value);
    },
    
    /**
     * Handles when products sorts changes
     * Renderizes a new products list
     */
    onProductSortChanged: function(e, params){
    	this.renderPage(params);
    },
	
	/**
	 * This funtion renders productList when both responses (getSubCategories and listProductCategories) arrives
	 * This is because we get categoryName from categoryService and the product list from product service.
	 */
	renderProductList: function(){
		if(this.subcategoriesResponseReceived  && this.productListResponseReceived){
			this.view.renderProductList(this.model);
		}
	},
	
	renderPage:function(params){
		var that = this;
		this.model.productsList = null;
		var categoryId;
		
		// Set Different Parameters
		// If call comes from sort, gets the categoryId from the cached model
		if(params.id){
			categoryId = params.id;
		}else{
			categoryId = this.model.categories.id;
		}
		
		if(params.pageNumber){
			this.currentPageNumber = params.pageNumber;
		}
		
		if(params.sort){
			this.currentSort = params.sort;
			this.currentPageNumber = 1;
		}
		
		var productsPromise = this.getProducts({id:categoryId,numberPage:this.currentPageNumber, sort:this.currentSort});
		
		//render skeleton for this view
        this.view.renderProductListPanel(this.model, this.currentSort);
        
        //loader for categories
        $.when(productsPromise).done(function(productList){
            that.model.productsList = productList;
            that.view.renderProductList(that.model);    
            if(productList.totalResultPages>1)    
            	that.view.applyPagination(productList.totalResultPages,that.currentPageNumber);
        });			
	},
	
	/**
	 * Resets the model deleting categories and products list cache
	 */
	resetModel: function(){
		this.subcategoriesResponseReceived = false;
		this.productListResponseReceived = false;
		this.currentPageNumber = 1;
		this.currentSort = null
		this.model.productsList = null;
		this.model.categories = null;
	},
	 
	getProducts :function(params){
		return  this.productService.listProductsByCategory(params.id, params.numberPage,this.PAGE_SIZE, params.sort);		
	}
});
