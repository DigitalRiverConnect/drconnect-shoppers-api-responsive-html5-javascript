define(['Config', 'Ajax', 'Util'], function(Config, Ajax, Util) {
    /**
     * This object is for the Apigee connection. It will provide
     * CRUD calls for the resources required 
     */
    var Connection = function(){
        console.log("Using real Connection");
        this.baseUrl = Config.connection.URI.BASE_URL + Config.connection.URI.VERSION + "/";
    }
    
    /**
     * Create
     */
    Connection.prototype.create = function(uri, urlParams, headerParams, body){
        return this.request(uri, 'POST', urlParams, headerParams, body);
    }
    
    /**
     * Retrieve
     */
    Connection.prototype.retrieve = function(uri, urlParams, headerParams, body){
        return this.request(uri, 'GET', urlParams, headerParams, body);
    }
    
    /**
     * Update
     */
    Connection.prototype.update = function(uri, urlParams, headerParams){
        return this.request(uri, 'PUT', urlParams, headerParams);
    }
    
    /**
     * Delete / Remove
     */
    Connection.prototype.remove = function(uri, urlParams, headerParams){
        return this.request(uri, 'DELETE', urlParams, headerParams);
    }
    
    /**
     * Submits a form
     */
    Connection.prototype.submitForm = function(uri, fields, headers) {
        headers = headers || {};
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        return this.request(uri, "POST", {}, headers, fields);
    }
    
    /**
     * Generic Request
     */
    Connection.prototype.request = function(uri, method, urlParams, headerParams, body) {
        if(!Util.isAbsoluteUri(uri)) {
            uri = this.baseUrl+uri;
        }
        return Ajax.doAjax(uri, method, urlParams, headerParams, body); 
    }
    
    return Connection;
});