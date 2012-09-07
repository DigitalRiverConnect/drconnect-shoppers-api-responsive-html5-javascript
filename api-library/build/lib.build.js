({
    baseUrl: "../src",
    optimize: 'none',
    paths: {
        "Util": "util/util",
        "Ajax": "util/ajax",
        "Class": "util/Class",
        'q': "../libs/q"
    },
    name: "../build/almond",
    include: ["Wrapper"],
    insertRequire: ['Wrapper'],
    out: "../target/drapi.min.js",
    wrap: true          
})