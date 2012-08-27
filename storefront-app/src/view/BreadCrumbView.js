var ns = namespace('dr.acme.view')

/**
 * BreadCrumb View
 * 
 * 
 */
ns.BreadCrumbView = ns.BaseView.extend({
	
	/**
     * Name of the root element for this view
     */
    elementSelector: ".breadcrumb",
    layoutTemplate: "#breadcrumbTpl",
    currentUrl: function (){
    	return $.address.value();
    },
    getHistoryBreadCrumb:function(breadText){
    	if(this.currentUrl() === '/'){
			localStorage.removeItem('breadcrumb')
		}
    	if(localStorage.length>0 &&  typeof localStorage.getObj('breadcrumb') != 'undefined'){
    		
    		if(!this.existBread(breadText)){
    			var array = localStorage.getObj('breadcrumb');
    			array.push({text:breadText, uriNavigate:this.currentUrl()});
    			localStorage.setObj('breadcrumb', array);
    		}else{
    			this.sliceLocalStorage(breadText);
    		}
    	}else{
    		var breads = new Array();
    		if(this.currentUrl() != '/'){
    			breads.push({text:'Home', uriNavigate:'/'});    			
    		}
    		breads.push({text:breadText, uriNavigate:this.currentUrl()});
    		localStorage.setObj('breadcrumb', breads);
    	}
    	
    	return localStorage.getObj('breadcrumb');
    },
    binderEvents:function(){
    	var self = this;
    	$('.bread').die().live('click',function(){
    		self.resetNextBreads($(this));
    	});
    },
	render : function(model){
			this.applyTemplate(this.elementSelector,this.layoutTemplate, {breads:this.getHistoryBreadCrumb(model.bread.breadText), breadCrumbLength:localStorage.getObj('breadcrumb').length-1});
			this.verifyCurrentUrl();
			this.verifyLoginBread();
	},
	resetNextBreads:function(elem){	
		$(elem).parent().nextAll().remove();
		 this.activeBread($(elem).parent());
	},	
	activeBread:function(elem){
		$(elem).addClass('active')
	}, 
	verifyLoginBread:function(){
		if(this.currentUrl() != '/login')
			$('.breadcrumb a[href="#/login"]').parent().remove();
	}, 
	verifyCurrentUrl:function(){
		if(this.currentUrl() === '/'){
			$('.bread').hide();
		}else{
			$('.bread').show();
		}
	}, 
	existBread:function(breadText){
		for(var i in localStorage.getObj('breadcrumb')) {
			if(localStorage.getObj('breadcrumb')[i].text === breadText)
				return true;
	   }
		return false;
	}, 
	sliceLocalStorage:function(breadText){
		for(var i in localStorage.getObj('breadcrumb')) {
			if(typeof localStorage.getObj('breadcrumb')[i]!= 'undefined' && localStorage.getObj('breadcrumb')[i].text === breadText)
				localStorage.setObj('breadcrumb', localStorage.getObj('breadcrumb').slice(0,parseInt(i)+1))
	   }
	}
});