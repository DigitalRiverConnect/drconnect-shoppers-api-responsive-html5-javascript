var ns = namespace('dr.api.dummy');
/**
 * Product resource dummy
 */

/**
 * Getting an specific Product from the list
 */
ns.getProduct = function(id) {
	var products = dr.api.dummy.products;
	return products[id];
};

ns.getProductByUri = function(uri) {
	var productId = uri.substring(uri.lastIndexOf("/") + 1).split("?")[0];

	return this.getProduct(productId);
};

ns.listProductsByCategory = function(id) {
	var productsByCategory = dr.api.dummy.productsByCategory;
	return productsByCategory[id];
};
/*
 * List of products for getting an specific one by parameter
 * GET http://mockapi.com/v1/shoppers/me/products/57618400?expand=product
 */
ns.products = {
	"248216500" : {
		"product" : {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/products/248216500",
			"id" : 248216500,
			"name" : "Jukebox licence",
			"displayName" : "Jukebox licence",
			"shortDescription" : "Collect, organize and play. It's that simple. ",
			"longDescription" : "Best file organization of any digital music jukebox, Connect your Android or PlaysForSure device and Play all popular music files, and audio podcasts\n",
			"productType" : "DOWNLOAD",
			"sku" : "Jukeboxlicence",
			"externalReferenceNumber" : null,
			"displayableProduct" : "true",
			"purchasable" : "true",
			"manufacturerName" : null,
			"manufacturerPartNumber" : null,
			"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/jukeboxbox.jpg",
			"productImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/detail/joke.png",
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 1.5
				},
				"listPriceWithQuantity" : {
					"currency" : "USD",
					"value" : 1.5
				},
				"salePriceWithQuantity" : {
					"currency" : "USD",
					"value" : 1.35
				},
				"formattedListPrice" : "$1.50",
				"formattedListPriceWithQuantity" : "$1.50",
				"formattedSalePriceWithQuantity" : "$1.35"
			},
			"addProductToCart" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248216500"
			},
			"purchaseProduct" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248216500/purchase"
			}
		}
	},
	"248217200" : {
		"product" : {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/products/248217200",
			"id" : 248217200,
			"name" : "Sing Network Admin Professional",
			"displayName" : "Sing Network Admin Professional",
			"shortDescription" : "The Sing Network Admin Professional Assistant is a useful reference for any on-the-go network administrator",
			"longDescription" : "The Sing Network Admin Professional Assistant is a useful reference for any on-the-go network administrator, all in the palm of your hand. This tool will allow you to perform TCP/IP calculations and conversions, generate passwords, and estimate data transfer times. Filled with wireless and satellite information, this app will be a useful and interesting",
			"productType" : "DOWNLOAD",
			"sku" : "Sing Network Admin Professional",
			"externalReferenceNumber" : null,
			"displayableProduct" : "true",
			"purchasable" : "true",
			"manufacturerName" : null,
			"manufacturerPartNumber" : null,
			"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/RedBox.jpg",
			"productImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/detail/red.png",
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 2
				},
				"listPriceWithQuantity" : {
					"currency" : "USD",
					"value" : 2
				},
				"salePriceWithQuantity" : {
					"currency" : "USD",
					"value" : 1.8
				},
				"formattedListPrice" : "$2.00",
				"formattedListPriceWithQuantity" : "$2.00",
				"formattedSalePriceWithQuantity" : "$1.80"
			},
			"addProductToCart" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248217200"
			},
			"purchaseProduct" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248217200/purchase"
			}
		}
	},
	"248217400" : {
		"product" : {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/products/248217400",
			"id" : 248217400,
			"name" : "PhotoshopView",
			"displayName" : "PhotoshopView",
			"shortDescription" : "Edit, organize, store, and share photos",
			"longDescription" : "Edit, organize, store, and share photos ? all online.\nIt's digital imaging wherever you are",
			"productType" : "DOWNLOAD",
			"sku" : "PhotoshopView",
			"externalReferenceNumber" : null,
			"displayableProduct" : "true",
			"purchasable" : "true",
			"manufacturerName" : null,
			"manufacturerPartNumber" : null,
			"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/PhotoshopViewBox.jpg",
			"productImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/detail/Photoshopview.png",
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 3
				},
				"listPriceWithQuantity" : {
					"currency" : "USD",
					"value" : 3
				},
				"salePriceWithQuantity" : {
					"currency" : "USD",
					"value" : 2.7
				},
				"formattedListPrice" : "$3.00",
				"formattedListPriceWithQuantity" : "$3.00",
				"formattedSalePriceWithQuantity" : "$2.70"
			},
			"addProductToCart" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248217400"
			},
			"purchaseProduct" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248217400/purchase"
			}
		}
	},
	"248254000" : {
		"product" : {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/products/248254000",
			"id" : 248254000,
			"name" : "MovieViewer",
			"displayName" : "MovieViewer",
			"shortDescription" : "Plays everything",
			"longDescription" : "MovieViewer is a cross-platform multimedia player and framework that plays most multimedia files as well as DVD, Audio CD, VCD, and various streaming protocols. ",
			"productType" : "DOWNLOAD",
			"sku" : "Movie Viewer",
			"externalReferenceNumber" : null,
			"displayableProduct" : "true",
			"purchasable" : "true",
			"manufacturerName" : null,
			"manufacturerPartNumber" : null,
			"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/MovieViewer.jpg",
			"productImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/detail/MovieViewer.png",
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 4
				},
				"listPriceWithQuantity" : {
					"currency" : "USD",
					"value" : 4
				},
				"salePriceWithQuantity" : {
					"currency" : "USD",
					"value" : 3.6
				},
				"formattedListPrice" : "$4.00",
				"formattedListPriceWithQuantity" : "$4.00",
				"formattedSalePriceWithQuantity" : "$3.60"
			},
			"addProductToCart" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248254000"
			},
			"purchaseProduct" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248254000/purchase"
			}
		}
	},
	"248254100" : {
		"product" : {
			"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
			"uri" : "http://mockapi.com/v1/shoppers/me/products/248254100",
			"id" : 248254100,
			"name" : "FastPictureViewer",
			"displayName" : "FastPictureViewer",
			"shortDescription" : "FastPictureViewer designed for photographers",
			"longDescription" : "FastPictureViewer Professional, a 64-bit photo viewer designed for photographers, with Adobe XMP compliant rating system, powerful batch file processing functions and photographer's features: IPTC Editor, RGB histogram, Color Management, EXIF, Tethered Shooting and ultrafast RAW previewing.",
			"productType" : "DOWNLOAD",
			"sku" : "FastPictureViewer",
			"externalReferenceNumber" : null,
			"displayableProduct" : "true",
			"purchasable" : "true",
			"manufacturerName" : null,
			"manufacturerPartNumber" : null,
			"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/FastPictureView.jpg",
			"productImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/detail/flash.png",
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 5
				},
				"listPriceWithQuantity" : {
					"currency" : "USD",
					"value" : 5
				},
				"salePriceWithQuantity" : {
					"currency" : "USD",
					"value" : 4.5
				},
				"formattedListPrice" : "$5.00",
				"formattedListPriceWithQuantity" : "$5.00",
				"formattedSalePriceWithQuantity" : "$4.50"
			},
			"addProductToCart" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=248254100"
			},
			"purchaseProduct" : {
				"relation" : "http://dev.digitalriver.com/api-overview/ProductAPI",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248254100/purchase"
			}
		}
	},
	"250460700" : {
		"product" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/products/250460700",
			"id" : 250460700,
			"name" : "PeripheralDevice",
			"displayName" : "PeripheralDevice",
			"shortDescription" : "Hard Drive ",
			"longDescription" : "Hard drives are classified as non-volatile, random access, digital, magnetic, data storage devices. Hard disk drives have decreased in cost and physical size over the years while dramatically increasing in capacity and speed.",
			"productType" : "PHYSICAL",
			"sku" : "PeripheralDevice",
			"externalReferenceNumber" : null,
			"displayableProduct" : "true",
			"purchasable" : "true",
			"manufacturerName" : null,
			"manufacturerPartNumber" : null,
			"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/adding-a-hard-disk-1-1.jpg",
			"productImage" : null,
			"pricing" : {
				"listPrice" : {
					"currency" : "USD",
					"value" : 250.00
				},
				"salePriceWithQuantity" : {
					"currency" : "USD",
					"value" : 225.00
				},
				"formattedListPrice" : "$250.00",
				"formattedSalePriceWithQuantity" : "$225.00"
			},
			"addProductToCart" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/carts/active/line-items?productId=250460700"
			},
			"purchaseProduct" : {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250460700/purchase"
			}
		}
	}
};

