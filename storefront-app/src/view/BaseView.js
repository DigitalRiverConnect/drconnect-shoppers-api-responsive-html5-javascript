var ns = namespace('dr.acme.view');

/**
 * Super Class for Views
 * most of View objects will inherit from this 
 */
ns.BaseView = Class.extend({
	init:function(templateName) {
	    this.model = {};
		this.templateName = templateName;
		this.setElement();
		this.initDOMEventHandlers();
		this.initViewEventHandlers();
		this.handlersMap = {};
		this.renderedElement = null;
		this.app = dr.acme.application;
	},
	/**
	 * Private. Sets the jquery root element for this view
	 * Subclasses must override elementSelector to indicate the proper root element
	 */
	setElement: function() {
	    if(!this.elementSelector) this.elementSelector = "body";
	    console.debug("Setting root element to '" + this.elementSelector + "'");
	},
	getParentElement: function() {
	    if(!this.$parent || this.$parent.length == 0) {
	        this.$parent = $(this.elementSelector)
	    } 
	    return this.$parent;
	},
	getElement: function() {
	    return this.renderedElement;
	},
	/**
	 * Retrieves a DOM element wrapped in a jQuery object
	 */
	find: function(selector) {
	    if(this.renderedElement) {
	       return this.renderedElement.find(selector);    
	    } else {
	        return null;
	    }
	},
	/**
	 * Template method. Subclasses may override it to set DOM event handlers
	 */
	initDOMEventHandlers: function() {},
	/**
	 * Template method. Subclasses may override it to set subviews event handlers
	 */
	initViewEventHandlers: function() {},
	/**
	 * Adds a DOM event handler
	 */
	addDomHandler: function(selector, event, handler, executeNormalBehavior, enterKey, condition) {
	    console.debug("Adding DOM Handler for '" + selector + "' -> '" + event + "'");
	    var self = this;
	    this.getParentElement().on(event, selector, function(e) {
	        console.debug("'" + selector + "' -> '" + event + "' fired"); 
	        if(typeof enterKey != 'undefined' && enterKey){
	        	if(e.keyCode === 13){
	        		handler.call(self, e);
	        	}
	        }else{
	        	handler.call(self, e);	        	
	        }
	        if(!executeNormalBehavior) {
	           e.preventDefault();    
	        }
	    });
	},
	/**
	 * Adds an custom event handler for events dispatched by this view
	 */
	addEventHandler: function(name, context, handler) {
	    console.debug("Adding Custom Event Handler for '" + name + "'");
        var handlers;  
        if(!this.handlersMap[name]) {
            handlers = [];
            this.handlersMap[name] = handlers;
        } else {
            handlers = this.handlersMap[name];
        }
        handlers.push({context: context, func: handler});
    },  
    /**
     * Dispatches a custom event
     */
    dispatchEvent: function(name, data) {
        console.debug("Dispatching event '" + name + "'");
        var handlers = this.handlersMap[name];
        if(!handlers) return;
        for(var i = 0; i < handlers.length; i++) {
            var handler = handlers[i];
            handler.func.call(handler.context, name, data);
        }
    },
	bindEvent:function(element, callback){
		$(element).click(function(){
			callback.call()}
		);
	},
    /**
     * Resets the data of this view
     */
    reset: function() {
        this.model = {};
    },
    /**
     * Main layout rendering
     */
    renderLayout: function(append, preserveData){
        if(!preserveData) this.reset();
        if(!this.layoutTemplate) return false;
        if(append) {
            this.appendTemplateToRoot(this.layoutTemplate);
        } else {
            this.applyTemplateToRoot(this.layoutTemplate);
        }
    },
    /**
     * The default implementation does nothing
     */
    render: function() {},
    /**
     * Retrieves the HTML code for the view
     */
    getHTML: function() {
        if(this.renderedElement) {
            return this.renderedElement.html();
        }
        return "";
    }, 
    /**
     * Generates the DOM element from a template and a model
     */    
    createDOM: function(templateSelector, params) {
        return $(templateSelector).tmpl(params);
        return newElem;
    },   
    /**
     * Applies a template to a DOM element. Parameters are optional
     */
    applyTemplate: function(elementSelector, templateSelector, params) {
        console.debug("Applying template " + templateSelector + " to element " + elementSelector);
        var newElem = this.createDOM(templateSelector, params);
        if(this.elementSelector == elementSelector) {
            this.renderedElement = newElem;
        }
        $(elementSelector).html(newElem);
    },
    /**
     * Appends a template to a DOM element. Parameters are optional.
     * Useful to render lists
     */
    appendTemplate: function(elementSelector, templateSelector, params) {
        console.debug("Appending template " + templateSelector + " to element " + elementSelector);
        var newElem = this.createDOM(templateSelector, params);
        if(this.elementSelector == elementSelector) {
            this.renderedElement = newElem;
        }
        $(elementSelector).append(newElem);
    },
    /**
     * Applies a template to the root DOM element of this view
     */
    applyTemplateToRoot: function(templateSelector, params) {
        this.applyTemplate(this.elementSelector, templateSelector, params);
    },
    /**
     * Appends a template to the root DOM element of this view
     */
    appendTemplateToRoot: function(templateSelector, params) {
        this.appendTemplate(this.elementSelector, templateSelector, params);
    },    
    /**
     * Shows a loader for a particular component of this view
     * The component may fill the whole page but this is not a app-wide loader.
     */
    showLoaderOnComponent: function(componentSelector, message, append) {
        if(!message) message = "Loading...";
        if(append) {
            this.appendTemplate(componentSelector, "#loader", {message: message});
        } else {
            this.applyTemplate(componentSelector, "#loader", {message: message});
        }
        
    },
    /**
     * Renders a collection using the provided widget class
     */
    renderCollection: function(collection, widgetClass, parentElement, append) {
        if(!append) {
            $(parentElement).html("");
        }
        for(var i = 0; i < collection.length; i++) {
            var widget = new widgetClass(parentElement, collection[i]);
            widget.render(true);
        }  
    },
	/**
	 * Returns true if model is defined (not empty object)
	 * or false if it's an empty object or null'
	 */
	modelIsDefined:function(){
		if(typeof this.model === 'object'){
			if(!jQuery.isEmptyObject(this.model)){
				return true;
			}else{
				return false;
			}
		}else{
			if(this.model){
				return true;
			}
		}
		return false;
	},
	/* NOT USED
	addLoadersToImages: function(startingElement) {
	    $(startingElement + " img.useLoader").each(function(i,e) {
            var image = $(e);
            console.log(image.height());
            var isLoaded = false;
            
            if(typeof(e.complete) == "undefined") {
                if(typeof(e.naturalWidth) == "undefined") {
                    isLoaded = false;
                } else {
                    isLoaded = (e.naturalWidth > 0);
                }
            } else {
                isLoaded = e.complete;
            }
            
            if(isLoaded) return;
            
            image.hide();
            var loader;
            image.bind("load", function(e) {
                
                if(loader) {
                    loader.remove();
                }
                
                $(e.target).fadeIn();
                
            });
            
            var w = image.width();
            var h = image.height();
            
            loader = $("<div class='imageLoader' style='display:none;'></div>").insertBefore(image);
            
            loader.width(w);
            loader.height(h);
            loader.css("background", "url('img/loading.gif') no-repeat scroll center center transparent");
            loader.show();
        });
	}
	*/
	

});
