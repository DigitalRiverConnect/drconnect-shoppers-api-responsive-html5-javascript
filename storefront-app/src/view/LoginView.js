var ns = namespace('dr.acme.view');

/**
 * Login View
 * 
 * Will render the login form from a hosted page
 * 
 */
ns.LoginView =  ns.BaseView.extend({
    /**
     * Name of the root element for this view
     */
    elementSelector: "#contentArea",
    layoutTemplate: "#loginTemplate",
    /**
     * Constructor
     */
    init: function() {
        this._super();
        this.setFormLoaded(false);
    },
    /**
     * Events this view dispatches
     */
    events: {
        //This view doesn't have notifications
    },
    /**
     * Changes the status of the form loaded flag
     */
    setFormLoaded: function(value) {
        this.model['loaded'] = value;
    },
    /**
     * Retrieves the form loaded flag
     */
    getFormLoaded: function() {
        return this.model['loaded'];
    },
    render: function() {
        if(!this.getFormLoaded()) {
            this.getParentElement().find("#loginFormDiv").hide();
            this.showLoaderOnComponent("#loginLoader", "Please wait...");
            this.getParentElement().find("#loginLoader").show();
        } else {
            this.getParentElement().find("#loginLoader").hide();
            this.getParentElement().find("#loginFormDiv").show();
        }
    },
    /**
     * Handlers for the DOM events must be registered in this method
     */
    initDOMEventHandlers: function() {
        //This view doesn't have notifications
    }
});