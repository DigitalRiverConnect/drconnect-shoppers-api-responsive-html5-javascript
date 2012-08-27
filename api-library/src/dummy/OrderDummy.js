var ns = namespace('dr.api.dummy');

/**
 * Getting an specific Order from the list
 */
ns.orderDetail = function(id) {
	for(var i in this.shopperAllOrders.orders) {
		if(this.shopperAllOrders.orders[i].id === parseInt(id))
			return this.shopperAllOrders.orders[i];
	}
};
//find order by id
ns.shopperAllOrders = {
	orders : [{
		relation : "http://developer.digitalriver.com/api-overview/OrdersResource",
		uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500",
		id : 12385168842,
		submissionDate : "2012-03-08T17:30:43.000Z",
		displayName : "New Order 1",
		pricing : {
			currency : "USD",
			value : 42.90,
			subtotal : {
				currency : "USD",
				value : 39.99
			},
			tax : {
				currency : "USD",
				value : 2.91
			}
		},
		payment : {
			customerLastName : "Tester",
			customerFirstName : "Automation",
			paymentAmount : {
				currency : "USD",
				value : 42.90
			},
			paymentMethodName : "visa"

		},
		orderState : "In Process",
		billingAddress : {
			relation : "http://developer.digitalriver.com/api-overview/AddressesResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/billing-address"
		},
		shippingAddress : {
			relation : "http://developer.digitalriver.com/api-overview/AddressesResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/shipping-address"
		},
		lineItems : {
			relation : "http://developer.digitalriver.com/api-overview/LineItemsResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/line-items",
			lineItem : {
				relation : "http://developer.digitalriver.com/api-overview/LineItemsAPI",
				uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/line-items/12281280400",
				id : 12281280400,
				quantity : 1,
				product : {
					relation : "http://developer.digitalriver.com/api-overview/ProductsResource",
					uri : "http://api.digitalriver.com/v1/shoppers/me/products/64358400",
					displayName : "Class III"
				},
				pricing : {
					listPrice : {
						currency : "USD",
						value : 39.99
					},
					listPriceWithQuantity : {
						currency : "USD",
						value : 39.99
					},
					salePrice : {
						currency : "USD",
						value : 39.99
					}
				}

			}
		}

	}, {
		relation : "http://developer.digitalriver.com/api-overview/OrdersResource",
		uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500",
		id : 12385168850,
		submissionDate : "2012-03-08T17:30:43.000Z",
		displayName : "New Order 2",
		pricing : {
			currency : "USD",
			value : 42.90,
			subtotal : {
				currency : "USD",
				value : 39.99
			},
			tax : {
				currency : "USD",
				value : 2.91
			}
		},
		payment : {
			customerLastName : "Tester",
			customerFirstName : "Automation",
			paymentAmount : {
				currency : "USD",
				value : 42.90
			},
			paymentMethodName : "visa"

		},
		orderState : "In Process",
		billingAddress : {
			relation : "http://developer.digitalriver.com/api-overview/AddressesResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/billing-address"
		},
		shippingAddress : {
			relation : "http://developer.digitalriver.com/api-overview/AddressesResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/shipping-address"
		},
		lineItems : {
			relation : "http://developer.digitalriver.com/api-overview/LineItemsResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/line-items",
			lineItem : {
				relation : "http://developer.digitalriver.com/api-overview/LineItemsAPI",
				uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/line-items/12281280400",
				id : 12281280400,
				quantity : 1,
				product : {
					relation : "http://developer.digitalriver.com/api-overview/ProductsResource",
					uri : "http://api.digitalriver.com/v1/shoppers/me/products/64358400",
					displayName : "Class III"
				},
				pricing : {
					listPrice : {
						currency : "USD",
						value : 39.99
					},
					listPriceWithQuantity : {
						currency : "USD",
						value : 39.99
					},
					salePrice : {
						currency : "USD",
						value : 39.99
					}
				}

			}
		}

	}, {
		relation : "http://developer.digitalriver.com/api-overview/OrdersResource",
		uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500",
		id : 12385168789540,
		submissionDate : "2012-03-08T17:30:43.000Z",
		displayName : "New Order 3",
		pricing : {
			currency : "USD",
			value : 42.90,
			subtotal : {
				currency : "USD",
				value : 39.99
			},
			tax : {
				currency : "USD",
				value : 2.91
			}
		},
		payment : {
			customerLastName : "Tester",
			customerFirstName : "Automation",
			paymentAmount : {
				currency : "USD",
				value : 42.90
			},
			paymentMethodName : "visa"

		},
		orderState : "In Process",
		billingAddress : {
			relation : "http://developer.digitalriver.com/api-overview/AddressesResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/billing-address"
		},
		shippingAddress : {
			relation : "http://developer.digitalriver.com/api-overview/AddressesResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/shipping-address"
		},
		lineItems : {
			relation : "http://developer.digitalriver.com/api-overview/LineItemsResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/line-items",
			lineItem : {
				relation : "http://developer.digitalriver.com/api-overview/LineItemsAPI",
				uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/line-items/12281280400",
				id : 12281280400,
				quantity : 1,
				product : {
					relation : "http://developer.digitalriver.com/api-overview/ProductsResource",
					uri : "http://api.digitalriver.com/v1/shoppers/me/products/64358400",
					displayName : "Class III"
				},
				pricing : {
					listPrice : {
						currency : "USD",
						value : 39.99
					},
					listPriceWithQuantity : {
						currency : "USD",
						value : 39.99
					},
					salePrice : {
						currency : "USD",
						value : 39.99
					}
				}

			}
		}

	}, {
		relation : "http://developer.digitalriver.com/api-overview/OrdersResource",
		uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500",
		id : 1238516854887415,
		submissionDate : "2012-03-08T17:30:43.000Z",
		displayName : "New Order 4",
		pricing : {
			currency : "USD",
			value : 42.90,
			subtotal : {
				currency : "USD",
				value : 39.99
			},
			tax : {
				currency : "USD",
				value : 2.91
			}
		},
		payment : {
			customerLastName : "Tester",
			customerFirstName : "Automation",
			paymentAmount : {
				currency : "USD",
				value : 42.90
			},
			paymentMethodName : "visa"

		},
		orderState : "In Process",
		billingAddress : {
			relation : "http://developer.digitalriver.com/api-overview/AddressesResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/billing-address"
		},
		shippingAddress : {
			relation : "http://developer.digitalriver.com/api-overview/AddressesResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/shipping-address"
		},
		lineItems : {
			relation : "http://developer.digitalriver.com/api-overview/LineItemsResource",
			uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/line-items",
			lineItem : {
				relation : "http://developer.digitalriver.com/api-overview/LineItemsAPI",
				uri : "http://api.digitalriver.com/v1/shoppers/me/orders/10433221500/line-items/12281280400",
				id : 12281280400,
				quantity : 1,
				product : {
					relation : "http://developer.digitalriver.com/api-overview/ProductsResource",
					uri : "http://api.digitalriver.com/v1/shoppers/me/products/64358400",
					displayName : "Class III"
				},
				pricing : {
					listPrice : {
						currency : "USD",
						value : 39.99
					},
					listPriceWithQuantity : {
						currency : "USD",
						value : 39.99
					},
					salePrice : {
						currency : "USD",
						value : 39.99
					}
				}

			}
		}

	}]

};

