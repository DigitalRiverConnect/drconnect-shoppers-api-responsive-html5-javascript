/**
 * Common Functions for AuthViews
 */
define([], function() {
    return {
        /**
         * Builds the URI using the parameters
         */
        buildUriFromOptions: function(uri, redirectUri, options) {
            var resultUri = uri + "?redirect_uri=" + encodeURIComponent(redirectUri)
                + "&response_type=token" + "&client_id=" + options.client_id;
            
            return resultUri;
        },
        
        /**
         * Returns an URI with the corresponding anonymous token addded to it
         */
        getUriWithToken: function(uri, reqToken) {
            var finalUri = uri + "&dr_limited_token=" + reqToken;
            return finalUri;
        }        
    }

});