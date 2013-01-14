define(['service/BaseService', 'Config'], function(BaseService, Config) {
    /**
     * Service Manager for Cart Resource
     */
    return BaseService.extend({
        uri: Config.service.URI.CART,
        
        /**
         * Adds a Line Item
         * @param product: Product to add to the cart
         * @addToCartUri: (Optional) Uri to add the product to the cart. If it is informed the service uses this uri to add
         * the product to the cart, otherwise it uses product.addProductToCart.uri. Usefull for adding a product which is part of
         * and offer
         * @param parameters
         * @param callback service response
         */
        addLineItem: function(product, addToCartUri, parameters, callbacks) {
            var uri;
            if(addToCartUri){
                uri = addToCartUri;
            }else{
                uri = product.addProductToCart.uri;
            }
            return this.makeRequest(this.session.create(uri, parameters), callbacks);
        },
        
        /**
         * Adds a Line Item
         * @param product: Product to add to the cart
         * @addToCartUri: (Optional) Uri to add the product to the cart. If it is informed the service uses this uri to add
         * the product to the cart, otherwise it uses product.addProductToCart.uri. Usefull for adding a product which is part of
         * and offer
         * @param parameters
         * @param callback service response
         */
        addMultipleLineItems: function(parameters, lineItemsList, callbacks) {
        	var uri = Config.service.URI.CART_LINE_ITEMS;
            return this.makeRequest(this.session.create(uri, parameters, lineItemsList), callbacks);
        },
        
        /**
         * Retrurns the cart
         * @param parameters
         * @param callback service response (cart)
         */
        get: function(parameters, callbacks) {
            return this.makeRequest(this.session.retrieve(this.uri, parameters), callbacks);
        },
        
         /**
         * Updates the cart with the parameters specified. It sends a POST to the API
         * @param parameters
         * @param callback service response (cart)
         */
        updateCart: function(parameters, callbacks) {
            return this.makeRequest(this.session.create(this.uri, parameters), callbacks);
        },
        
        /**
         * Removes a Line Item
         * @param lineItem to remove
         * @param parameters
         * @param callback service response
         */
        removeLineItem: function(lineItem, parameters, callbacks){
            return this.makeRequest(this.session.remove(lineItem.uri, parameters), callbacks);  
        },
        
        /**
         * Edits the quantity of a Line Item
         * @param lineItem to edit
         * @param parameters
         * @param callback service response
         */
        editLineItemQuantity: function(lineItem, parameters, callbacks){
            return this.makeRequest(this.session.create(lineItem.uri, parameters), callbacks);  
        },
        
        /**
         * Gets the shipping options for a cart
         * @param parameters
         * @param callback service response
         */
        getShippingOptions: function(parameters, callbacks){
            var uri = Config.service.URI.CART_SHIPPING_OPTIONS;
            
            return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
        },
        
        /**
         * Gets the offers for a cart, depending on the product added to it
         * @popName The name of the Point Of Promotion containing the offers
         * @param parameters
         * @param callback service response
         */
        getOffers: function(popName, parameters, callbacks, errorHandled){
            var uri = this.replaceTemplate(Config.service.URI.CART_OFFERS, {'popName':popName});
            
            return this.makeRequest(this.session.retrieve(uri, parameters), callbacks, errorHandled);
        },
        
        /**
         * Applies shipping option to cart
         * @param parameters
         * @param callback service response
         */
        applyShippingOption: function(parameters, callbacks){
            var uri = Config.service.URI.CART_APPLY_SHIPPING_OPTION;
            
            return this.makeRequest(this.session.create(uri, parameters), callbacks);
        },
        
        /**
         * Applies shopper options to the cart
         */
        applyShopper: function(parameters, callbacks) {
            var uri = Config.service.URI.CART_APPLY_SHOPPER;
            
            return this.makeRequest(this.session.create(uri, parameters), callbacks);
        },
        
        /**
         * Submits a cart
         */
        submit: function(parameters, callbacks) {
            var uri = Config.service.URI.CART_SUBMIT;
            
            return this.makeRequest(this.session.create(uri, parameters), callbacks);
        }
    });
});