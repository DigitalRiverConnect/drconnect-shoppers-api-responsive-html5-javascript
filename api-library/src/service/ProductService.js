define(['service/BaseService', 'Config'], function(BaseService, Config) {
    /**
     * Service Manager for Product Resource
     */
    return BaseService.extend({
        uri: Config.service.URI.PRODUCTS,
    
        /**
         * list Products by Category 
         */
        listProductsByCategory: function(id, parameters, callbacks){
            var uri = this.replaceTemplate(Config.service.URI.PRODUCTS_BY_CATEGORY, {'categoryId':id});
        
            return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
        },
        
        /**
         * search Products by keyword 
         */
        search: function(parameters, callbacks){
            var uri = Config.service.URI.PRODUCTS_SEARCH;
        
            return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
        },
        
        /**
         * get Products by productIds 
         */
        getProductsByIds: function(parameters, callbacks){
            return this.makeRequest(this.session.retrieve(this.uri, parameters), callbacks);
        },
        
                
        /**
         * Returns the offers for a product
         */
         getOffersForProduct: function(productId, popName, parameters, callbacks, errorHandled){
			var uri = this.replaceTemplate(Config.service.URI.OFFERS_FOR_PRODUCT, {'productId':productId ,'popName':popName});
			
			return this.makeRequest(this.session.retrieve(uri, parameters), callbacks, errorHandled);
         }
    });
});