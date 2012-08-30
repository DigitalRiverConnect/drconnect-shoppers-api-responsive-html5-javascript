var ns = namespace('dr.acme.view');

/**
 * Candy Rack Widget
 * 
 * Renders a Product List with the items on the Candy Rack
 * 
 */
ns.CandyRackWidget =  ns.Widget.extend({
    layoutTemplate: "#shoppingCartCandyRack_widget",
    init: function(parent, model) {
    	this._super(parent, model);
    	this.setLoadingMessage("Loading Candy Rack...");
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
     * Renders the candyRack. If the candyRack is empty it hides its parentElement
     */
    render: function(append) {
    	if(this.modelIsDefined() && !this.getProductsList().productOffer){
    		this.getParentElement().hide();
    	 }else{
    	 	this.getParentElement().show();
    		this._super(append);
    	}
    },
    
    /**
     * Renders an error message on the candy rack if there is a failure
     */
    renderError: function(error){
    	this.applyTemplate("#candyRack", "#shoppingCartCandyRackError_widget", error);	
    }
    
    
});