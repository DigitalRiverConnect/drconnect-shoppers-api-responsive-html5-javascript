var ns = namespace('dr.api.service');
var nsa = namespace('dr.api');

/**
 * Super Class for Service
 * most of Service objects will inherit from this 
 */
ns.BaseService = nsa.AsyncRequester.extend({
    init: function(client) {
        if(!client) {
            throw "Client must be instantiated";
        }
        this._super(client.session);
        
        this.client = client;
        this.options = client.options; // Default options when creating the Client
    },
    
    /**
     * Gets the requested entity corresponding to uri and id
     */
    get: function(id, parameters, callbacks){
        // Add the corresponding url to the base    
        var uri = this.uri + "/" + id;
    
        // Call the session retrieve
        return this.makeRequest(this.session.retrieve(uri, parameters), callbacks);
    },
    
    /**
     * Gets a list of entities corresponding to uri
     */
    list: function(parameters, callbacks){
        return this.makeRequest(this.session.retrieve(this.uri, parameters), callbacks); 
    },
    
    parseResponse: function(data) {
        return data;
    }
});