var ns = namespace('dr.acme.runtime');

/**
 * Notification and Event Constants
 */
ns.NOTIFICATION = {
    URI_CHANGE: "UriChanged",
    ADD_TO_CART: "AddToCart", 
    REMOVE_FROM_CART:"RemoveFromCart",
    SUBMIT_CART:"Submit",
    SHIPPING_METHOD_CHANGE:"ShippingMethodChange",
    EDIT_CHECKOUT_OPTION:"EditCheckoutOption",
    SHOW_LOGIN:"ShowLogin",
    SESSION_RESET:"SessionReset",
    USER_LOGGED_IN:"LoggedIn",
    USER_LOGGED_OUT:"LoggedOut",
    BLOCK_APP:"BlockApp",
    UNBLOCK_APP:"UnblockApp", 
    RENDER_BREADCRUMB:"breadCrumbRender", 
    NAVIGATE_PAGE:"NavigatePage", 
    PAGE_CLICKED:"PageClicked",
    CHECKOUT_OPTIONS_APPLIED: "CheckoutOptionsApplied",
    MY_ACCOUNT_EDIT: "MyAccountEdit"
};

ns.URI = {
	ROOT: '/',
    PRODUCT_DETAILS: '/products/',
    SHOPPING_CART: '/cart/', 
    CATEGORY:'/categories',
    ORDER_HISTORY:'/orderHistory/',
    ORDER_HISTORY_DETAIL:'/orderHistoryDetail/',
    MY_ACCOUNT:'/myAccount',
    MY_ACCOUNT_EDIT:'/myAccount/edit',
    CHECKOUT:'/checkout',
    LOGIN:'/login',
    LOGOUT:'/logout', 
    SEARCH_PRODUCT:'/searchProduct'
};

ns.MessageType = {
	    SUCCESS: "success",
	    ERROR: "error", 
	    CONFIRM:"notice"
	};
	
ns.EXCEPTIONS = {
    SECURITY_EXCEPTION: "SecurityException"
}

ns.CONSTANTS = {
	DEFAULT_PAGE_SIZE: 5,
	BANNER_POPNAME: "Banner_ShoppingCartLocal",
	BANNER_OFFER_ID: "2384691608",
	CANDYRACK_POPNAME: "CandyRack_ShoppingCart",
	HOME_FEATURED_CATEGORIES_ID: ["57618400", "58812700", "58812800", "58950000"],
    HOME_PRODUCTS_PER_CATEGORY: 3
}
