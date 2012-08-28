var ns = namespace("dr.acme.controller");

/**
 * Super Class for Controllers
 * most of Controller objects will inherit from this 
 */
ns.BaseController = Class.extend({
	
	  /**
       * Initialize method.
       * Subclasses must override it to implement a particular initializing method
       * 
       * @param view 	The main view that the Controller has. Could have more than one
       * 				but the init method inherit from here will only use the main one.
       */ 
      init: function(view){
      	this.model = {};
    	this.view = view;
    	this.app = dr.acme.application;
    	this.initEventHandlers();
      },
      
      /**
       * Template method.
       * Subclasses must override it to add view event handlers
       */      
      initEventHandlers: function() {},

      /**
       * Main method of a Controller
       * Starting method that will be called as the main one. 
       * 
       * @param param	JSON object with the possible params
       */      
      doIt: function(param){
    	this.render();
      },
            
      /**
       * When the controller does not need to handle a view event, but only forward it as a 
       * notification for the dispatcher, this method can be used.
       * 
       * @param eventName			String describing the event that want to be notified
       * @param notificationName	String describing the notification 
       */
      mapEventToNotification: function(eventName, notificationName) {
          this.view.addEventHandler(eventName, this, function(event, data) {
              console.debug("Forwarding event " + eventName + " to dispatcher");
              this.notify(eventName, data);
          });
      },
      
      /**
       * Sends a notification to the AcmeDispatcher so other parts of the app can react to this event.
       * 
       * @param notificationName	String describing the notification that want to be forwarded
       * @param data				JSON object with possible params to be forwarded
       */
      notify: function(notificationName, data) {
        var dispatcher = dr.acme.application.getDispatcher();
        dispatcher.handle(notificationName, data);
      },
      
      /**
       * Blocks the app to forbid the user to click
       * 
       * @param message	String message to display at the screen
       */      
      blockApp: function(message) {
        this.notify(dr.acme.runtime.NOTIFICATION.BLOCK_APP, message);  
      },
      
      /**
       * Unblocks the app to allow the user to continue clicking
       */
      unblockApp: function() {
        this.notify(dr.acme.runtime.NOTIFICATION.UNBLOCK_APP);
      },
      
      /**
       * Navigate to another section of the app by changing the browser url
       * 
       * @param url		String with the url where to go
       * @param param	JSON object with the possible params to pass through
       */
      navigateTo: function(url, param) {
          window.location = "#" + url;
      },

      render: function(){
        this.view.render(this.model);
      }
});
