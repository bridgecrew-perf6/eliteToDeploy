module.exports = {
  devServer: {
    // proxy: 'https://afternoon-castle-40052.herokuapp.com',
    proxy: process.env.VUE_APP_PROXY,
    port: 8081
  },
  transpileDependencies: [
    'vuetify'
  ]
}
