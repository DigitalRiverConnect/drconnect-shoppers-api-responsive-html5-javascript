({
    baseUrl: "../src",
    paths: {
        "Util": "util/util",
        "Ajax": "util/ajax",
        "Class": "util/Class",
        'q': "../libs/q"
    },
    name: "../build/almond",
    include: ["Wrapper"],
    out: "../target/drapi.min.js",
    wrap: {
        start: "(function() {",
        end: "require(['Wrapper'], null, null, true); }());"
    }        
})