var ns = namespace('dr.api.dummy');
/**
 * Offer resource dummy
 */

/**
 * Getting a Product Offer from the list
 */
ns.getProductOffer = function(id) {
	var productOffers = dr.api.dummy.productOffer;
	return productOffers[id];
};

/*
 * Getting Product Offers
 * ie: GET shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers?expand=productOffer
 */
ns.productOffers = {
	"productOffers" : {
		"relation" : "http://dev.digitalriver.com/api-overview/ProductOffersAPI",
		"uri" : "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers",
		"productOffer" : [{
			"relation" : "http://dev.digitalriver.com/api-overview/ProductOfferAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/248216500",
			"id" : 248216500,
			"product" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248216500",
				"displayName" : "Jukebox licence",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/jukeboxbox.jpg"
			},
			"addProductToCart" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248216500&offerId=2384691608"
			},
			"salesPitch" : null,
			"image" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/jukebox.jpg",
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 1.5
				},
				"listPriceWithQuantity" : {
					"currency" : "USD",
					"value" : 1.5
				},
				"salePrice" : {
					"currency" : "USD",
					"value" : 1.35
				},
				"formattedListPrice" : "$1.50",
				"formattedListPriceWithQuantity" : "$1.50"
			}
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductOfferAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/248217200",
			"id" : 248217200,
			"product" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248217200",
				"displayName" : "Sing Network Admin Professional",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/RedBox.jpg"
			},
			"addProductToCart" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248217200&offerId=2384691608"
			},
			"salesPitch" : null,
			"image" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/red.jpg",
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 2.0
				},
				"listPriceWithQuantity" : {
					"currency" : "USD",
					"value" : 2.0
				},
				"salePrice" : {
					"currency" : "USD",
					"value" : 1.8
				},
				"formattedListPrice" : "$2.00",
				"formattedListPriceWithQuantity" : "$2.00"
			}
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductOfferAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/248217400",
			"id" : 248217400,
			"product" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248217400",
				"displayName" : "PhotoshopView",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/PhotoshopViewBox.jpg"
			},
			"addProductToCart" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248217400&offerId=2384691608"
			},
			"salesPitch" : null,
			"image" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/Photoshopview.jpg",
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 3.0
				},
				"listPriceWithQuantity" : {
					"currency" : "USD",
					"value" : 3.0
				},
				"salePrice" : {
					"currency" : "USD",
					"value" : 2.7
				},
				"formattedListPrice" : "$3.00",
				"formattedListPriceWithQuantity" : "$3.00"
			}
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductOfferAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/248254000",
			"id" : 248254000,
			"product" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248254000",
				"displayName" : "MovieViewer",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/MovieViewer.jpg"
			},
			"addProductToCart" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248254000&offerId=2384691608"
			},
			"salesPitch" : null,
			"image" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/Movieviewer.jpg",
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 4.0
				},
				"listPriceWithQuantity" : {
					"currency" : "USD",
					"value" : 4.0
				},
				"salePrice" : {
					"currency" : "USD",
					"value" : 3.6
				},
				"formattedListPrice" : "$4.00",
				"formattedListPriceWithQuantity" : "$4.00"
			}
		}, {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductOfferAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/248254100",
			"id" : 248254100,
			"product" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248254100",
				"displayName" : "FastPictureViewer",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/FastPictureView.jpg"
			},
			"addProductToCart" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248254100&offerId=2384691608"
			},
			"salesPitch" : null,
			"image" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/FastPictureViewer.jpg",
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 5.0
				},
				"listPriceWithQuantity" : {
					"currency" : "USD",
					"value" : 5.0
				},
				"salePrice" : {
					"currency" : "USD",
					"value" : 4.5
				},
				"formattedListPrice" : "$5.00",
				"formattedListPriceWithQuantity" : "$5.00"
			}
		}, {
			"relation":"http://developer.digitalriver.com/v1/shoppers/ProductOffersResource",
			"uri":"http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/250460700",
			"id":250460700,
			"product":{
				"relation":"http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri":"http://mockapi.com/v1/shoppers/me/products/250460700",
				"displayName":"PeripheralDevice",
				"thumbnailImage":"http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/adding-a-hard-disk-1-1.jpg"
			},
			"addProductToCart":{
				"relation":"http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri":"http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=250460700&offerId=2384691608"
			},
			"salesPitch":null,
			"image":"http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/Amor-imposible-800x300.jpg",
			"pricing":{
				"listPrice":{
					"currency":"USD",
					"value":250
				},
				"salePriceWithQuantity":{
					"currency":"USD",
					"value":225
				},
				"formattedListPrice":"$250.00",
				"formattedSalePriceWithQuantity":"$225.00"
			}
		}]
	}
};

/*
 * Getting a Product Offer list for retrieving an specific one
 */
