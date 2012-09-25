({
    baseUrl: "../src",
    paths: {
        "Util": "util/util",
        "Ajax": "util/ajax",
        "Class": "util/Class",
        'q': "../libs/q",
        'drapi': "Api" 
    },
    name: "drapi",
    out: "../target/drapi.amd.noq.min.js",
    exclude: ['q']
})