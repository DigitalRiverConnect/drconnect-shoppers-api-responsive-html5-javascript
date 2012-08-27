var ns = namespace('dr.acme.runtime');

/**
 * Url Navigation Manager
 * Handles URL changes.
 * 
 */
ns.UrlNavigationManager = Class.extend({
	
    init: function(dispatcher) {
        this.controllers = dispatcher.controllers;
        this.urlMappings = dispatcher.urlMappings;
        this.mappings = dispatcher.mappings;
        this.dispatcher = dispatcher;
    },
    
    /**
     * Security filter. If user is not authenticated, it throws an exception
     */
    applySecurity: function() {
        var shopperSrv = dr.acme.service.manager.getShopperService();
    
        if(!shopperSrv.isAuthenticated()) {
            throw dr.acme.runtime.EXCEPTIONS.SECURITY_EXCEPTION;
        }
    },
    
    /**
     * Handles security exceptions by redirecting to the landing page
     * Any other exception is re-thrown
     */
    handleSecurityException: function(err, url) {
        if(err == dr.acme.runtime.EXCEPTIONS.SECURITY_EXCEPTION) {
            console.warn("Unauthorize access to " + url + ", redirecting to the login page");     
            this.dispatcher.handle(dr.acme.runtime.NOTIFICATION.SHOW_LOGIN, this.dispatcher.getCurrentUrl());
        } else {
          throw err;
        }
    },
    
    /**
     * Handle URI change notifications
     */
    handle: function(data) {
        try {
              this.doHandle(data.path, data.params);
        } catch(err) {
              this.handleSecurityException(err, data.path);
        }
    },
    
    /**
     * Handle URI change notifications.
     * Throws an exception if the mapping is not found or if the user has no access to it
     */
    doHandle: function(uri, params) {
        console.debug("Navigating to " + uri);
        var mapping = this.urlMappings[uri];
        
        if(!mapping) throw new Error("No URL Mapping found for " + uri);
       
        if(mapping.secured) this.applySecurity();
        
        mapping.controller[mapping.method](params);
        
        
    }    
});