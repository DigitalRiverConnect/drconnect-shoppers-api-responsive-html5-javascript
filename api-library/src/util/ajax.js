define(['q'], function(Q) {
    var result = {};
    /**
     * Implementation of a resource request through an URI with Ajax 
     * avoiding the use of JQuery library
     */
    result.doAjax = function(url, method, urlParams, headerParams, body) {
    	var defer = Q.defer();
    	var req = this.createRequest(); // XMLHTTPRequest object instance
    	
    	req.onreadystatechange  = function() {
    		if(req.readyState == 4) {
    			
    			var data = req.responseText;
                
                if(data != "") {
                    data = JSON.parse(data);
                }
    			if(req.status != "" && req.status < 300) {
    			    defer.resolve(data);
    			} else {
    			    var error = data.Exception?data.Exception.Error:data;
    			    defer.reject({status: req.status, error: error});
    			}
    		}
    	}
    	
    	this.sendRequest(url, method, urlParams, headerParams, req, body);
    	return defer.promise;
    }
    
    /**
     * Creates an XMLHttpRequest object
     * @returns {XMLHttpRequest}
     */
    result.createRequest = function() {
    	try {
    		req = new XMLHttpRequest(); /* e.g. Firefox */
    	} catch(err1)  {
    		try {
    			req = new ActiveXObject('Msxml2.XMLHTTP');
    			/* some versions IE */
    		} catch(err2) {
    			try {
    				req = new ActiveXObject('Microsoft.XMLHTTP');
    				/* some versions IE */
    			} catch(err3) {
    				req = false;
    			}
    		}
    	}
    	return req;
    }
    
    /**
     * Request open and send
     */
    result.sendRequest = function(url, method, urlParams, headerParams, req, body) {
        // Add timestamp so the request is not cached
        urlParams = urlParams || {};
        urlParams["drapits"] = new Date().getTime();

    	// Get possible params and encode the query
    	var queryString = this.utf8Encode(this.getQueryString(urlParams));
    	var uri = url;
    	if(queryString != "") {
    	    uri += (url.indexOf("?") > 0?"&":"?") + queryString;
    	}
    	req.open(method, uri, true);
    
    	req = this.setHeader(headerParams, req);
    	
    	if(body) {
    	    var contentType = headerParams["Content-Type"];
    	    if(contentType == "application/x-www-form-urlencoded") {
    	        body = this.utf8Encode(this.getQueryString(body));
    	    }
    		req.send(body);
    	}else{
    		req.send();
    	}
    }
    
    /**
     * Set url params
     */
    result.getQueryString = function(params){
    	
        var qs = ""
        for (var name in params) {
            if(name) {
            	qs += name + '=' + params[name] + "&";
            }
        }
        return qs.substring(0,qs.length-1);
    }
    
    /**
     * Get params from url
     */
    /*
    ns.getUrlParams = function(url){
    	
    	var obj = {};
      	var param = {}; 
    	var result = {};
        var params = url.split('?')[1];
        params = params.split('&');
        
        for (var pos=0; pos < params.length; pos++) {
        	var param = params[pos].split('=');
        	obj[params[pos].split('=')] = params[pos].split('')[1];
        	result.push(obj);
        }
        return result;
    }*/
    
    /**
     * Set request header params
     */
    result.setHeader = function(params, req){
    	
    	// Set default header fields
    	req.setRequestHeader('Accept', 'application/json');
    	
        for (var name in params) {
        	req.setRequestHeader(name, params[name]);
        }	
        return req;
    }
    
    /**
     * Url encoder
     */
    result.utf8Encode = function (string) {
    	string = string.replace(/\r\n/g,"\n");
    	var utftext = "";
     
    	for (var n = 0; n < string.length; n++) {
     
    		var c = string.charCodeAt(n);
    		if (c < 128) {
    			utftext += String.fromCharCode(c);
    		}
    		else if((c > 127) && (c < 2048)) {
    			utftext += String.fromCharCode((c >> 6) | 192);
    			utftext += String.fromCharCode((c & 63) | 128);
    		}
    		else {
    			utftext += String.fromCharCode((c >> 12) | 224);
    			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    			utftext += String.fromCharCode((c & 63) | 128);
    		}
     	}
    	return utftext;
    };
    
    /**
     * is empty common function
     */
    result.isEmpty = function(map) {
       for(var key in map) return false;
       return true;
    }
    
    return result;

});