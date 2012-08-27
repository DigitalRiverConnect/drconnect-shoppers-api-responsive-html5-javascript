var dr = dr || {};
dr.api = dr.api || {};

dr.api.devLoader = (function() {
    var base = "src/"
    var callbackFunc;
    var scripts;
    loadScript = function(src, callback){
        var elem = document.createElement('script');
        elem.setAttribute('type','text/javascript');
        elem.setAttribute("src", src);
        document.getElementsByTagName('head')[0].appendChild(elem);
        var loadFunction = function()  
            {  
                if (this.readyState == 'complete' || this.readyState == 'loaded')  
                {  
                    callback();   
                }  
            };
        elem.onreadystatechange = loadFunction;  
        
        //calling a function after the js is loaded (Firefox)  
        elem.onload = callback;   
    }
    
    var loadNextScript = function() {
        if(scripts.length > 0) {
            var script = scripts.shift();
            loadScript(base + script, loadNextScript);
        } else {
            callbackFunc();
        }
    } 
    return {
        load: function(callback) {
            callbackFunc = callback;
            $.get("src/scripts.js", function(data) {
                scripts = eval(data);
                loadNextScript();
            });
        } 
    }
})();

