var ns = namespace('dr.api.dummy');

/**
 * Dynamic Dummy Cart which can be updated for testing purposes
 */
ns.Cart = function(){
	this.info = dr.api.dummy.cartExpandAll;
}

/**
 * Getting the Dynamic Dummy Cart
 */
ns.Cart.prototype.get = function(product){
	return this.info;
}

/**
 * Adding a new Product to the Dynamic Dummy Cart
 */
ns.Cart.prototype.addLineItem = function(uri, params){

	var productId = uri.split('?')[1].split('&')[0].split('=')[1];
	
	//Check if was already added and update
	var item = this.getLineItem(productId);
	
	this.updateItemQuantity(item, item.quantity + parseInt(params.quantity));
	
	this.updateCartTotals();
	
	this.updateCartPaymentMehtod(productId);
	
	return this.info.cart.lineItems;
}

/**
 * Remove a Product from the Dynamic Dummy Cart
 */
ns.Cart.prototype.removeLineItem = function(lineItemUri){
    
    for (var pos = 0; pos < this.info.cart.lineItems.lineItem.length; pos++) {
    	var uri = this.info.cart.lineItems.lineItem[pos].uri.replace(dr.api.connection.URI.BASE_URL, "");
    	if(uri == lineItemUri){
    		this.info.cart.lineItems.lineItem.splice(pos, 1);
    	}
    }	
    
    this.updateCartTotals();
    
    return {}; //Status 200 OK returned with no body
}

/**
 * Generate a line item to be added
 */
ns.Cart.prototype.generateLineItem = function(productId){

	//Get Product object from dummy
	var product = dr.api.dummy.getProduct(productId).product; 
	
	//New LineItem with that Product
	var item = JSON.parse(JSON.stringify(dr.api.dummy.lineItemToAdd));

	item.lineItem.id = dr.api.dummy.Cart.prototype.generateId();
	item.lineItem.uri = dr.api.connection.URI.BASE_URL + dr.api.service.URI.CART_LINE_ITEMS + '/' + item.lineItem.id; 
	item.lineItem.quantity = 0;
	
	item.lineItem.product.uri = product.uri;
	item.lineItem.product.displayName = product.displayName;
	item.lineItem.product.thumbnailImage = product.thumbnailImage;

	item.lineItem.pricing.listPrice.value = product.pricing.listPrice.value;
	item.lineItem.pricing.listPriceWithQuantity.value = 0;
	item.lineItem.pricing.salePriceWithQuantity.value = 0;
	
	item.lineItem.pricing.formattedListPrice = "$" + item.lineItem.pricing.listPrice.value.toFixed(2); 
	item.lineItem.pricing.formattedListPriceWithQuantity = "$" + item.lineItem.pricing.listPriceWithQuantity.value.toFixed(2);
	item.lineItem.pricing.formattedSalePriceWithQuantity = "$" + item.lineItem.pricing.salePriceWithQuantity.value.toFixed(2);
	
	return item.lineItem;	
}

ns.Cart.prototype.updateCartTotals = function() {
    var cart = this.info.cart;
    var subtotal = 0;
    
    for(var i = 0; i < cart.lineItems.lineItem.length; i ++) {
        var item = cart.lineItems.lineItem[i];
        subtotal += item.pricing.salePriceWithQuantity.value;
    }
    
    cart.pricing.subtotal.value = subtotal;
    cart.pricing.orderTotal.value = subtotal;
    
    cart.pricing.formattedSubtotal = "$" + cart.pricing.subtotal.value.toFixed(2);
    cart.pricing.formattedOrderTotal = "$" + cart.pricing.orderTotal.value.toFixed(2);
     
}

/**
 * This method updates Payment Method for cart. It checks if the product is PHYSICAL looking for the productID 
 * in order to set a Valid Shipping Method. If the product is a Digital one, it does nothing
 * Once the shipping method is setted never comes back to none even though the PHYSICAL product es removed from the
 * cart
 *  
 */
ns.Cart.prototype.updateCartPaymentMehtod = function(productId) {
    var cart = this.info.cart;
    
    if(productId == '250460700'){
    	cart.shippingMethod.code = 	1806100;
    	cart.shippingMethod.description = "EconomyPostal - US";
    }
     
}

