({
    baseUrl: "../js",
    paths: {
        "bootstrap": "bootstrap.min",
        "jcookie": "jcookie-min",
        'jstorage': "jstorage.min",
        'tree': 'tree.jquery',
        "drapi": 'drapi.amd.noq.min' ,
        "jquery": 'empty:' 
    },
    shim: {
        'jcookie': ['jquery'],
        'jstorage': ['jquery', 'jcookie'],
        'tree': ['jquery']
    },
    name: "main",
    exclude: ['jquery'],
    out: "../target/js/main.js"
})