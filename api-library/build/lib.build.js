({
    baseUrl: "../src",
    optimize:"none",
    paths: {
        "Util": "util/util",
        "Ajax": "util/ajax",
        "Class": "util/Class",
        'q': "../libs/q"
    },
    name: "../build/almond",
    include: ["Wrapper"],
    out: "../target/drapi.js",
    wrap: {
        start: "(function() {",
        end: "require(['Wrapper'], null, null, true); }());"
    }        
})