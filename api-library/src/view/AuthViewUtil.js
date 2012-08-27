/**
 * Common Functions for AuthViews
 */

/**
 * Builds the URI using the parameters
 */
var buildUriFromOptions = function(uri, redirectUri, options) {
	var resultUri = uri + "?redirect_uri=" + encodeURIComponent(redirectUri)
		+ "&response_type=token" + "&client_id=" + options.client_id;
	
	return resultUri;
}

/**
 * Returns an URI with the corresponding anonymous token addded to it
 */
var getUriWithToken = function(uri, reqToken) {
	 // TODO: Switch this lines once the change has been implemented on apigee
	// var finalUri = uri + "&limited_token=" + reqToken;
	var finalUri = uri + "&limited_token=" + reqToken;
	return finalUri;
}