var ns = namespace('dr.acme.view');

/**
 * Cart Header Button View
 * 
 * Manages the header button representing the cart
 *  
 */
ns.ShoppingCartHeaderButton =  ns.BaseView.extend({
    elementSelector: "#quantity",
    init: function() {
        this._super();
        this.quantity = 0;
        this.renderedElement = $(this.elementSelector);
    },
    /**
     * Shopping Cart rendering at the top bar
     */
    render:function(cart){
        var qty = (cart)?cart.totalQuantity:0;
        if(this.quantity != qty) {
            this.quantity = qty;
            
            var self = this;
            this.getElement().fadeTo("slow", 1, function(){
                self.getElement().css("font-weight", "bolder");
                self.getElement().text("("+ self.quantity +")");
                self.getElement().delay(1000).fadeTo("slow", 0.6, function() {
                    self.getElement().css("font-weight", "normal");
                });          
            });
        }
    }
}); 