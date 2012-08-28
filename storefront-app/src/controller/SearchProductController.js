var ns = namespace('dr.acme.controller');

/**
 * Search Product Controller manager
 *   
 */
ns.SearchProductController = ns.BaseController.extend({
	/**
     * init method override from the BaseController
     */		
	init:function(){
		this.model = {};		
		this.productService = dr.acme.service.manager.getProductService();
		this._super(new dr.acme.view.SearchProductView());	
	},

	/**
     * initEventHandlers method override from the BaseController
     */		
	initEventHandlers: function() {
	    this.mapEventToNotification(this.view.events.ADD_TO_CART, dr.acme.runtime.NOTIFICATION.ADD_TO_CART);
	    this.mapEventToNotification(this.view.events.PAGE_CLICKED, dr.acme.runtime.NOTIFICATION.PAGE_CLICKED);
    },
    
	/**
     * doIt method override from the BaseController
     */	    
	doIt:function(params){
		
		console.info("Displaying Search page for key word" + params.keyword);
		
		var that = this;
		var productsPromise = this.getProducts({keyword:params.keyword,numberPage:1});
		
		var that = this;
		//render skeleton for this view
        this.view.render();        
        //loader for categories
        this.view.renderProductListLoader();
        
		$.when(productsPromise).done(function(productList){
            that.model.productList = productList;
            that.view.renderProductList(that.model);
            if(productList.totalResultPages>1)
            	that.view.applyPagination(productList.totalResultPages,1);
        });		
	},
	 
	renderPageClicked:function(params){
		var that = this;
		var productsPromise = this.getProducts({keyword:getParamValue('keyword'),numberPage:params.pageNumber});
		//render skeleton for this view
        this.view.render();   
        //loader for categories
        this.view.renderProductListLoader();
        
        $.when(productsPromise).done(function(productList){
            that.model.productList = productList;
            that.view.renderProductList(that.model);        
            that.view.applyPagination(productList.totalResultPages,params.pageNumber);
        });			
	},
	 
	getProducts :function(params){
		return  this.productService.searchProduct(params.keyword, params.numberPage,this.app.config.pageSize);
	}
	
});
