var ns = namespace('dr.api.service');

/**
 * Service Manager for Offer Resource
 */
ns.ProductOfferService = ns.BaseService.extend({
    
    uri: ns.URI.PRODUCT_OFFERS,
    
    /**
     * Gets a product offer list
     */
    list: function(popName, offerId, parameters, callbacks) {
        var uri = replaceTemplate(this.uri, {'popName':popName, 'offerId':offerId});

        return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
    },
    
    /**
     * Gets an offer with its products
     */
    get: function(popName, offerId, id, parameters, callbacks) {
    	var uri = replaceTemplate(this.uri, {'popName':popName, 'offerId':offerId}) + '/' + id;

        return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
    }
});