ns.Cart.prototype.updateItemQuantity = function(item, quantity) {
    item.quantity = parseInt(quantity);
    
    var product = dr.api.dummy.getProductByUri(item.product.uri).product;

    item.pricing.listPriceWithQuantity.value = item.pricing.listPrice.value * item.quantity;
    item.pricing.salePriceWithQuantity.value = product.pricing.salePriceWithQuantity.value * item.quantity;

    item.pricing.formattedListPrice = "$" + item.pricing.listPrice.value.toFixed(2); 
    item.pricing.formattedListPriceWithQuantity = "$" + item.pricing.listPriceWithQuantity.value.toFixed(2);
    item.pricing.formattedSalePriceWithQuantity = "$" + item.pricing.salePriceWithQuantity.value.toFixed(2);
}

/**
 * Check Product existence at Cart and update quantity
 */
ns.Cart.prototype.getLineItem = function(productId){
	
	//Product uri to compare the product at the line items
	var uri = dr.api.connection.URI.BASE_URL + dr.api.connection.URI.VERSION + '/' + 
			  dr.api.service.URI.PRODUCTS + '/' + productId;
			  
	var lineItems = this.info.cart.lineItems.lineItem;

	if(lineItems){
		for(var pos = 0; pos < lineItems.length; pos++){
			if (lineItems[pos].product.uri == uri){
				return lineItems[pos];
			}
		}
	}
	var item = this.generateLineItem(productId);
    this.info.cart.lineItems.lineItem.push(item);
	
	return item;
}

/**
 * Generate a random number to use as an id
 */
ns.Cart.prototype.generateId = function(){
	return Math.floor((Math.random()*1000000)+1);
}

/**
 * Cleaning Cart after submitting
 */
ns.Cart.prototype.clean = function(){
	this.info.cart.lineItems.lineItem = [];
	this.info.cart.pricing.formattedOrderTotal = '';
	this.info.cart.pricing.formattedSubtotal = '';
	this.info.cart.pricing.subtotal.value = 0;
    this.info.cart.pricing.orderTotal.value = 0;
    this.info.cart.totalQuantity = 0;
    
    return {}; // Status 200 OK returned with no body
}

/*
 * Adding a product to the cart
 * ie: POST http://mockapi.com/v1/shoppers/me/carts/active/line-items?productid=248216500&offerid=2384691608
 */
ns.cartAddToCart = {
  "LineItems":  {
    "relation": "http://dev.digitalriver.com/api-overview/LineItemsAPI",
    "uri": "http://mockapi.com/v1/shoppers/me/carts/active/line-items",
    "LineItem":  [{
      "relation": "http://dev.digitalriver.com/api-overview/LineItemAPI",
      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/line-items/12472639519"
    }]
  }
};

/*
 * Getting line items
 * ie: GET http://mockapi.com/v1/shoppers/me/carts/active/line-items
 */
ns.cartLineItems = {
  "LineItems":  {
    "relation": "http://dev.digitalriver.com/api-overview/LineItemsAPI",
    "uri": "http://mockapi.com/v1/shoppers/me/carts/active/line-items",
    "LineItem":  [{
      "relation": "http://dev.digitalriver.com/api-overview/LineItemAPI",
      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/line-items/12472639519"
    }]
  }
};

/*
 * Getting Cart Info
 * ie: GET http://mockapi.com/v1/shoppers/me/carts/active
 */
ns.cart = {
   "cart":  {
    "relation": "http://dev.digitalriver.com/api-overview/CartsAPI",
    "uri": "http://mockapi.com/v1/shoppers/me/carts/active",
    "id": 10651073019,
    "lineItems":  {
      "relation": "http://dev.digitalriver.com/api-overview/LineItemsAPI",
      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/line-items"
    },
    "billingAddress":  {
      "relation": "http://dev.digitalriver.com/api-overview/AddressAPI",
      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/billing-address"
    },
    "shippingAddress":  {
      "relation": "http://dev.digitalriver.com/api-overview/AddressAPI",
      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/shipping-address"
    },
    "payment": null,
    "shippingMethod":  {
      "code": null,
      "description": null
    },
    "shippingOptions":  {
      "relation": "http://dev.digitalriver.com/api-overview/ShippingOptionsAPI",
      "uri": "http://mockapi.com/v1/shoppers/me/shipping-options"
    },
    "pricing":  {
      "subtotal": null,
      "discount": null,
      "shippingAndHandling": null,
      "tax": null,
      "orderTotal": null,
      "formattedSubtotal": null,
      "formattedDiscount": null,
      "formattedShippingAndHandling": null,
      "formattedTax": null,
      "formattedOrderTotal": null
    }
  }	
 
 
};

