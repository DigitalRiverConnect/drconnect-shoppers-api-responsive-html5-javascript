var ns = namespace('dr.acme.view');

/**
 * ProductLineItem Widget
 * 
 * Renders a Product Line Item
 * 
 */
ns.ProductLineItemWidget =  ns.Widget.extend({
    layoutTemplate: "#productLineItem_widget",
	
	/**
	 * Sets the Product to Render 
	 */
    setProduct: function(model) {
        this.model = model;
    },
	
	/**
	 * Gets the Product
	 */    
    getProduct: function() {
        return this.model;
    },
    
});