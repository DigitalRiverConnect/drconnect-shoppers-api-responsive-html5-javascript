var ns = namespace('dr.acme.view');

/**
 * My Account Edit View
 * 
 * Will render the iframe where you can edit you shopper account
 * They replace the html template in the layout specified with the provided model
 * 
 */
ns.MyAccountEditView =  ns.BaseView.extend({
    /**
     * Name of the root element for this view
     */
    elementSelector: "#contentArea",
    layoutTemplate: "#myAccountEditTemplate",
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
    /**
     * Constructor
     */
    init: function() {
        this._super();
        this.setFormLoaded(false);
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
    /**
     * Renders the model set
     */
    render: function() {
        if(!this.getFormLoaded()) {
            this.getParentElement().find("#editAccount").hide();
            this.showLoaderOnComponent("#editAccountLoader", "Please wait...");
            this.getParentElement().find("#editAccountLoader").show();
        } else {
            this.getParentElement().find("#editAccountLoader").hide();
            this.getParentElement().find("#editAccount").show();
        }
    },    
});