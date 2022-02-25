module.exports = {
  devServer: {
    // proxy: 'https://afternoon-castle-40052.herokuapp.com',
    proxy: 'http://localhost:5000',
    port: 8081
  },
  transpileDependencies: [
    'vuetify'
  ]
}
