var ns = namespace('dr.api.connection');
var constants = namespace('dr.api.service');

/**
 * This object simulates the Apigee connection. It will provide
 * CRUD calls for the resources required 
 */
ns.DummyConnection = function(){
	console.log("Using DummyConnection");
	
	//Set an instance of an empty Cart
	this.cart = new dr.api.dummy.Cart();
	// this.shopper = new dr.api.dummy.Shopper();
	this.parameters = {};
}

/**
 * Retrieve
 */
ns.DummyConnection.prototype.retrieve = function(url, urlParams, headerParams){
   
   var id = (url.split('/'))[(url.split('/')).length-1];
   id = id.split("?")[0];
   // dr.api.connection.DummyConnection.prototype._extractParameters(url);
   url = url.replace(dr.api.connection.URI.BASE_URL, "");
   url = url.replace(dr.api.connection.URI.VERSION + "/", "");
   var defer = Q.defer();
   switch(url)
   {
       case dr.api.connection.URI.ANONYMOUS_LOGIN:
       		var item = {"access_token":"4d0a62689a57b837b4fdaa8374088560"};
            defer.resolve(item);
       break;
       
       case replaceTemplate(dr.api.service.URI.PRODUCT_OFFERS, {popName:'Banner_ShoppingCartLocal', offerId:'2384691608'}):
            defer.resolve(dr.api.dummy.productOffers);
       break;
       
       case replaceTemplate(dr.api.service.URI.PRODUCT_OFFERS, {popName:'Banner_ShoppingCartLocal', offerId:'2384691608'}) + '/' + id:
            defer.resolve(dr.api.dummy.getProductOffer(id));
       break;
	   
	   case constants.URI.CATEGORIES:
            defer.resolve(dr.api.dummy.categoriesExpandCategory);
       break;
       
       case constants.URI.CATEGORIES + '/' + id:
            defer.resolve(dr.api.dummy.category[id]);
       break;
       
       case constants.URI.PRODUCTS:
            defer.resolve(dr.api.dummy.products);
       break;
       
       case constants.URI.PRODUCTS + "/" + id:
            defer.resolve(dr.api.dummy.getProduct(id));
       break;
       
       case constants.URI.CART:
       		//FIXME: check this dummy response due to apigee refactor
            defer.resolve(this.cart.get());
       break;
       
       case replaceTemplate(dr.api.service.URI.PRODUCTS_BY_CATEGORY, {'categoryId':id}):
            defer.resolve(dr.api.dummy.listProductsByCategory(id));
       break;
       
       case constants.URI.SHOPPER:
           defer.resolve(dr.api.dummy.shopperExpandAll);
       break;
       
       case constants.URI.ORDERS:
           defer.resolve(dr.api.dummy.shopperOrdersExpandAll);
       break;
       
       case constants.URI.ORDERS + '/' + id:
           defer.resolve(dr.api.dummy.orderDetail(id));
       break;
       
       case constants.URI.ADDRESS:
           defer.resolve(dr.api.dummy.addressExpandAll);
       break;
       
       default:
            defer.reject({error: {code: "404", description:"invalid URI " + url}});
   }

   return defer.promise;

}

/**
 * create
 */
ns.DummyConnection.prototype.create = function(uri, uriParams, headerParams){
	
   	uri = uri.replace(dr.api.connection.URI.BASE_URL, "");
   	uri = uri.replace(dr.api.connection.URI.VERSION + "/", "");
   	var defer = Q.defer();

	// FIXME: refactor of this into a switch case once is refactored on the retrieve method
   	if(uri.indexOf(dr.api.service.URI.CART_LINE_ITEMS) == 0) {
		defer.resolve(this.cart.addLineItem(uri, uriParams));
   	
   	} else if (uri == dr.api.service.URI.CART){
   		
		defer.resolve(this.cart.get());
		
	} else if (uri.indexOf(dr.api.service.URI.ORDERS) == 0){

		defer.resolve(this.cart.clean());
	
	} else {
		defer.reject({error: {message:"invalid URI " + uri}});
	}

	return defer.promise;
}

/**
 * Update
 */
ns.DummyConnection.prototype.update = function(uri, uriParams, headerParams){
    this.request(uri, 'PUT', data);
}

/**
 * Delete / Remove
 */
ns.DummyConnection.prototype.remove = function(uri, uriParams, headerParams){
    
	uri = uri.replace(dr.api.connection.URI.BASE_URL, "");
	uri = uri.replace(dr.api.connection.URI.VERSION + "/", "");
   	var defer = Q.defer();

   	if(uri.indexOf(dr.api.service.URI.CART) == 0){
   		
		defer.resolve(this.cart.removeLineItem(uri));
		
	} else {
		defer.reject({error: {message:"invalid URI " + uri}});
	}

	return defer.promise;
}

/**
 * Builds a Map of all parameters exracting them from the URL
 * TODO: Method is Unfinished (this.parameters notDefined error)
 */
ns.DummyConnection.prototype._extractParameters = function(url){
	 var arrayUrl = url.split('/');
	 var entity;
	 for (var pos=0; pos < arrayUrl.length; pos++){
	 	entity = arrayUrl[pos];
	 	if(entity == "product-offers" || entity ==  "categories" || entity ==  "products" || entity ==  "line-items"){
	 		if(pos != arrayUrl.length -1){
	 			this.parameters[entity] = arrayUrl[++pos];
	 		}
	 	}
	 }
}
