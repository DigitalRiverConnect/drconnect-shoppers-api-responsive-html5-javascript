var ns = namespace('dr.api.service');

/**
 * Service Manager for Offer Resource
 */
ns.OfferService = ns.BaseService.extend({
    
    uri: ns.URI.OFFERS,
    
    /**
     * Gets the offers for a POP 
     */
    list: function(popName, parameters, callbacks) {
        var uri = replaceTemplate(this.uri, {'popName':popName});

        return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
    },
    
    /**
     * Gets an offer
     */
    get: function(popName, offerId, parameters, callbacks) {
        var uri = replaceTemplate(this.uri, {'popName':popName}) + '/' + offerId;

        return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
    }
});