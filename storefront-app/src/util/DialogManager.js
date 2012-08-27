var ns = namespace('dr.acme.util');

/**
 * Information Dialog
 * 
 * 
 */
ns.DialogManager = {
    showSuccess: function(message, title, closeHandler) {
        this.show(message, "success", false, closeHandler);
    },
    showError: function(message, title, closeHandler) {
        this.show(message, "error", false, closeHandler);
    },
    showQuestion: function(message, closeHandler) {
        this.show(message, "notice", true, closeHandler);
    },
    
    /**
     * Show a notification dialog 
     */ 
    show: function(message, typeMessage, sticky, closeHandler){
        // Display message 
        var toastCloseHandler = (typeMessage  === "notice")? null: closeHandler;
        
        // The notification should last longer if there's a custom message
        var time = (message && message.length > 0)?4000:2000;  
        
        var toast = $().toastmessage('showToast', {
                text     : message,
                stayTime: time,
                sticky   : sticky,
                position: 'top-center',
                type     : typeMessage, 
                close: toastCloseHandler
        });
        
        var self = this;
        if(typeMessage  === "notice"){
            $("#blur").addClass("modal-backdrop");
            var container = $('.messageContainer').clone();
            $(container).appendTo(toast).show();
            $(toast).find(".accept").click(function() {
                self.closeDialog(toast);
                closeHandler(true);
            });
            $(toast).find(".refuse").click(function() {
                self.closeDialog(toast);
                closeHandler(false);
            });
        }        
    },
    closeDialog:function(toast){
        $().toastmessage('removeToast', toast);
        toast.find(".messageContainer").remove();
        $('#blur').removeClass('modal-backdrop');
    }
}; 