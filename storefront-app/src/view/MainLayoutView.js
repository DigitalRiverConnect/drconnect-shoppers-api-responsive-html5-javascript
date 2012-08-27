var ns = namespace('dr.acme.view');

/**
 * Main layout View
 * 
 * Renders the main app layout
 * 
 */
ns.MainLayoutView =  ns.BaseView.extend({
    init: function() {
      this._super();
    },
    /**
     * Name of the root element for this view
     */
    elementSelector: "body",
    layoutTemplate: "#appTemplate",
    /**
     * Events this view dispatches
     */
    events: {
        //This view doesn't have notifications
    },
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {
        //This view doesn't have notifications
    },
    initViewEventHandlers: function() {
        
    },
    /**
     * Switch the main layout to authenticated mode
     */
    switchToAuthenticatedMode: function() {
        this.header.switchToAuthenticatedMode();
    },
    /**
     * Switch the main layout to anonymous mode
     */
    switchToAnonymousMode: function() {
        this.header.switchToAnonymousMode();
    },
    renderLayout: function(preserveData){
        if(this.layoutTemplate) {
            console.debug("Applying Main layout template");
            var out = $(this.layoutTemplate).tmpl();
            $(this.elementSelector).prepend(out);  
        }
    },
    render: function() {
        this.renderLayout();
        if(!this.header) {
            this.header = new dr.acme.view.HeaderView();
        }
        this.header.render();
    },
    /**
     * Handles the page change notification
     */
    pageChanged: function(url) {
        if(this.header) {
            this.header.activePageChanged(url);
        }
    }
});