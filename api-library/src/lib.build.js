({
    baseUrl: "../src",
    optimize: 'none',
    namespace: "dr.require",
    paths: {
        "Util": "util/util",
        "Ajax": "util/ajax",
        "Class": "util/Class",
        'q': "../libs/q"
    },
    name: "../build/almond",
    include: ["Api"],
    insertRequire: ['Api'],
    out: "../target/drapi.js",
    wrap: true          
})