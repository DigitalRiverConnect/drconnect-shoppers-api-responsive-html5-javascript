var ns = namespace('dr.acme.view');

/**
 * Widget
 * 
 * Base class for widgets
 * Renders the model inside the parent
 */
ns.Widget =  ns.BaseView.extend({
	/**
	 * Initialize method.
     * Subclasses must override it to implement a particular initializing method
     * 
     * @param parent element where the widget must be rendered
     * @param model Resource to be rendered
	 */
	init: function(parent, model) {
        this.elementSelector = parent;
        this._super();
        if(!model) model = {};
        this.setModel(model);
        
        this.loadingMessage = "";
    },
    /**
     * Sets the model to be rendered
     */
    setModel: function(model) {
        this.model = model;
    },
    /**
     * Sets the loading Message
     */
    setLoadingMessage: function(msg) {
    	this.loadingMessage = msg;
    },
    setElement: function() {},
    /**
     * Gets the parent Element
     */
    getParent: function() {
        return this.getElement().parent();
    },
    /**
     * Renders the widget
     */
    render: function(append) {
        if(this.getElement()) {
            this.getElement().remove();
        }
        if(!this.modelIsDefined()) {
            this.showLoaderOnComponent(this.elementSelector, this.loadingMessage, append);
        } else {
            if(append) {
                this.appendTemplateToRoot(this.layoutTemplate, this.model);
            } else {
                this.applyTemplateToRoot(this.layoutTemplate, this.model);
            }
        }
    }
});