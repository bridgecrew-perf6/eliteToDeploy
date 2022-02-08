module.exports = {
  devServer: {
    proxy: 'http://localhost:8080'
  },
  // devServer: {
  //   port: 8081
  // },
  transpileDependencies: [
    'vuetify'
  ]
}
