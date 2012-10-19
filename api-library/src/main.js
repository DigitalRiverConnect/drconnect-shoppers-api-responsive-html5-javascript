require.config({
    baseUrl: "./src",
    paths: {
        "Util": "util/util",
        "Ajax": "util/ajax",
        "Class": "util/Class",
        'q': "../libs/q"
    }
});


require(["Api", "jquery"], function(Api, $) {
    var client;
    start = function() {
        var isDummy = getQueryStringParameter("dummy");
        
        var options = {
            error: this.onError, 
            authElementId: "login", 
            authMode: Api.authModes.IFRAME
        };
        client = new Api.Client("604df5ac990fbc67dab8fc098af271e6", options);
        $("#btnConnect").click(connect);
        $("#btnLogin").click(login);
        $("#btnLogout").click(logout);
        $("#btnDisconnect").click(disconnect);
        $("#btnGetProducts").click(getProducts);
        $("#btnGetProduct").click(getProduct);
        $("#btnProductSearch").click(productSearch);
        $("#btnProductOffers").click(getProductOffers);
        $("#btnGetProductOffer").click(getProductOffer);
        $("#btnGetCategories").click(getCategories);
        $("#btnGetCategory").click(getCategory);
        $("#btnListByCategory").click(listByCategory);
        $("#btnAddLineItem").click(addLineItem);
        $("#btnViewCart").click(viewCart);
        $("#btnRemoveLineItem").click(removeLineItem);
        $("#btnGetShopperInfo").click(getShopperInfo);
        
        updateStatus();
    }

    /**
     * Updates the session status on the UI
     */
    function updateStatus() {
        var si = client.getSessionInfo();
        $("#connected").html(si.connected.toString());
        $("#auth").html(si.authenticated.toString());
        $("#token").html(si.token);
    }

    function connect(){
        client.connect(function() {
            updateStatus(); 
        });
        
    }
    
    function login(){
        client.login(null, function(token) {
            updateStatus();
        });
    }
    
    function disconnect(){
        client.disconnect(function() {
            updateStatus(); 
        });
        
    }
    
    function logout(){
        client.logout(function(token) {
            updateStatus();
        });
    }                       

    function getProducts(){
        client.products.list({},function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
    
    function getProduct(){
        client.products.get("248254100", {}, function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
    
    function productSearch(){
        var keyword = 'Soft';
        client.products.search({keyword: keyword, expand: "product"} , function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
    
    function getProductOffers(){
        client.productOffers.list("Banner_ShoppingCartLocal", "2384691608", {"expand": "productOffer"}, function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
    
    function getProductOffer(){
        client.productOffers.get("Banner_ShoppingCartLocal", "2384691608", 248254100, {}, function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
    
    function getCategories(){
        client.categories.list({"expand": "category"}, function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
    
    function getCategory(){
        client.categories.get("57618400", {"expand": "Products"}, function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
    
    function addLineItem(){
        client.cart.addLineItem({"AddProductToCart":{"uri":"http://23.21.197.49/v1/shoppers/me/carts/active/line-items?productid=248216500"}}, {quantity:'2'}, function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
    
    function viewCart(){
        client.cart.get({"expand":"LineItems"}, function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
    
    function removeLineItem(){
        client.cart.removeLineItem({"relation": "http://dev.digitalriver.com/api-overview/LineItemsAPI",
                                    "uri": 'http://23.21.197.49/v1/shoppers/me/carts/active/line-items/12472639519'},{}, function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
    
    function listByCategory(){
        client.categories.listByCategory("58783700" ,{} , function(data) {
            alert(JSON.stringify(data));
            updateStatus();
        }); 
    }
            
    function onError(e){
        alert(e);
        updateStatus();
    }
    
    function getQueryStringParameter(name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!results) { 
            return "0"; 
        }
        return results[1] || 0;
    }
    
    function getShopperInfo(name){
        client.shopper.get(null, function(data) {
            alert(JSON.stringify(data));
        }); 
    }
    start();
});