/*
 * List of products for getting an specific one by parameter
 * GET http://mockapi.com/v1/shoppers/me/categories/57618400/products?expand=product
 */
ns.productsByCategory = {
	"57618400" : {
		"products" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/products",
			"product" : [{
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248217200",
				"id" : 248217200,
				"displayName" : "Network Admin Professional",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/RedBox.jpg",
				"pricing" : {
					"formattedListPrice" : "$2.00",
					"formattedSalePriceWithQuantity" : "$1.80"
				}
			}, {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/248217400",
				"id" : 248217400,
				"displayName" : "Photo Editor",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/PhotoshopViewBox.jpg",
				"pricing" : {
					"formattedListPrice" : "$3.00",
					"formattedSalePriceWithQuantity" : "$2.70"
				}
			}, {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250622200",
				"id" : 250622200,
				"displayName" : "Headphones",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/headphones80x80.jpg",
				"pricing" : {
					"formattedListPrice" : "$60.00",
					"formattedSalePriceWithQuantity" : "$60.00"
				}
			}],
			"totalResults" : 3,
			"totalResultPages" : 1
		}
	},
	"58812700" : {
		"products" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/products",
			"product" : [{
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250617600",
				"id" : 250617600,
				"displayName" : "The Wall Pack",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/wall350x300.jpg",
				"pricing" : {
					"formattedListPrice" : "$30.00",
					"formattedSalePriceWithQuantity" : "$30.00"
				}
			}, {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250633900",
				"id" : 250633900,
				"displayName" : "Bond Anti Spyware",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/bond80x80.jpg",
				"pricing" : {
					"formattedListPrice" : "$15.00",
					"formattedSalePriceWithQuantity" : "$15.00"
				}
			}, {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250634200",
				"id" : 250634200,
				"displayName" : "Advance Internet Toolkit",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/toolkit80x80.jpg",
				"pricing" : {
					"formattedListPrice" : "$17.00",
					"formattedSalePriceWithQuantity" : "$17.00"
				}
			}],
			"totalResults" : 3,
			"totalResultPages" : 1
		}
	},
	"58950000" : {
		"products" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/products",
			"product" : [{
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250615900",
				"id" : 250615900,
				"displayName" : "Car Race Game",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/carrace80x80.jpg",
				"pricing" : {
					"formattedListPrice" : "$100.00",
					"formattedSalePriceWithQuantity" : "$100.00"
				}
			}, {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250616200",
				"id" : 250616200,
				"displayName" : "Adventure Game",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/adventure80x80.jpg",
				"pricing" : {
					"formattedListPrice" : "$130.00",
					"formattedSalePriceWithQuantity" : "$130.00"
				}
			}, {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250616500",
				"id" : 250616500,
				"displayName" : "Tennis Game",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/Tennis80x80.jpg",
				"pricing" : {
					"formattedListPrice" : "$110.00",
					"formattedSalePriceWithQuantity" : "$110.00"
				}
			}],
			"totalResults" : 3,
			"totalResultPages" : 1
		}
	},
	"58812800" : {
		"products" : {
			"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
			"uri" : "http://mockapi.com/v1/shoppers/me/products",
			"product" : [{
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250616900",
				"id" : 250616900,
				"displayName" : "Image Editor",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/imageEditor80x80.jpg",
				"pricing" : {
					"formattedListPrice" : "$99.00",
					"formattedSalePriceWithQuantity" : "$99.00"
				}
			}, {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250617100",
				"id" : 250617100,
				"displayName" : "Video Editor",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/videoEditor80x80.jpg",
				"pricing" : {
					"formattedListPrice" : "$150.00",
					"formattedSalePriceWithQuantity" : "$150.00"
				}
			}, {
				"relation" : "http://developer.digitalriver.com/v1/shoppers/ProductsResource",
				"uri" : "http://mockapi.com/v1/shoppers/me/products/250617200",
				"id" : 250617200,
				"displayName" : "Music Player",
				"thumbnailImage" : "http://drh1.img.digitalriver.com/DRHM/Storefront/Company/aqued/images/product/thumbnail/musicPlayer80x80.jpg",
				"pricing" : {
					"formattedListPrice" : "$80.00",
					"formattedSalePriceWithQuantity" : "$80.00"
				}
			}],
			"totalResults" : 3,
			"totalResultPages" : 1
		}
	}
};
