module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'jorge',
    themeColor: '#1976d2',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc : 'src/service-worker.js'
    }
  }
}