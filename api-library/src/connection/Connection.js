var ns = namespace('dr.api.connection');
var util = namespace('dr.api.util');

/**
 * This object is for the Apigee connection. It will provide
 * CRUD calls for the resources required 
 */
ns.Connection = function(){
	console.log("Using real Connection");
	this.baseUrl = dr.api.connection.URI.BASE_URL + dr.api.connection.URI.VERSION + "/";
}

/**
 * Create
 */
ns.Connection.prototype.create = function(uri, urlParams, headerParams, body){
    return this.request(uri, 'POST', urlParams, headerParams, body);
}

/**
 * Retrieve
 */
ns.Connection.prototype.retrieve = function(uri, urlParams, headerParams, body){
	return this.request(uri, 'GET', urlParams, headerParams, body);
}

/**
 * Update
 */
ns.Connection.prototype.update = function(uri, urlParams, headerParams){
    return this.request(uri, 'PUT', urlParams, headerParams);
}

/**
 * Delete / Remove
 */
ns.Connection.prototype.remove = function(uri, urlParams, headerParams){
    return this.request(uri, 'DELETE', urlParams, headerParams);
}

/**
 * Submits a form
 */
ns.Connection.prototype.submitForm = function(uri, fields, headers) {
    headers = headers || {};
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return this.request(uri, "POST", {}, headers, fields);
}

/**
 * Generic Request
 */
ns.Connection.prototype.request = function(uri, method, urlParams, headerParams, body) {
    if(!isAbsoluteUri(uri)) {
        uri = this.baseUrl+uri;
    }
    return util.doAjax(uri, method, urlParams, headerParams, body); 
}