ns.shopperOrdersExpandAll = {
	orders : {
		relation : "http://developers.digitalriver.com/v1/shoppers/OrdersResource",
		uri : "http://mockapi.com/v1/shoppers/mehttp://developers.digitalriver.com/v1/shoppers/OrdersResource",
		totalResults : "4",
		order : [{
			submissionDate : "2012-03-08T17:30:43.000Z",
			relation : "http://developers.digitalriver.com/v1/shoppers/OrdersResource",
			uri : "http://mockapi.com/v1/shoppers/me/orders/12385168842",
			id : 12385168842,
			locale : "en_US",
			optIn : false,
			testOrder : true,
			taxExempt : false,
			pricing : {
				total : {
					currency : "USD",
					value : 650.09
				},
				subtotal : {
					currency : "USD",
					value : 500.99
				},
				tax : {
					currency : "USD",
					value : 4.15
				},
				shipping : {
					currency : "USD",
					value : 6.95
				}
			},
			payment : {
				customerLastName : "Kester",
				customerFirstName : "Keith",
				paymentAmount : {
					currency : "USD",
					value : 61.09
				},
				paymentMethodName : "visa"
			},
			orderState : "Complete",
			billingAddress : {
				relation : "http://developers.digitalriver.com/v1/shoppers/BillingAddressResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/billing-address",
				id : "billingAddress",
				firstName : "Keith",
				lastName : "Kester",
				companyName : "",
				line1 : "9625 W 76th St",
				line2 : "Suite 150",
				line3 : "",
				city : "Eden Prairie",
				countrySubdivision : "MN",
				postalCode : 55344,
				country : "US",
				countryName : "United States",
				phoneNumber : "504-737-7941"
			},
			shippingAddress : {
				relation : "http://developers.digitalriver.com/v1/shoppers/ShippingAddressResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/shipping-address",
				id : "shippingAddress",
				firstName : "Keith",
				lastName : "Kester",
				companyName : "",
				line1 : "9625 W 76th St",
				line2 : "Suite 150",
				line3 : "",
				city : "Eden Prairie",
				countrySubdivision : "MN",
				postalCode : 55344,
				country : "US",
				countryName : "United States",
				phoneNumber : 504 - 737 - 7941
			},
			lineItems : {
				relation : "http://developers.digitalriver.com/v1/shoppers/LineItemsResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/line-items"
			}

		}, {
			relation : "http://developers.digitalriver.com/v1/shoppers/OrdersResource",
			uri : "http://mockapi.com/v1/shoppers/me/orders/12385168842",
			id : 12385168850,
			submissionDate : "2012-03-08T17:30:43.000Z",
			locale : "en_US",
			optIn : false,
			testOrder : true,
			taxExempt : false,
			pricing : {
				total : {
					currency : "USD",
					value : 800.15
				},
				subtotal : {
					currency : "USD",
					value : 600
				},
				tax : {
					currency : "USD",
					value : 4.15
				},
				shipping : {
					currency : "USD",
					value : 6.95
				}
			},
			payment : {
				customerLastName : "Kester",
				customerFirstName : "Keith",
				paymentAmount : {
					currency : "USD",
					value : 61.09
				},
				paymentMethodName : "visa"
			},
			orderState : "In Process",
			billingAddress : {
				relation : "http://developers.digitalriver.com/v1/shoppers/BillingAddressResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/billing-address",
				id : "billingAddress",
				firstName : "Keith",
				lastName : "Kester",
				companyName : "",
				line1 : "9625 W 76th St",
				line2 : "Suite 150",
				line3 : "",
				city : "Eden Prairie",
				countrySubdivision : "MN",
				postalCode : 55344,
				country : "US",
				countryName : "United States",
				phoneNumber : "504-737-7941"
			},
			shippingAddress : {
				relation : "http://developers.digitalriver.com/v1/shoppers/ShippingAddressResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/shipping-address",
				id : "shippingAddress",
				firstName : "Keith",
				lastName : "Kester",
				companyName : "",
				line1 : "9625 W 76th St",
				line2 : "Suite 150",
				line3 : "",
				city : "Eden Prairie",
				countrySubdivision : "MN",
				postalCode : 55344,
				country : "US",
				countryName : "United States",
				phoneNumber : 504 - 737 - 7941
			},
			lineItems : {
				relation : "http://developers.digitalriver.com/v1/shoppers/LineItemsResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/line-items"
			}

		}, {
			relation : "http://developers.digitalriver.com/v1/shoppers/OrdersResource",
			uri : "http://mockapi.com/v1/shoppers/me/orders/12385168842",
			id : 12385168789540,
			locale : "en_US",
			submissionDate : "2012-03-08T17:30:43.000Z",
			optIn : false,
			testOrder : true,
			taxExempt : false,
			pricing : {
				total : {
					currency : "USD",
					value : 1000.66
				},
				subtotal : {
					currency : "USD",
					value : 900.50
				},
				tax : {
					currency : "USD",
					value : 4.15
				},
				shipping : {
					currency : "USD",
					value : 6.95
				}
			},
			payment : {
				customerLastName : "Kester",
				customerFirstName : "Keith",
				paymentAmount : {
					currency : "USD",
					value : 61.09
				},
				paymentMethodName : "american"
			},
			orderState : "In Process",
			billingAddress : {
				relation : "http://developers.digitalriver.com/v1/shoppers/BillingAddressResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/billing-address",
				id : "billingAddress",
				firstName : "Keith",
				lastName : "Kester",
				companyName : "",
				line1 : "9625 W 76th St",
				line2 : "Suite 150",
				line3 : "",
				city : "Eden Prairie",
				countrySubdivision : "MN",
				postalCode : 55344,
				country : "US",
				countryName : "United States",
				phoneNumber : "504-737-7941"
			},
			shippingAddress : {
				relation : "http://developers.digitalriver.com/v1/shoppers/ShippingAddressResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/shipping-address",
				id : "shippingAddress",
				firstName : "Keith",
				lastName : "Kester",
				companyName : "",
				line1 : "9625 W 76th St",
				line2 : "Suite 150",
				line3 : "",
				city : "Eden Prairie",
				countrySubdivision : "MN",
				postalCode : 55344,
				country : "US",
				countryName : "United States",
				phoneNumber : 504 - 737 - 7941
			},
			lineItems : {
				relation : "http://developers.digitalriver.com/v1/shoppers/LineItemsResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/line-items"
			}

		}, {
			relation : "http://developers.digitalriver.com/v1/shoppers/OrdersResource",
			uri : "http://mockapi.com/v1/shoppers/me/orders/12385168842",
			submissionDate : "2012-03-08T17:30:43.000Z",
			id : 1238516854887415,
			locale : "en_US",
			optIn : false,
			testOrder : true,
			taxExempt : false,
			pricing : {
				total : {
					currency : "USD",
					value : 2300.30
				},
				subtotal : {
					currency : "USD",
					value : 2000.14
				},
				tax : {
					currency : "USD",
					value : 4.15
				},
				shipping : {
					currency : "USD",
					value : 6.95
				}
			},
			payment : {
				customerLastName : "Kester",
				customerFirstName : "Keith",
				paymentAmount : {
					currency : "USD",
					value : 61.09
				},
				paymentMethodName : "visa"
			},
			orderState : "Completed",
			billingAddress : {
				relation : "http://developers.digitalriver.com/v1/shoppers/BillingAddressResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/billing-address",
				id : "billingAddress",
				firstName : "Keith",
				lastName : "Kester",
				companyName : "",
				line1 : "9625 W 76th St",
				line2 : "Suite 150",
				line3 : "",
				city : "Eden Prairie",
				countrySubdivision : "MN",
				postalCode : 55344,
				country : "US",
				countryName : "United States",
				phoneNumber : "504-737-7941"
			},
			shippingAddress : {
				relation : "http://developers.digitalriver.com/v1/shoppers/ShippingAddressResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/shipping-address",
				id : "shippingAddress",
				firstName : "Keith",
				lastName : "Kester",
				companyName : "",
				line1 : "9625 W 76th St",
				line2 : "Suite 150",
				line3 : "",
				city : "Eden Prairie",
				countrySubdivision : "MN",
				postalCode : 55344,
				country : "US",
				countryName : "United States",
				phoneNumber : 504 - 737 - 7941
			},
			lineItems : {
				relation : "http://developers.digitalriver.com/v1/shoppers/LineItemsResource",
				uri : "http://mockapi.com/v1/shoppers/me/carts/10690353819/line-items"
			}

		}]

	}

};
