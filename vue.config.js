module.exports = {
    lintOnSave: false,
    pages: {
        index: {
            entry: "src/main.ts",
            template: "public/index.html",
            filename: "index.html",
            title: "FUNDA - Fragen & Antworten",
        },
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                  @import "utilities/_variables";
                `,
            },
        },
    },
};