/*
 * Getting Cart Info Expanded
 * ie: GET http://mockapi.com/v1/shoppers/me/carts/active?expand=all
 */
ns.cartExpandAll = {
  "cart":  {
    "relation": "http://dev.digitalriver.com/api-overview/CartsAPI",
    "uri": "http://mockapi.com/v1/shoppers/me/carts/active",
    "id": 10650515919,
    "lineItems": {
      	"lineItem":	[]
    	},
    "billingAddress":  {
      "relation": "http://developers.digitalriver.com/v1/shoppers/BillingAddressResource",
      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/billing-address",
      "id": "billingAddress",
      "firstName": "Keith",
      "lastName": "Kester",
      "companyName": null,
      "line1": "9625 W 76th St",
      "line2": "Suite 150",
      "line3": null,
      "city": "Eden Prairie",
      "countrySubdivision": "MN",
      "postalCode": 55344,
      "country": "US",
      "countryName": "United States",
      "phoneNumber": "504-737-7941",
      "countyName": null
    },
    "shippingAddress":  {
      "relation": "http://developers.digitalriver.com/v1/shoppers/ShippingAddressResource",
      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/shipping-address",
      "id": "shippingAddress",
      "firstName": "Keith",
      "lastName": "Kester",
      "companyName": null,
      "line1": "9625 W 76th St",
      "line2": "Suite 150",
      "line3": null,
      "city": "Eden Prairie",
      "countrySubdivision": "MN",
      "postalCode": 55344,
      "country": "US",
      "countryName": "United States",
      "phoneNumber": "504-737-7941",
      "countyName": null
    },
    "payment": {
      "name": "Visa",
      "displayableNumber": "************1111",
      "expirationMonth": 7,
      "expirationYear": 2018
    },
    "shippingMethod":  {
      "code": null,
      "description": null
    },
    "shippingOptions":  {
      "relation": "http://dev.digitalriver.com/api-overview/ShippingOptionsAPI",
      "uri": "http://mockapi.com/v1/shoppers/me/shipping-options"
    },
    "pricing":  {
      "subtotal":  {
        "currency": "USD",
        "value": 0
      },
      "discount":  {
        "currency": "USD",
        "value": ""
      },
      "shippingAndHandling":  {
        "currency": "USD",
        "value": ""
      },
      "tax":  {
        "currency": "USD",
        "value": ""
      },
      "orderTotal":  {
        "currency": "USD",
        "value": 0
      },
      "formattedSubtotal": "$0.00",
      "formattedDiscount": "$0.00",
      "formattedShippingAndHandling": "$0.00",
      "formattedTax": "$0.00",
      "formattedOrderTotal": "$0.00"
    }
  }
};

/*
 * Line item to be added at the Cart 
 */
ns.lineItemToAdd = {
      "lineItem":  {
      "relation": "http://dev.digitalriver.com/api-overview/LineItemAPI",
      "uri": "",
      "id": "",
      "quantity": 0,
      "product":  {
        "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
        "uri": "",
        "displayName": "",
        "thumbnailImage": ""
      },
      "pricing":  {
        "listPrice":  {
          "currency": "USD",
          "value": 0
        },
        "listPriceWithQuantity":  {
          "currency": "USD",
          "value": 0
        },
        "salePriceWithQuantity":  {
          "currency": "USD",
          "value": 0
        },
        "formattedListPrice": "",
        "formattedListPriceWithQuantity": "",
        "formattedSalePriceWithQuantity": ""
      }
    }
	
};

//http://mockapi.com/v1/shoppers/me/carts/active/line-items/12462040119?expand=product.name,product.thumbnail-image
//http://mockapi.com/v1/shoppers/me/carts/active/line-items/12462040119?expand=product
