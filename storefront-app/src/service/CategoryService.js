var ns = namespace('dr.acme.service');

/**
 * Service Manager for Category Resource
 */
ns.CategoryService = Class.extend({
	
	/**
     * 
     */
	init: function(client) {
    	this.client = client;
    	this.categories = {};
	},
	
	/**
     * params: parameters
     * return categories 
     */
    getCategories: function (params){      
        if(this.rootCategories) {
            console.debug("Using cached version of the root categories");
            return this.rootCategories;
        }
        console.debug("Calling DR getRootCategories service");
        var defer = new $.Deferred();
        var that = this;
        this.client.categories.list({"expand": "category"}, function(data) {
            that.rootCategories = data.category;

            // Cache response
            that.cacheCategories(that.rootCategories); 

            defer.resolve(data.category);
        });
        return defer.promise();
    },
    /**
     * Caches an array of categories by id
     */
    cacheCategories: function(categories) {
        for(var i = 0; i < categories.length; i++) {
            this.cacheCategory(categories[i]);
        }
    },
    /**
     * Caches a category
     */
    cacheCategory: function(category, fullVersion) {
    	category.fullVersion = fullVersion;
    	this.categories[category.id] = category;
    	
    },
    /**
     * Returns a cached category
     * Decides if can return the cached category depending if fullVersion is needed
     */
    getCachedCategory: function(id, fullVersion) {
    	var category = this.categories[id];
    	// If category is cached decide if it can be returned if fullVersion is requiered
    	if(category && ((fullVersion && category.fullVersion) || !fullVersion)){
    		return category;
    	}
        return null;
    },
    /**
     * Get a category by Id
     */
    getCategoryById: function(id, fullVersion) {
    	// Check cache first
    	console.debug("Calling DR getCategoryById service");
        var category = this.getCachedCategory(id, fullVersion);
        if(category) {
            return category;
        }
        
        var defer = new $.Deferred();
        var that = this;
        
        var params = {};
        if(fullVersion){
        	params = {"expand": "categories.category"};
        }
        this.client.categories.get(id, params, {success: function(category) {
            // Cache the category
            that.cacheCategory(category, fullVersion);
            defer.resolve(category);
        }, error: function(data){
        	defer.reject(data);
        }, callDefaultErrorHandler: true});
        return defer.promise();
    }

});
	
