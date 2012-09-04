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
    MY_ACCOUNT_EDIT: "MyAccountEdit",
    SERVER_ERROR: "ServerError"
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
    SEARCH_PRODUCT:'/searchProduct',
    SERVER_ERROR:'/error',
    API_ADMIN:'/admin'
};

ns.MessageType = {
	    SUCCESS: "success",
	    ERROR: "error", 
	    CONFIRM:"notice"
	};
	
ns.EXCEPTIONS = {
    SECURITY_EXCEPTION: "SecurityException"
}
