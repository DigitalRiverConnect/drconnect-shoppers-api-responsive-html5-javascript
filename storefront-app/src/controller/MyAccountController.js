var ns = namespace("dr.acme.controller")

/**
 * controller for my account 
 */
ns.MyAccountController = ns.BaseController.extend({

	/**
     * init method override from the BaseController
     */	
	init:function(){
		this.model = {};
		this.view = new dr.acme.view.MyAccountView();
		this.editView = new dr.acme.view.MyAccountEditView();
		this.shopperService = dr.acme.service.manager.getShopperService();		
		this._super(this.view);	
	},
	
	/**
     * initEventHandlers method override from the BaseController
     */		
	initEventHandlers: function() {
        //This view doesn't have notifications
    },
    
	/**
     * doIt method override from the BaseController
     */    
	doIt:function(params){
	    console.info("Displaying My account page");
		var that = this;
		var shop = that.shopperService.getShopper();
		var addressShopper = that.shopperService.getAddresses();
		// Reset the address model in order to reload it after editing the account
		this.model.address = null;
		
		this.view.renderLayout();
		this.view.bindEvent();        
        this.view.renderPersonalInfLoader();
        this.view.renderAddress();        
	    
	    //Get Shopper
		$.when(shop).done(function(data) {
		    that.model.shopper = data;
		    that.view.renderPersonalInf(that.model);
		});
		
		// Get Addresses for current Shopper
		$.when(addressShopper).done(function(data) {
		    if(data.address){
		    	that.model.address = data;
		    }else{
		    	// If No Addresses exist set an empty list to avoid showing loading message
		    	that.model.address = {};
		    	that.model.address.address = {};
		    }                        
		    that.view.setAddresses(that.model.address.address);
		    that.view.renderAddress();                       
		});
	},
	
	
	/**
	 * 
	 */
	edit : function(requestedUrl){
		this.requestedUrl = requestedUrl;
		this.navigateTo(dr.acme.runtime.URI.MY_ACCOUNT_EDIT);
	},
	
	
	/**
     * Show Edit account method
     */    
	showEdit:function(){
		console.info("Displaying Edit Account Page");
        this.editView.renderLayout();
        this.editView.render();
		var self = this;
		var p = this.shopperService.edit("editAccount");
		
        $.when(p).done(function() {
            if(self.requestedUrl) {
                self.navigateTo(self.requestedUrl);
                self.requestedUrl = null;    
            } else {
                console.info("Edit successful, redirecting to MyAccount");
                self.navigateTo(dr.acme.runtime.URI.MY_ACCOUNT);
            }
        }).progress(function() {
            self.editView.setFormLoaded(true);
            self.editView.render();
        });
	}	
});
