import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from "./store";
import VuetifyConfirm from 'vuetify-confirm';
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {FullCalendar} from "vue-full-calendar";
import { domain, clientId } from '../auth_config.json';
import { Auth0Plugin } from './auth';

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname,
    );
  },
});

Vue.config.productionTip = false;

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
}, FullCalendar)

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
