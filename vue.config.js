module.exports = {
  devServer: {
    proxy: process.env.VUE_APP_PROXY,
    port: 8081
  },
  transpileDependencies: [
    'vuetify'
  ]
}
