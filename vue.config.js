module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: "src/main.ts",
      template: "public/index.html",
      filename: "index.html",
      title: "FUNDA - Fragen und Antworten",
    }
  },
  devServer: {
      proxy: "http://localhost/"
  }
}
