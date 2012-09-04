var ns = namespace('dr.acme.runtime');

/**
 * Acme Application dispatcher
 * Extends BaseDispatcher and defines the controllers and custom mappings for the Acme application
 */
ns.AcmeDispatcher = ns.BaseDispatcher.extend({
    urlChangeNotification: dr.acme.runtime.NOTIFICATION.URI_CHANGE,
    
    /**
     * Mapping of all the Notifications that are replied to the Dispatcher
     */
    declareMappings: function() {
        var nsn = dr.acme.runtime.NOTIFICATION;
        
        this.addMapping(this.urlChangeNotification, this.controllers.appController, "pageChanged");
        
        this.addMapping(nsn.BLOCK_APP, this.controllers.appController, "blockApp");
        this.addMapping(nsn.UNBLOCK_APP, this.controllers.appController, "unblockApp");

        this.addMapping(nsn.ADD_TO_CART, this.controllers.shoppingCartController, "addProductToCart");
        this.addMapping(nsn.REMOVE_FROM_CART, this.controllers.shoppingCartController, "removeProductFromCart");
        
        this.addMapping(nsn.SHOW_LOGIN, this.controllers.userController, "login");
        this.addMapping(nsn.USER_LOGGED_IN, this.controllers.appController, "authenticationModeChanged", true);
        
        this.addMapping(nsn.SESSION_RESET, this.controllers.userController, "sessionReset");
        
        this.addMapping(nsn.USER_LOGGED_OUT, this.controllers.appController, "authenticationModeChanged", false);
        this.addMapping(nsn.USER_LOGGED_OUT, this.controllers.shoppingCartController, "clearCart");
        this.addMapping(nsn.USER_LOGGED_OUT, this.controllers.orderHistoryController, "clearOrders");
        
        this.addMapping(nsn.SUBMIT_CART, this.controllers.checkoutController, "submitCart");
        this.addMapping(nsn.CHECKOUT_OPTIONS_APPLIED, this.controllers.checkoutController, "renderSummaryPage");
        this.addMapping(nsn.SUBMIT_CART, this.controllers.shoppingCartController, "clearCart");
        this.addMapping(nsn.RENDER_BREADCRUMB,this.controllers.breadCrumbController, this.DEFAULT_CONTROLLER_METHOD);
        this.addMapping(nsn.PAGE_CLICKED, this.controllers.searchProductController, "renderPageClicked");
        this.addMapping(nsn.NAVIGATE_PAGE, this.controllers.categoryController, "renderPage");
        
        this.addMapping(nsn.SHOW_ACCOUNT_EDIT, this.controllers.myAccountController, "edit");
        
        this.addMapping(nsn.SERVER_ERROR, this.controllers.appController, "setServerError")
        
    },
    
    /**
     * Mapping of all the URIs 
     */
    declareUrlMappings: function() {
        var nsu = dr.acme.runtime.URI;
        
        this.addUrlMapping(nsu.ROOT, this.controllers.homeController);
        this.addUrlMapping(nsu.PRODUCT_DETAILS, this.controllers.productDetailController);
        this.addUrlMapping(nsu.SHOPPING_CART, this.controllers.shoppingCartController);
        this.addUrlMapping(nsu.CATEGORY, this.controllers.categoryController);
        this.addUrlMapping(nsu.CHECKOUT, this.controllers.checkoutController, true);
        this.addUrlMapping(nsu.MY_ACCOUNT, this.controllers.myAccountController, true);
        this.addUrlMapping(nsu.MY_ACCOUNT_EDIT, this.controllers.myAccountController, true, "showEdit");
        this.addUrlMapping(nsu.ORDER_HISTORY, this.controllers.orderHistoryController, true);
        this.addUrlMapping(nsu.ORDER_HISTORY_DETAIL, this.controllers.orderHistoryDetailController, true);
        this.addUrlMapping(nsu.LOGIN, this.controllers.userController, false, "showLogin");
        this.addUrlMapping(nsu.LOGOUT, this.controllers.userController, true, "logout");
        this.addUrlMapping(nsu.RENDER_BREADCRUMB, this.controllers.breadCrumbController);
        this.addUrlMapping(nsu.SEARCH_PRODUCT, this.controllers.searchProductController);
        this.addUrlMapping(nsu.SERVER_ERROR, this.controllers.appController, false, "showServerError");
        this.addUrlMapping(nsu.API_ADMIN, this.controllers.apiAdminController);
    },
    
    /**
     * Initialization of the main app controller
     */
    initAppController: function() {
        return new dr.acme.controller.MainApplicationController();
    },
    
    /**
     * Controller instances
     */
    initControllers: function() {
        var nsc = dr.acme.controller;
        return {
            homeController: new nsc.HomeController(),
            productDetailController: new nsc.ProductDetailController(),
            shoppingCartController: new nsc.ShoppingCartController(),
            categoryController: new nsc.CategoryController(),
            checkoutController: new nsc.CheckoutController(),
            myAccountController: new nsc.MyAccountController(),
            orderHistoryController: new nsc.OrderHistoryController(),
            orderHistoryDetailController: new nsc.OrderHistoryDetailController(),
            userController: new nsc.UserController(), 
            breadCrumbController: new nsc.BreadCrumbController(), 
            searchProductController: new nsc.SearchProductController(),
            apiAdminController: new nsc.ApiAdminController()
        }
     }
});
