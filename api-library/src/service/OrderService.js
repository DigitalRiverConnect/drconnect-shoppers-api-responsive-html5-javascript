define(['service/BaseService', 'Config'], function(BaseService, Config) {
    /**
     * Service Manager for Order Resource
     */
    return BaseService.extend({
        uri: Config.service.URI.ORDERS
    });
});