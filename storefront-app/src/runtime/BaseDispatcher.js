var ns = namespace('dr.acme.runtime');

/**
 * Base Class for dispatcher
 * Provides generic dispatcher funcionality (handling and dispatching notifications and listening to URL changes)
 * Each application must extend it and declare their own mappings
 */
ns.BaseDispatcher = Class.extend({
	
    /**
     * Default url notification name (used when the URL changes on the browser)
     */
    urlChangeNotification: "urlChanged",
    
    /**
     * Default methods to be called in the controllers if no methods are specified in the mappings
     */
    DEFAULT_CONTROLLER_METHOD: "doIt",
    DEFAULT_CONTROLLER_URL_METHOD: "doIt",
    
	/**
	 * Initialize method.
     */     
    init: function() {
         this.currentURL = $.address.value();
         this.mappings = {};
         this.urlMappings = {};
         
    },
    
    /**
    * Initialization of the Controllers and listener of the address change event 
    */
    initialize: function() {
        this.appController = this.initAppController();
        this.appController.doIt();
         
        this.controllers = this.initControllers();
        this.controllers.appController = this.appController;
        
        this.declareUrlMappings();
        this.urlManager = new dr.acme.runtime.UrlNavigationManager(this);
        this.declareMappings();
        this.addMapping(this.urlChangeNotification, this.urlManager, "handle");

        var that = this;
        //Address change event listener
        $.address.change(function(event) {      
                if(that.currentURL != event.value) {
                    that.currentURL = event.value;
                    that.handle(that.urlChangeNotification, { path: event.path, params: event.parameters});
                }
            });
            
        //Initial address change event dispatch    
        this.triggerInitialURL();                          
    },
    
    /**
	 * Returns the current URL
	 */
    getCurrentUrl: function() {
        return this.currentURL;
    },
    
    /**
     * Abstract method that should be overriden to create and return the Main Application Controller (the one that creates the main layout)
     */
    initAppController: function() {},
    
    /**
     * Must create all the controllers and return them in 1 object
     * By default, no controllers are created
     */
    initControllers: function() {
        return {};
    },
    
    /**
     * Method that should be overriden to declare all the notification mappings using addMapping().
     * By default no mapping is created
     */
    declareMappings: function() {},
    
    /**
     * Method that should be overriden to declare all the URL mappings using addUrlMapping().
     * By default no mapping is created
     */
    declareUrlMappings: function() {},
    
    /**
     * Creates a new mapping (notification -> controller.method)
     * If no method is defined, DEFAULT_CONTROLLER_METHOD is used
     * If params are defined, they override the parameters passed when the notification is triggered  
     */
    addMapping: function(notificationName, controller, method, params) {
        if(!method) method = this.DEFAULT_CONTROLLER_METHOD;
        if(!controller) throw Error("The controller to be mapped to " + notificationName + " is undefined");
        if(typeof controller[method] !== 'function') throw Error("The method does not exist on the controller");
        
        console.debug("Adding mapping for '" + notificationName + "'")
        if(!this.mappings[notificationName]) {
            this.mappings[notificationName] = [];
        }
        this.mappings[notificationName].push({"controller": controller, "method": method, "params": params});         
    },
    
    /**
     * Creates a new URL mapping (URL -> controller.method)
     * If the 'method' parameter is not set, DEFAULT_CONTROLLER_URL_METHOD is used
     * If the 'secured' parameter is set, the URL will be accessible only to authenticated users (default: false)
     */
    addUrlMapping: function(url, controller, secured, method) {
        if(!method)method = this.DEFAULT_CONTROLLER_URL_METHOD;
        if(!controller) throw Error("The controller to be mapped to URI " + url + " is undefined");
        if(typeof controller[method] !== 'function') throw Error("The method does not exist on the controller");
        
        console.debug("Adding " + ((secured)?"(Secured) ":"") + "URL mapping for '" + url + "'")

        this.urlMappings[url] = {"controller": controller, "method": method, "secured": secured};         
    },    
    
    /**
     * Gets the query string parameter from the url
     */
    getQueryStringParameter: function(name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!results)
        { 
            return ""; 
        }
        return results[1] || 0;
    },
    
    /**
     * Initial address change event dispatch
     */
    triggerInitialURL: function() {
        var params = {};
        var paramNames = $.address.parameterNames();
        for(var i = 0; i < paramNames.length; i++) {
            var name = paramNames[i];
            if(name) {
                params[name] = $.address.parameter(name); 
            }
        }
        this.handle(this.urlChangeNotification, {path: $.address.path(), params: params});
    },
    
    /**
     * Refreshes the current page
     */
    refreshPage: function(){
    	params = this.extractParamsFromCurrentURL();
    	this.handle(this.urlChangeNotification, {path: $.address.path(), params: params});
    },
    
    /**
     * Extracts the current URL params
     */
    extractParamsFromCurrentURL: function(){
    	var params = {};
        var paramNames = $.address.parameterNames();
        for(var i = 0; i < paramNames.length; i++) {
            var name = paramNames[i];
            if(name) {
                params[name] = $.address.parameter(name); 
            }
        }
        return params;
    },
    
    /**
     * Handler for all the notifications
     */
    handle: function(notificationName, data) {
        console.debug("[Dispatcher] Notification received: " + notificationName + ". Data: " + JSON.stringify(data));
        
        var handlers = this.mappings[notificationName];
        
        if(!handlers || handlers.length == 0) {
            throw new Error("Mapping not found for notification " + notificationName);
        }
        
        console.debug("[Dispatcher] Found " + handlers.length + " mappings");
        
        for(var i = 0; i < handlers.length; i++) {
            if(handlers[i].params) {
                data = handlers[i].params;
            }            
            handlers[i].controller[handlers[i].method](data);    
        }
    }     
});