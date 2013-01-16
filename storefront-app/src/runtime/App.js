var ns = namespace("dr.acme.runtime");

/**
 * Main function of the ACME app
 * 
 * Is the main function (class) for this application. It has a Dispatcher
 * that will listen to all the event and notifications and call the 
 * corresponding Controller for each one. 
 * The Controllers will interact with the Services and render the views.
 * 
 */
ns.App = function(config){
    this.config = this.getConfig(config);
    
    this.dispatcher = new dr.acme.runtime.AcmeDispatcher();
	
	//The environment: if it's 'dev' will point to the one set at Config.js and log through the console
	var env = this.dispatcher.getQueryStringParameter("env").toLowerCase(); 
	
	this.setEnvironment(env);
	
	// Instantiate the Service Manager. This Service Manager is for aqued Site. Any modification to make the 
	// application point to another site should be done here.
    dr.acme.service.manager = new dr.acme.service.ServiceManager(env, this.config);

	
	window.onbeforeunload = this.checkCart;

    dr.acme.application = this;
}

/**
 * Gets the app configuration
 */
ns.App.prototype.getConfig = function(config) {
    var defaultConfig = {
            key: "",
            pageSize: 5,
            featuredCategories: {
                ids: [],
                numberOfProducts: 3
            },
            featuredProducts: {
                visible: false,
                pop: "",
                offer: ""
            },
            candyRack: {
                visible: false,
                pop: ""
            }
    };
    this.validateConfig(defaultConfig, config);
    return $.extend(true, defaultConfig, config);
}

/**
 * Validates the appConfig.js to determine the correct data types on numbers. If the data types are wrong
 * it replaces the values with the default ones.
 */
ns.App.prototype.validateConfig = function(defaultConfig, config){
	if(config.pageSize && typeof config.pageSize !== 'number'){
		config.pageSize = defaultConfig.pageSize;		
	}
	if(config.featuredCategories && config.featuredCategories.numberOfProducts 
		&& typeof config.featuredCategories.numberOfProducts !== 'number'){
		config.featuredCategories.numberOfProducts = defaultConfig.featuredCategories.numberOfProducts;		
	}
} 

/**
 * Dispatcher getter
 */
ns.App.prototype.getDispatcher = function(){
        return this.dispatcher;
}

/**
 * Initialization of the App
 */
ns.App.prototype.start = function(){
    console.info("Starting up application. Connecting to DR Service");
    var that = this;
	dr.acme.service.manager.initialize()
	   .done(function() {
	       console.info("Connected successfully to DR Service! Waiting for the DOM to finish loading...");
	       $(document).ready(function($) {
	           console.info("DOM Loaded! Rendering the application");
    	       that.dispatcher.initialize();
	       });
	   });	    
}

/**
 * Default error function
 */
ns.App.prototype.Error = function(data){
	alert("error" + data);
}

/**
 * Check Cart function warning before losing products
 */
ns.App.prototype.checkCart = function (e){
	if(app.dispatcher.shoppingCartController.view.getCart().lineItems.lineItem.length>0){
	    e.returnValue = "You are about to lose the products in your cart, are you sure?";
	    return "You are about to lose the products in your cart, are you sure?";
	}
}

/**
 * Enable/Disable console log depending on env parameter
 */
ns.App.prototype.setEnvironment = function(env){
	
	if(env == "dev"){
		if (!window.console) window.console = {};
		if (!window.console.log) window.console.log = function () { };
		if (!window.console.error) window.console.error = window.console.log;
		if (!window.console.info) window.console.info = window.console.log;
		if (!window.console.debug) window.console.debug = window.console.log;
		if (!window.console.warn) window.console.warn = window.console.log;
	}else{
		window.console.log = function () { };
		window.console.error = function () { };
		window.console.info = function () { };
		window.console.debug = function () { };
		window.console.warn = function () { };
	}
}

