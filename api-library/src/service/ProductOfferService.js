define(['service/BaseService', 'Config'], function(BaseService, Config) {
    /**
     * Service Manager for Offer Resource
     */
    return BaseService.extend({
        
        uri: Config.service.URI.PRODUCT_OFFERS,
        
        /**
         * Gets a product offer list
         */
        list: function(popName, offerId, parameters, callbacks, errorHandled) {
            var uri = this.replaceTemplate(this.uri, {'popName':popName, 'offerId':offerId});
    
            return this.makeRequest(this.session.retrieve(uri, parameters), callbacks, errorHandled);
        },
        
        /**
         * Gets an offer with its products
         */
        get: function(popName, offerId, id, parameters, callbacks) {
            var uri = this.replaceTemplate(this.uri, {'popName':popName, 'offerId':offerId}) + '/' + id;
    
            return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
        }
    });
});