var ns = namespace('dr.api.dummy');

ns.Shopper = function() {
	this.info = dr.api.dummy.shopperExpandAll;
}
/*
 * Getting Shopper Info Expanded
 * uri: GET http://mockapi.com/v1/shoppers/me
 */
ns.shopperExpandAll = {
	shopper : {
		id : 161784673509,
		firstName : "Bob",
		lastName : "Bobber",
		emailAddress : "bob@test.com",
		paymentOptions : {
			relation : "http://developers.digitalriver.com/api-overview/PaymentOptionsResource",
			uri : "http://mockapi.com/v1/shoppers/me/payment-options"
		},
		addresses : {
			relation : "http://developers.digitalriver.com/api-overview/AddressesResource",
			uri : "http://mockapi.com/v1/shoppers/me/payment-options",
			address : [{
				relation : "http://developers.digitalriver.com/api-overview/AddressesResource",
				uri : "http://mockapi.com/v1/shoppers/me/address/2268768209"
			}, {
				relation : "http://developers.digitalriver.com/api-overview/AddressesResource",
				uri : "http://mockapi.com/v1/shoppers/me/address/1082241908"
			}]
		}
	}
};

ns.addressExpandAll = {
	addresses : {
		address : [{
			relation : "http://developer.digitalriver.com/v1/shoppers/AddressesResource",
			uri : "http://mockapi.com/v1/shoppers/me/address/1082241908",
			id : 1082241908,
			nickName : "9625 W 76th St",
			isDefault : true,
			firstName : "Keith",
			lastName : "Kester",
			companyName : null,
			line1 : "9625 W 76th St",
			line2 : "Suite 150",
			line3 : null,
			city : "Eden Prairie",
			countrySubdivision : "MN",
			postalCode : 55344,
			country : "US",
			countryName : "United States",
			phoneNumber : "504-737-7941",
			countyName : null
		}]
	}
}