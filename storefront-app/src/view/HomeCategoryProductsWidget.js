var ns = namespace('dr.acme.view');

/**
 * Home category widget
 * 
 * Renders a category and its first 3 products
 * 
 */
ns.HomeCategoryProductsWidget =  ns.Widget.extend({
    layoutTemplate: "#featured-category-products-template",
    /**
     * Sets products for Widget
     */
    setProducts: function(products) {
        this.model = {products: products};
    },
    /**
     * Gets products
     */
    getProducts: function() {
       return this.model.products;  
    },
    /**
     * Sets the parent Widget
     */
    setParent: function(parent) {
        this.parent = parent;
    },
    /**
     * Renders the widget
     */
    render: function(append) {
       	this.elementSelector = this.parent;
       	this._super(append);
    }, 
    
    /**
     * Renders the widget with an error or an empty message in it
     */
    renderErrorOrEmpty: function(error){
    	if(this.getElement()) {
            this.getElement().remove();
        }
    	this.appendTemplate(this.parent, "#featured-category-products-error-empty", error);
    }
    
    
    
});