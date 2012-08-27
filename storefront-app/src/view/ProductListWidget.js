var ns = namespace('dr.acme.view');

/**
 * ProductList Widget
 * 
 * Renders a Product List it contains ProductLineItems
 * 
 */
ns.ProductListWidget =  ns.Widget.extend({
    layoutTemplate: "#productList_widget",
    init: function(parent, model, title) {
    	this._super(parent, model);
    	this.setTitle(title);
	},
	/**
	 * Sets the product List to Render
	 */
    setProductsList: function(model) {
        this.model = model;
    },
    /**
     * Gets the product list
     */
    getProductsList: function() {
        return this.model;
    },
    /**
     * Gets the title shown in the product list
     */
    getTitle: function(){
    	return this.title;
    },
    /**
     * Sets the title to show in the products list
     */
    setTitle: function(title){
    	this.title = title;
    },
    /**
     * Renders product list
     */
    render: function(append) {
    	this._super(append);
    	// If there are no products show an empty message
    	if(!this.getProductsList().product){
    		this.applyTemplate(this.getParent(), "#productListEmpty_widget", {});	
    	}else{
    		// Render products
    		this.renderCollection(this.getProductsList().product, dr.acme.view.ProductLineItemWidget, "#product_lineItems",true);
    	}
    }
    
    
});