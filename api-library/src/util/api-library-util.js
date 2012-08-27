/**
 * General functions required on the library
 */

var namespace = function(namespaceString) {
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
function is_array(input){
    return typeof(input)=='object'&&(input instanceof Array);
}
function is_string(input){
    return typeof(input)=='string';
}

function replaceTemplate(template, params){
	for (var name in params) {
		template = template.replace('{'+name+'}', params[name]);
	}
	return template;
}  

var getAttribute = function(object, attribute) {
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

var setAttribute = function(object, attribute, value) {
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
var merge = function(object1, object2) {
	for (var name in object2) {
		object1[name] = object2[name];
	}
	return object1;
}

isAbsoluteUri = function(uri) {
    return (uri.lastIndexOf("http", 0) === 0);
}

Error = function(message) {
    this.message = message;
};

function getQueryStringParam(url, name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    if (!results) { 
        return ""; 
    }
    return results[1] || 0;
}

function getCurrentPath() {
    var url = window.location.href.replace(window.location.hash, "");
    return url.substring(0, url.lastIndexOf("/"));
}
