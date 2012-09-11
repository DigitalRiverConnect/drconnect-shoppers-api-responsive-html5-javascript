define(['Api', 'q'], function(Api, Q) {
    window.dr = window.dr || {};
    window.dr.api = Api; 
    if(!window.Q) {
        window.Q = Q;
    }
});