ns.productOffer = {
	"248216500" : {
	  "productOffer":  {
	    "relation": "http://dev.digitalriver.com/api-overview/ProductOfferAPI",
	    "uri": "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/248216500",
	    "id": 248216500,
	    "product":  {
	      "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
	      "uri": "http://mockapi.com/v1/shoppers/me/products/248216500",
	      "displayName": "Jukebox licence",
	      "thumbnailImage": "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/jukeboxbox.jpg"
	    },
	    "addProductToCart":  {
	      "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
	      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248216500&offerId=2384691608"
	    },
	    "salesPitch": null,
	    "image": "http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/jukebox.jpg",
	    "pricing":  {
	      "listPrice":  {
	        "currency": "USD",
	        "value": 1.5
	      },
	      "listPriceWithQuantity":  {
	        "currency": "USD",
	        "value": 1.5
	      },
	      "salePriceWithQuantity":  {
	        "currency": "USD",
	        "value": 1.35
	      },
	      "formattedListPrice": "$1.50",
	      "formattedListPriceWithQuantity": "$1.50",
	      "formattedSalePriceWithQuantity": "$1.35"
	    }
	  }
	},
	"248217200" : {
	  "productOffer":  {
	    "relation": "http://dev.digitalriver.com/api-overview/ProductOfferAPI",
	    "uri": "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/248217200",
	    "id": 248217200,
	    "product":  {
	      "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
	      "uri": "http://mockapi.com/v1/shoppers/me/products/248217200",
	      "displayName": "Sing Network Admin Professional",
	      "thumbnailImage": "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/RedBox.jpg"
	    },
	    "addProductToCart":  {
	      "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
	      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248217200&offerId=2384691608"
	    },
	    "salesPitch": null,
	    "image": "http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/red.jpg",
	    "pricing":  {
	      "listPrice":  {
	        "currency": "USD",
	        "value": 2
	      },
	      "listPriceWithQuantity":  {
	        "currency": "USD",
	        "value": 2
	      },
	      "salePriceWithQuantity":  {
	        "currency": "USD",
	        "value": 1.8
	      },
	      "formattedListPrice": "$2.00",
	      "formattedListPriceWithQuantity": "$2.00",
	      "formattedSalePriceWithQuantity": "$1.80"
	    }
	  }
	},
	"248217400" : {
	  "productOffer":  {
	    "relation": "http://dev.digitalriver.com/api-overview/ProductOfferAPI",
	    "uri": "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/248217400",
	    "id": 248217400,
	    "product":  {
	      "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
	      "uri": "http://mockapi.com/v1/shoppers/me/products/248217400",
	      "displayName": "PhotoshopView",
	      "thumbnailImage": "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/PhotoshopViewBox.jpg"
	    },
	    "addProductToCart":  {
	      "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
	      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248217400&offerId=2384691608"
	    },
	    "salesPitch": null,
	    "image": "http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/Photoshopview.jpg",
	    "pricing":  {
	      "listPrice":  {
	        "currency": "USD",
	        "value": 3
	      },
	      "listPriceWithQuantity":  {
	        "currency": "USD",
	        "value": 3
	      },
	      "salePriceWithQuantity":  {
	        "currency": "USD",
	        "value": 2.7
	      },
	      "formattedListPrice": "$3.00",
	      "formattedListPriceWithQuantity": "$3.00",
	      "formattedSalePriceWithQuantity": "$2.70"
	    }
	  }
	},
	"248254000" : {
	  "productOffer":  {
	    "relation": "http://dev.digitalriver.com/api-overview/ProductOfferAPI",
	    "uri": "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/248254000",
	    "id": 248254000,
	    "product":  {
	      "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
	      "uri": "http://mockapi.com/v1/shoppers/me/products/248254000",
	      "displayName": "MovieViewer",
	      "thumbnailImage": "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/MovieViewer.jpg"
	    },
	    "addProductToCart":  {
	      "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
	      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248254000&offerId=2384691608"
	    },
	    "salesPitch": null,
	    "image": "http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/Movieviewer.jpg",
	    "pricing":  {
	      "listPrice":  {
	        "currency": "USD",
	        "value": 4
	      },
	      "listPriceWithQuantity":  {
	        "currency": "USD",
	        "value": 4
	      },
	      "salePriceWithQuantity":  {
	        "currency": "USD",
	        "value": 3.6
	      },
	      "formattedListPrice": "$4.00",
	      "formattedListPriceWithQuantity": "$4.00",
	      "formattedSalePriceWithQuantity": "$3.60"
	    }
	  }
	},
	"248254100" : {
	  "productOffer":  {
	    "relation": "http://dev.digitalriver.com/api-overview/ProductOfferAPI",
	    "uri": "http://mockapi.com/v1/shoppers/me/point-of-promotions/Banner_ShoppingCartLocal/offers/2384691608/product-offers/248254100",
	    "id": 248254100,
	    "product":  {
	      "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
	      "uri": "http://mockapi.com/v1/shoppers/me/products/248254100",
	      "displayName": "FastPictureViewer",
	      "thumbnailImage": "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/FastPictureView.jpg"
	    },
	    "addProductToCart":  {
	      "relation": "http://dev.digitalriver.com/api-overview/ProductAPI",
	      "uri": "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248254100&offerId=2384691608"
	    },
	    "salesPitch": null,
	    "image": "http://drh1.img.digitalriver.com/DRHM/Storefront/Site/aqued/images/promo/FastPictureViewer.jpg",
	    "pricing":  {
	      "listPrice":  {
	        "currency": "USD",
	        "value": 5
	      },
	      "listPriceWithQuantity":  {
	        "currency": "USD",
	        "value": 5
	      },
	      "salePriceWithQuantity":  {
	        "currency": "USD",
	        "value": 4.5
	      },
	      "formattedListPrice": "$5.00",
	      "formattedListPriceWithQuantity": "$5.00",
	      "formattedSalePriceWithQuantity": "$4.50"
	    }
	  }
	}
};

