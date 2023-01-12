import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"

//import { library } from '@fortawesome/fontawesome-svg-core'

//import { faHatWizard } from '@fortawesome/free-solid-svg-icons'

//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//library.add(faHatWizard)

//Vue.component('font-awesome-icon', FontAwesomeIcon)