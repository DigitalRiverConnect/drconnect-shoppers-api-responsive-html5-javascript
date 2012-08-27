var ns = namespace('dr.acme.view');

/**
 * Cart View
 * 
 * Will render the model in different ways depending on the function
 * called. They replace the html template in the layout specified
 * with the provided model
 * 
 */
ns.ShoppingCartLineItemRenderer =  ns.ItemRenderer.extend({	
    elementType: "tr",
    templateName: "#shopingCartItemTemplate",
    events: {
    	REMOVE_FROM_CART: dr.acme.runtime.NOTIFICATION.REMOVE_FROM_CART
    },
    
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {    	
        this.addDomHandler(".js_remove", "click", this.showConfirmRemove);        
        this.addDomHandler(".js_confirmRemoveFromCart", "click", this.onRemoveToCartButtonClick);        
    },
    
    /**
     * Remove line item from Cart on button click handler
     */
    showConfirmRemove: function(self,elem) {
    	console.debug($(self.currentTarget).addClass('toRemove'));
    	this.showMessage(null, null, dr.acme.runtime.MessageType.CONFIRM, "Are you sure want to delete this product ?");    	
    }
});