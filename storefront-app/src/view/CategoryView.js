var ns = namespace('dr.acme.view')

/**
 * ProductList View
 * 
 * 
 */
ns.CategoryView = ns.BaseView.extend({
	
	/**
     * Name of the root element for this view
     */
	
    elementSelector: "#contentArea",
    layoutTemplate: "#productByCategory",
    containers : {
    				product: "#product_list_panel", 
    				category: "#categories-product"   				
    			  },
   
    sortOptions: {
    				"none": {"id": "none", "desc":"Sort By"},
					"name-asc": {"id": "name-asc", "desc":"Name A-Z", "field":"name", "direction":"asc"},
					"name-desc": {"id": "name-desc", "desc": "Name Z-A",  "field":"name", "direction":"desc"},
					"price-asc": {"id": "price-asc", "desc":"Lowest List Price" ,"field":"listPrice", "direction":"asc"},
					"price-desc":{"id": "price-desc", "desc": "Highest List Price", "field":"listPrice", "direction":"desc"}    	
			    } ,
   
    /**
     * Events this view dispatches
     */
    events: {
        ADD_TO_CART: "AddToCart",
        CATEGORY_SELECTED: "CategorySelected", 
        NAVIGATE_PAGE:"NavigatePage",
        PRODUCT_SORT_CHANGED:"ProductSortChanged"
    },
    
    init: function(templateName) {
	    this._super(templateName);
	    this.productListWidget = new dr.acme.view.ProductListWidget("#products_list");
    },
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {
        this.addDomHandler(".addProductToCart", "click", this.onAddToCartButtonClick);     
        this.addDomHandler(".subCategories .drop_down_menu", "change", this.onCategorySelected);   
        this.addDomHandler(".productByCategoy", "click", this.onClickedPages);
        this.addDomHandler("#productsSortDropDown", "change", this.onProductSortChanged)
    },
    
    
    /**
     * Manages Pagination in the products for category
     */
    onClickedPages:function(event, params){
    	if($(event.currentTarget).parent().is('.active, .disabled')){    	
    		event.preventDefault();
    	}else{
    		if($(event.target).is('.prev')){
    			this.dispatchEvent(this.events.NAVIGATE_PAGE, {id:parseInt($.address.parameter('id')),pageNumber: parseInt($('li.active a').text()) -1});
    		}else{
    			if($(event.target).is('.next')){
    				this.dispatchEvent(this.events.NAVIGATE_PAGE, {id:parseInt($.address.parameter('id')),pageNumber: parseInt($('li.active a').text()) +1});    				
    			}else{
    				this.dispatchEvent(this.events.NAVIGATE_PAGE, {id:parseInt($.address.parameter('id')),pageNumber: parseInt($(event.target).text())});    	    	    				
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
     * Category Selected for the drop-down handler
     */
    onCategorySelected: function(e){
    	this.dispatchEvent(this.events.CATEGORY_SELECTED, {value: e.currentTarget.value});
    },
    
    /**
     * Product Sort Drop Down Menu change handler
     */
    onProductSortChanged: function(e){
    	this.dispatchEvent(this.events.PRODUCT_SORT_CHANGED, {"sort": this.getSortOptionById(e.currentTarget.value)});
    },
    
    /**
     * Gets a Sort Option using the id of the selected model in the drop down
     */
    getSortOptionById: function(sortId){
    	return this.sortOptions[sortId];
    },
    
    /**
     * render loader for categories
     */
    renderCategoriesLoader: function() {
        this.showLoaderOnComponent(this.containers.category, "Loading Categories...");  
	},
	
	/**
	 * render loader for products by categories
	 */
	renderProductsListLoader:function(){
	    this.showLoaderOnComponent(this.containers.product, "Loading Products...");
	},
	
	/**
	 * Renders the products list panel where the products are displayed
	 * @param model Model to render
	 * @param selectedSort Sort selected for the list
	 */
	renderProductListPanel: function(model, selectedSort){
		this.applyTemplate(this.containers.product, "#categoryProducts_panel",{headerTitle: model.categories.displayName, sortOptions: this.sortOptions, selectedSort: selectedSort});
		// If the model has no products shows a loading message
		if(!model.productsList){
			this.applyTemplate("#products_list", "#loader",{message: "Loading Products..."});
		}
	},
	
	/**
	 * compile template for product list
	 */
	renderProductList: function(model) {
		var categoryName;
		this.productListWidget.setProductsList(model.productsList);
		this.productListWidget.setTitle(model.categories.displayName);
		this.productListWidget.render(false);
	},
	
	/**
	 * compile template for product list
	 */
	renderProductListError: function(error) {
		// If an error occurs it hides the sort combo
		this.getParentElement().find(".sort").hide();  
		this.applyTemplate("#products_list", "#resourceNotFoundTemplate",error);
	},
	
	/**
	 * compile template for the categories
	 */
	renderCategories: function(model) {
		var categories;
		if(model.categories.categories){
			categories =  model.categories.categories.category;
		}else{
			categories =  model.categories.categories;
		}
		this.applyTemplate(this.containers.category,"#categoryLeftMenu", {"categories" : categories});      
	}, 
	
	/**
	 * Renders the Categories
	 */
	render : function(){
		this.applyTemplate(this.elementSelector,this.layoutTemplate);
	},
	
	/**
	 * Clears the models setted to the view
	 */
	reset: function() {
		this._super();
		this.productListWidget.reset();
	}, 	
	
	/**
	 * Applies Pagination to the products list
	 */
	applyPagination:function(totalPageResult,pageActive){
		this.appendTemplate("#products_list", "#paginationTemplate", {totalResultPages:totalPageResult,pageActive:pageActive, pageClass:'productByCategoy'});		
	}
});