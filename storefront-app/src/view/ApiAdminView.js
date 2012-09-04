var ns = namespace('dr.acme.view');

/**
 * API Admin View
 * 
 * Will render the model in different ways depending on the function
 * called. They replace the html template in the layout specified
 * with the provided model
 * 
 */
ns.ApiAdminView =  ns.BaseView.extend({
    /**
     * Name of the root element for this view
     */
    elementSelector: "#contentArea",
    layoutTemplate: "#apiAdminTemplate",
    /**
     * Events this view dispatches
     */
    events: {
        REFRESH_TOKEN: "refreshToken"
    },
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {
        this.addDomHandler("#btnRefreshToken", "click", this.onRefreshTokenButtonClick);
    },
    /**
     * "Add to Cart" button click handler
     */
    onAddToCartButtonClick: function(e) {
        this.dispatchEvent(this.events.REFRESH_TOKEN);
    },
    /**
	 * Render loader or the actual product
	 */
	render: function() {
	   var api = this.model;
	   api.tokenType = (api.authenticated)?"Full Access Token":"Limited Access Token";
	   api.tokenExpirationTime = new Date(api.tokenExpirationTime*1000).toString();
       this.applyTemplateToRoot(this.layoutTemplate, api);
       //this.applyTemplate(".productDetail", "#productDetailTemplateLoaded", {product: this.getProduct()});    
	},
	
	/**
	 * Product detail rendering
	 */
	setSessionInfo: function(model) {
	    this.model = model;
	}
});