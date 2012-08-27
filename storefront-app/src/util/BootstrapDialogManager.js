var ns = namespace('dr.acme.util');

/**
 * Information Dialog
 * 
 * 
 */
ns.DialogManager = {
    showSuccess: function(message, title, closeHandler) {
        if(!title) title = "Notification";
        this.showNotification(message, title, "success", false, closeHandler);
    },
    showError: function(message, title, closeHandler) {
        if(!title) title = "Error";
        this.showNotification(message, title, "error", false, closeHandler);
    },
    showNotification: function(message, title, typeMessage, closeHandler) {
        $.doTimeout(300, function() {
            var notif = $("#notificationTemplate").tmpl({type:typeMessage, title: title, message: message});
            notif.hide();
            notif.appendTo("#notifications");
            notif.slideDown("slow")
                 .delay(3000)
                 .slideUp("slow", function() {
                    $(notif).alert('close')    
            });
           /*
            $(notif).find(".close").bind('click', function (e) {
                notif.slideUp("slow", function() {
                    $(notif).alert('close')    
                });
            })
            */
        });
    },
    showQuestion: function(message, closeHandler) {
        // The notification should last longer if there's a custom message
        var toast = $().toastmessage('showToast', {
                text     : message,
                sticky   : true,
                position: 'top-center',
                type     : "notice", 
                close: null
        });
        
        var self = this;
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
    },
    
    /**
     * Show a notification dialog 
     */ 
    doShow: function(message, typeMessage, sticky, closeHandler){
     
    },
    closeDialog:function(toast){
        $().toastmessage('removeToast', toast);
        toast.find(".messageContainer").remove();
        $('#blur').removeClass('modal-backdrop');
    }
}; 