var ns = namespace('dr.acme.view');

/**
 * Address Widget
 * 
 * Renders one address
 * 
 */
ns.AddressWidget =  ns.Widget.extend({
    layoutTemplate: "#address_summary_widget",
    displayTitle : true,
    applyClasses:true,
    
    /**
     * Sets the address to render
     */
    setAddress: function(model) {
        this.model = model;
    },
    
    /**
     * Sets the quantity of address widgets to render to determine a responsive behaviour
     */
    setQuantity: function(value) {
    	this.getAddress().quantity = value;
    },
    
    /**
     * Gets the quantity of address widgets to render to determine a responsive behaviour
     */
    getQuantity: function() {
    	return this.getAddress().quantity; 
    },
    
    /**
     * Gets the address to render
     */
    getAddress: function() {
        return this.model;
    },
    
    /**
     * Determines if the title is shown in the widget or it is hidden
     */
    showTitle:function(show){
    	this.displayTitle = show;
    },
    
    /**
     * Renders the address
     */
    render: function(append) {
    	if(this.modelIsDefined()){
    		this.getAddress().showTitle = this.displayTitle;
    		this.getAddress().applyClasses = this.applyClasses;
    		this.getAddress().quantity = this.getQuantity();
    	}    	
    	this._super(append);
    }
    
    
});