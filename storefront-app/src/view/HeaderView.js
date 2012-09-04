var ns = namespace('dr.acme.view');

/**
 * Header view
 * 
 * Render and manages the Application header
 * 
 */
ns.HeaderView =  ns.BaseView.extend({
    /**
     * Name of the root element for this view
     */
    elementSelector: "#headerContainer",
    layoutTemplate: "#headerTemplate",
    init: function() {
        this._super();
        
        this.homeButtonId = "home-button";
        this.authLoginButtonId = "auth-login-button";
        this.authMyAccountButtonId = "auth-my-account-button";
        this.authLogoutButtonId = "auth-logout-button";
        this.shoppingCartButtonId = "shopping-cart-button";
        this.adminButtonId = "admin-button";
        
        this.authenticated = false;
    },
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
    	this.addDomHandler(".search-query", "keydown", this.changeKeywordValue, true, true);
    },
    changeKeywordValue:function(){
    	if($('.search-query').val() != '' && $('.search-query').val().length >3)
    	$('.navbar-search').attr('action', '#/searchProduct?keyword='+$('.search-query').val()).submit();
    },
    /**
     * Changes the header mode to authenticated, showing and hiding the appropiate buttons
     */
    switchToAuthenticatedMode: function() {
        this.authenticated = true;
        this.find("."+this.authLoginButtonId).css("display", "none");
        this.find("."+this.authMyAccountButtonId).css("display", "block");
        this.find("."+this.authLogoutButtonId).css("display", "block");
    },
    /**
     * Changes the header mode to anonymous, showing and hiding the appropiate buttons
     */
    switchToAnonymousMode: function() {
        this.authenticated = false;
        this.find("."+this.authLoginButtonId).css("display", "block");
        this.find("."+this.authMyAccountButtonId).css("display", "none");
        this.find("."+this.authLogoutButtonId).css("display", "none");
    },
    /**
     * Renders the header
     */
    render: function() {
        this.renderLayout();
        
        // Render the buttons
        this.renderButton(this.homeButtonId, "", "home", "Home", true, false);
        // Render the shopping cart button separately since it contains the number of items (different template)
        this.appendTemplate(this.elementSelector + " ul.nav", "#headerShoppingCartButtonTemplate", {id:  this.shoppingCartButtonId});      

        this.renderButton(this.authLoginButtonId, "login", "user", "Login", !this.authenticated, true);
        this.renderButton(this.authMyAccountButtonId, "myAccount", "user", "My Account", this.authenticated, true);
        this.renderButton(this.authLogoutButtonId, "logout", "off", "Logout", this.authenticated, true);
        this.renderButton(this.adminButtonId, "admin", "info-sign", "Admin", true, true);
        // this.renderAdminButton();
        
    },
    /**
     * Renders a header button (and optionally a divider after the button)
     */
    renderButton: function(id, linkUrl, icon, label, visible, addDivider) {
        var model = {"id": id, "url": linkUrl, "icon": icon, "label": label};
        
        model.visible = (visible)? "block": "none";
        
        this.appendTemplate(this.elementSelector + " ul.nav", "#headerButtonTemplate", model);
        
        if(addDivider) {
            this.appendTemplate(this.elementSelector + " ul.nav", "#headerDividerTemplate", model);    
        }
    },
     /**
     * Renders a header button (and optionally a divider after the button)
     */
    renderAdminButton: function() {
        var model = {"id": this.adminButtonId , "url": "admin", "icon": "user", "label": "Admin"};
        
        model.visible = "block";
        
        this.appendTemplate("#adminNav", "#headerButtonTemplate", model);
        
        // this.appendTemplate(this.elementSelector + " ul.adminNav", "#headerDividerTemplate", model);    
        
    },
    
    /**
     * Returns the button id corresponding to a Url
     */
    getButtonFromUrl: function(url) {
        var nsu = dr.acme.runtime.URI;
        
        switch(url) {
            case nsu.ROOT: return this.homeButtonId;
            case nsu.SHOPPING_CART: return this.shoppingCartButtonId;
            case nsu.MY_ACCOUNT: return this.authMyAccountButtonId;
            case nsu.ORDER_HISTORY: return this.authMyAccountButtonId;
            case nsu.ORDER_HISTORY_DETAIL: return this.authMyAccountButtonId;
            case nsu.LOGIN: return this.authLoginButtonId;
            case nsu.CHECKOUT: return this.shoppingCartButtonId;
            case nsu.API_ADMIN: return this.adminButtonId;
            default: return  "";
        }
    },
    /**
     * Reacts to page changes 
     */
    activePageChanged: function(url) {
        this.setActiveButton(this.getButtonFromUrl(url));        
    },
    /** 
     * Sets the active button on the header
     */
    setActiveButton: function(buttonId) {
        console.debug("[HeaderView] Setting " + buttonId + " as the active header button");
        this.find(".header-button").removeClass("active");
        if(buttonId != "") {
            this.find("." + buttonId).addClass("active");
        }
    } 
});