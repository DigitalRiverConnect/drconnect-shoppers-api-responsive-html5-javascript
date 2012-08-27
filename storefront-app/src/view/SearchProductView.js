var ns = namespace('dr.acme.view')

/**
 * View to Render a Product Search Result
 */
ns.SearchProductView = ns.BaseView.extend({
	
	/**
     * Name of the root element for this view
     */
    elementSelector: "#contentArea",
    layoutTemplate: "#productSearchTemplate",
    containers : {
		product: "#searchProduct" , 
		paginate:"#pagination"
	},
    
    /**
     * Events this view dispatches
     */
    events: {
        ADD_TO_CART: "AddToCart", 
        PAGE_CLICKED:"PageClicked"
    },
    
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {
        this.addDomHandler(".addProductToCart", "click", this.onAddToCartButtonClick);        
        this.addDomHandler(".search", "click", this.onClickedPage);
    },
    
    /**
     * Manages Pagination Buttons
     */
    onClickedPage:function(event){
    	if($(event.currentTarget).parent().is('.active, .disabled')){    	
    		event.preventDefault();
    	}else{
    		if($(event.target).is('.prev')){
    			this.dispatchEvent(this.events.PAGE_CLICKED, {pageNumber: parseInt($('li.active a').text()) -1});
    		}else{
    			if($(event.target).is('.next')){
    				this.dispatchEvent(this.events.PAGE_CLICKED, {pageNumber: parseInt($('li.active a').text()) +1});    				
    			}else{
    				this.dispatchEvent(this.events.PAGE_CLICKED, {pageNumber: parseInt($(event.target).text())});    	    	    				
    			}
    		}
    		
    	}
    },
    /**
     * "Add to Cart" button click handler
     */
    onAddToCartButtonClick: function(e) {
        this.dispatchEvent(this.events.ADD_TO_CART, {product: this.getProduct()});
    },
    
    /**
     * render loader for products by keyword 
     */
    renderProductListLoader: function() {
        this.showLoaderOnComponent(this.containers.product, "Loading Products...");
	},
	
	/**
	 * compile template for product list
	 */
	renderProductList: function(model) {
		console.log(model);
		if(typeof model.productList.product !='undefined' && model.productList.product.length>0){
			var productListWidget = new dr.acme.view.ProductListWidget(this.containers.product, model.productList);
			productListWidget.render(false);			
		}else{			
			this.applyTemplate(this.containers.product, "#searchEmpty");
		}
	},
	
	/**
	 * Renders the view
	 */
	render : function(param){
		this.applyTemplate(this.elementSelector,this.layoutTemplate);
	}, 
	/**
	 * Applies the pagination Buttons
	 */
	applyPagination:function(totalPageResult,pageActive){
		this.appendTemplate(this.containers.product, "#paginationTemplate", {totalResultPages:totalPageResult,pageActive:pageActive, pageClass:'search'});
	}
});