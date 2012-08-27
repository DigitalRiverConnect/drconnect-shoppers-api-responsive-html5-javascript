var ns = namespace('dr.acme.runtime');
/**
 * this map is for bread crumb in the application 
 */
ns.BREADCRUMB_MAP = {
	'/': {
			breadText:'Home', 
			parentMapping:false
	   },
    '/products/': {
		breadText:'Product Detail', 
		parentMapping:true
	  },
    '/cart/':{
    	breadText:'Shopping Cart', 
    	parentMapping:true
       }  ,    
    '/categories': {
    	breadText:'Category',
    	parentMapping:true
    },    
    '/orderHistory/':{
    	breadText:'Order History', 
    	parentMapping:true
    },
    '/orderHistoryDetail/' : {
    	breadText:'Order Details',
    	parentMapping:true
    },
    '/myAccount':{
        breadText:'My Account',
        parentMapping:true
    } ,
    '/checkout': {
    	breadText:'Checkout',
    	parentMapping:true
    },    
    '/login':{
    	breadText:'Login',
    	parentMapping:true
    } ,
    '/logout':{
    	breadText:'Home', 
    	parentMapping:true
    }, 
    '/searchProduct':{
    	breadText:'Search Product', 
    	parentMapping:false
    }
};
