define(['Util'], function(Util) {
    var result = {};
    /**
     * Auth modes
     */
    result.authMode = {
        // Shows a POPUP with the login form
        POPUP: "POPUP",
        // Shows an IFRAME with the login form
        IFRAME: "IFRAME",
        // Shows the login form in a new window/tab
        WINDOW: "WINDOW",
        // Manual mode. The client app uses the data and methods provided to implement the process itself (see AuthManualView.js)
        MANUAL: "MANUAL"
    }
    
    /**
     * Configuration params and constants
     */
    result.config = {
        AUTH_FRAME_ID: "drApiAuthFrame", 
        DEFAULT_REDIRECT_URI: Util.getCurrentPath() + "/drapi-auth.html",
        EDIT_ACCOUNT_FRAME_ID: "drEditAccountFrame",
        EDIT_ACCOUNT_REDIRECT_URI: Util.getCurrentPath() + "/drapi-editaccount.html"
    }
    
    /**
     * Connection Request constants required
     */
    result.connection = {};
    result.connection.URI = {
        BASE_URL: null,
        DEV_BASE_URL: 'http://23.21.197.49/',
        PRD_BASE_URL: 'https://api.digitalriver.com/',
        CTE_BASE_URL: 'https://api-cte.digitalriver.com/',
        DIS_BASE_URL: 'https://dispatch.digitalriver.com/',
        DTE_BASE_URL: 'https://dispatch-test.digitalriver.com/',
        VERSION: 'v1',	
        ANONYMOUS_LOGIN: 'oauth20/token',
        LOGIN: 'oauth20/authorize'
    };
    
    result.connection.TYPE = {
        XML: '1',
        JSON: '2',
        TEXT: '3',
        UNSIGNED_BYTES: '4'
    };
    
    /**
     * URI Constants required by the Services
     */
    result.service = {};
    result.service.URI = {
        CATEGORIES: 'shoppers/me/categories',
        PRODUCTS: 'shoppers/me/products',
        PRODUCTS_BY_CATEGORY: 'shoppers/me/categories/{categoryId}/products',
        OFFERS: 'shoppers/me/point-of-promotions/{popName}/offers',
        PRODUCT_OFFERS: 'shoppers/me/point-of-promotions/{popName}/offers/{offerId}/product-offers',
        OFFERS_FOR_PRODUCT: 'shoppers/me/products/{productId}/point-of-promotions/{popName}/offers',
        PRODUCTS_SEARCH: '/shoppers/me/product-search',
        CART: 'shoppers/me/carts/active',
        CART_LINE_ITEMS: 'shoppers/me/carts/active/line-items',
        CART_OFFERS: 'shoppers/me/carts/active/point-of-promotions/{popName}/offers',
        CART_APPLY_SHOPPER: 'shoppers/me/carts/active/apply-shopper',
        CART_SHIPPING_OPTIONS: 'shoppers/me/carts/active/shipping-options',
        CART_APPLY_SHIPPING_OPTION: 'shoppers/me/carts/active/apply-shipping-option',
        CART_SUBMIT: 'shoppers/me/carts/active/submit-cart',
        SHOPPER:'shoppers/me',
        SHOPPER_PAYMENT_OPTION:'shoppers/me/payment-options',
        SHOPPER_ACCOUNT: 'shoppers/me/account',
        ORDERS:'shoppers/me/orders',
        ORDER_SHIPPING_ADDRESS:'shoppers/me/orders/{orderId}/shipping-address',
        ORDER_BILLING_ADDRESS:'shoppers/me/orders/{orderId}/billing-address',
        ADDRESS:'shoppers/me/addresses'
    }
    
    return result;
});
