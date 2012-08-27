var ns = namespace('dr.acme.view');

/**
 * My Account View
 * 
 * Will render the model in different ways depending on the function
 * called. They replace the html template in the layout specified
 * with the provided model
 * 
 */
ns.MyAccountView =  ns.BaseView.extend({
    /**
     * Name of the root element for this view
     */
    elementSelector: "#contentArea",
    layoutTemplate: "#myAccountTemplate",
    
    /**
     * Events this view dispatches
     */
    events: {
        //This view doesn't have notifications
    },
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {
        //This view doesn't have notifications
    },
    /**
     * Set the addresses
     */
    setAddresses: function(model) {
    	if(!this.modelIsDefined()){
    		this.model = {};
    	}
        this.model.addresses = model;
    },
    /**
     * Get the addresses
     */
    getAddresses: function() {
		if(this.modelIsDefined()){
			return this.model.addresses;	
		}else{
			return null;
		}
       
    },
    /**
     * Uses Address Widget to render addresses in MyAccount View
     */
	renderAddress:function(){
	    if(this.getAddresses()) {
	       $("#address").html("<h3>Addresses</h3>");
	       this.renderCollection(this.getAddresses(), dr.acme.view.AddressWidget, "#address",true);
	    } else {
	        this.showLoaderOnComponent("#address", "Loading Address Information...");
	    }
	}, 
	/**
     * Renders a collection using the provided widget class
     */
    renderCollection: function(collection, widgetClass, parentElement, append) {
        if(!append) {
            $(parentElement).html("");
        }
        if(!collection.length){
        	$(parentElement).append("<p> No Addresses to show</p>");
        }else{
	        for(var i = 0; i < collection.length; i++) {
	            var widget = new widgetClass(parentElement, collection[i]);
	            widget.setQuantity(collection.length);
	            widget.render(true);
	        }
	     }
    },
    /**
     * Renders personal information for the shopper
     */
	renderPersonalInf:function(model){
		console.log(model);
		this.applyTemplate("#personalInf", "#myAccount_widget", model);
	}, 
	
	/**
	 * Render loader for personal information
	 */
	renderPersonalInfLoader: function() {
		this.applyTemplate("#personalInf", "#loader",{message: "Loading Personal Information..."});      
	}
});