var service = namespace('dr.api.service');

/**
 * Service Manager for Product Resource
 */
ns.ProductService = ns.BaseService.extend({
    uri: ns.URI.PRODUCTS,

    /**
     * list Products by Category 
     */
    listProductsByCategory: function(id, parameters, callbacks){
    	var uri = replaceTemplate(dr.api.service.URI.PRODUCTS_BY_CATEGORY, {'categoryId':id});
    
	    return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
	},
	
	/**
     * search Products by keyword 
     */
    search: function(parameters, callbacks){
    	var uri = dr.api.service.URI.PRODUCTS_SEARCH;
    
	    return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
	},
	
	/**
     * get Products by productIds 
     */
    getProductsByIds: function(parameters, callbacks){
	    return this.makeRequest(this.session.retrieve(this.uri, parameters), callbacks);
	}
});

	

