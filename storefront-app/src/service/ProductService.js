var ns = namespace('dr.acme.service');

/**
 * Service Manager for Product Resource
 */
ns.ProductService = Class.extend({
	
	init: function(client) {
	    this.client = client;
    	this.products = {};
    	// Implement 2 different caches 1 for 3 products shown in home page and the other used for caching all products by category
    	this.first3CategoryProducts = {};
    	this.categoryProducts = {};
	},
	
	/**
     * return promotional product from api library
     */
	getPromotionalProducts: function(params) {
	    
        if(this.productOffers) {
            console.debug("Using cached version of the product offers (featured products)");
            return this.productOffers; 
        }
        var defer = new $.Deferred();
        
        var that = this;
        console.debug("Calling DR getProductOffers (featured products) service");
        var popName = dr.acme.application.config.featuredProducts.pop;
        var offerId = dr.acme.application.config.featuredProducts.offer;
        this.client.productOffers.list(popName, offerId, {"expand": "productOffer"}, function(data) {
             that.productOffers = data.productOffer;
             defer.resolve(data.productOffer);
        });
        return defer.promise();	    
	},
	   
    /**
     * id: parameter
     * return productById 
     */
    getProductById: function (id, fullVersion) {
        var defer = new $.Deferred();
        var that = this;
        
        var p = this.getCachedProduct(id, fullVersion);
        if(p) {
            return p;
        }
        
        this.client.products.get(id, {}, function(data) {
            that.cacheProduct(data, true);
            defer.resolve(data);
        });     
        return defer.promise();     
    }, 
    
    /**
     * id: parameter
     * return productsByCategory
     */
    listProductsByCategory: function(id, pageNumber, pageSize, sort){
        // If there's no pageNumber passed, get the first page
        if(!pageNumber) pageNumber = 1;
        
                 
        //Check cache first. If sort parameter is informed the cached
		// results are ignored and request them to de service
       if(!sort){
	       var products = this.getCachedProductsByCategory(id, pageNumber, pageSize);
	       if(products) {
	           return products;
	       }
	   }

    	var params = { expand: 'product', pageNumber: pageNumber};
    	
    	// If there's a page size, send it
    	if(pageSize) params.pageSize = pageSize;
    	
    	if(sort && sort.field && sort.field != "") {
    	    params.sort = sort.field;
    	    if(sort.direction && sort.direction != "") params.sort += "-" + sort.direction;
    	}
    	
    	var that = this;
    	var defer = new $.Deferred();
    	this.client.products.listProductsByCategory(id, params, function(data) {
    	    if(data.product) {
        	    that.cacheProductsByCategory(id, pageNumber, pageSize, data);
        	    that.cacheProducts(data.product);
    	    }
            defer.resolve(data);
        });     
        return defer.promise(); 
    },
    
    /**
     * keyword: parameter
     * return productsByKeyword
     */
    searchProduct:function(keyword, pageNumber, pageSize){
    	
    	// Set params
    	var params = { expand: 'product', keyword: keyword};
    	
    	
    	
    	var that = this;
    	var defer = new $.Deferred();
    	console.debug("Calling DR productSearch service");
    	
    	this.client.products.search(params, function(data) {
    		if(typeof data.product != 'undefined'){
    			// If pageSize and pageNumber are set
    	    	if(pageSize) params.pageSize = pageSize;
    	    	if(pageNumber) params.pageNumber = pageNumber;
    			var ids = that.concatIdsFromProducts(data.product);
    			that.client.products.getProductsByIds({'productIds':ids, expand:'product', pageSize:pageSize, pageNumber:pageNumber}, function(products){
    	             		defer.resolve(products);	
    	            })
    		}else{
    			defer.resolve(data);
    		}
        });     
        return defer.promise(); 
    },
    
    /**
     * Return the cached products for a category
     * pageSize = null means all products al fetched (no paging)
     */
    getCachedProductsByCategory: function(categoryId, page, pageSize) {
    	var products;
    	if(pageSize == 3 ){
    		products = this.first3CategoryProducts[categoryId + "-p" + page];	
    	}else{
    		products = this.categoryProducts[categoryId + "-p" + page];
    	}
    	
    	return products;
    },
    
    /**
     * Cache the association between a category and its products
     * Set the pageSize to data to determine in next requests if service can return cached products
     */
    cacheProductsByCategory: function(categoryId, page, pageSize, data) {
    	if(pageSize == 3){
			return this.first3CategoryProducts[categoryId + "-p" + page] = data;
    	}else{
        	return this.categoryProducts[categoryId + "-p" + page] = data;
        }
    },
    
    /**
     * Cache a product.
     * @param fullVersion determines whether the product is the full version or a subset of the entity
     */
    cacheProduct: function(product, fullVersion) {
        if(!fullVersion) fullVersion = false;
        
        // If there's a full version already cached, don't cache it again
        if(this.getCachedProduct(product.id, true)) return;
        
        product.fullVersion = fullVersion; 
        this.products[product.id] = product;
    },
    
    /**
     * Caches a list of products. The products cached are assumed to be non-full versions
     */
    cacheProducts: function(products) {
        for(var i = 0; i < products.length; i++) {
            this.cacheProduct(products[i], false);
        }
    },
    
    /**
     * Returns a cached product by id
     */
    getCachedProduct: function(productId, mustBeFullVersion) {
        var p = this.products[productId];
        // If the product is not required to be the full version or the version found is full, return it 
        if(!mustBeFullVersion || (p && p.fullVersion)) {
            return p;
        }
        
        // Otherwise, return nothing
        return null;
    }, 
	
	/**
	 * Returns a string with all productIds existent in the products collection separated with commas
	 */    
    concatIdsFromProducts:function(products){
    	var result ='';
    	for(var i in products) {
    		result += products[i].id + ',';    			
    	}
    	return result;
    }
});