import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from "./store";
import VuetifyConfirm from 'vuetify-confirm';
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Valider',
  buttonFalseText: 'Annuler',
  buttonTrueColor: 'white',
  buttonFalseColor: 'red',
  buttonTrueFlat: false,
  buttonFalseFlat: true,
  color: 'red',
  title: 'Attention',
  width: 500,
  property: '$confirm'
})

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
