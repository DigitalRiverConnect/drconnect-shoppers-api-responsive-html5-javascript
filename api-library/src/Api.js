define(['service/ShopperService', 'auth/AuthManager', 'Config', 'Client'], function(ShopperService, AuthManager, Config, Client) {
    var dr = {};
    dr.api = {};
    
    dr.api.callbacks = {
            editAccount: ShopperService.editCallback,
            auth: AuthManager.authCallback    
        } 
    
    window.dr = dr;
    
    return {
        callbacks: {
            editAccount: ShopperService.editCallback,
            auth: AuthManager.authCallback    
        },
        Client: Client,
        authModes: Config.authMode 
   }
});