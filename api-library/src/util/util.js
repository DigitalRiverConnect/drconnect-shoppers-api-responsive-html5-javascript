/**
 * General functions required on the library
 */
define([], function() {
    var result = {};
    result.namespace = function(namespaceString) {
        var parts = namespaceString.split('.'),
            parent = window,
            currentPart = '';    
    
        for(var i = 0, length = parts.length; i < length; i++) {
            currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }
    
        return parent;
    };
    result.is_array = function(input){
        return typeof(input)=='object'&&(input instanceof Array);
    }
    result.is_string = function(input){
        return typeof(input)=='string';
    }
    
    result.getAttribute = function(object, attribute) {
        var parts = attribute.split('.'),
        parent = object,
        currentPart = '';   
        for(var i = 0, length = parts.length; i < length; i++) {
            currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }
    
        return parent;        
    }
    
    result.setAttribute = function(object, attribute, value) {
        var parts = attribute.split('.'),
        parent = object,
        currentPart = '';   
        for(var i = 0, length = parts.length; i < length - 1; i++) {
            currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }
        parent[parts[length-1]] = value;
    }
    result.merge = function(object1, object2) {
        for (var name in object2) {
            object1[name] = object2[name];
        }
        return object1;
    }
    
    result.isAbsoluteUri = function(uri) {
        return (uri.lastIndexOf("http", 0) === 0);
    }
    
    result.Error = function(message) {
        this.message = message;
    };
    
    result.getQueryStringParam = function(url, name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
        if (!results) { 
            return ""; 
        }
        return results[1] || 0;
    }
    
    result.getCurrentPath = function() {
        var url = window.location.href.replace(window.location.hash, "");
        return url.substring(0, url.lastIndexOf("/"));
    }
    
    return result;
});