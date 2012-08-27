var ns = namespace('dr.acme.view');

ns.ItemRenderer =  Class.extend({
    init:function(item) {
        this.model = item;
        this.setElement();
    },
    setElement: function() {
        if(!this.elementType) {
            this.elementType = "div";
        }
        this.$element = $("<" + this.elementType + "></" + this.elementType + ">");
        this.element = this.$element[0];
    },
    getItem:function(){
        if(this.model) {
            return this.model;
        } else {
            return null;
        }
    }, 
    /**
     * set the model for the renderer
     */
    setItem: function(model) {
        this.model = model;
    },
    generate: function() {
        if(!this.getItem()){
              this.showLoaderOnComponent(this.element, "");
        } else {
            this.applyTemplate(this.element, this.templateName, this.getItem());   
        }
        return this;
    },
    
    render:function(parent) {
        $(parent).append(this.generate());
    },
    /**
     * Applies a template to a DOM element. Parameters are optional
     */
    applyTemplate: function(elementSelector, templateSelector, params) {
        console.debug("Applying template " + templateSelector + " to element " + elementSelector);
        var out = $(templateSelector).tmpl(params);
        $(elementSelector).html(out);  
    },
    /**
     * Applies a template to the root DOM element of this view
     */
    applyTemplateToRoot: function(templateSelector, params) {
        this.applyTemplate(this.elementSelector, templateSelector, params);
    },
    /**
     * Shows a loader for a particular component of this view
     * The component may fill the whole page but this is not a app-wide loader.
     */
    showLoaderOnComponent: function(componentSelector, message) {
        if(!message) message = "Loading...";
        this.applyTemplate(componentSelector, "#loader", {message: message});
    }    
});