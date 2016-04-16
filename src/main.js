import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import routerMap from './router'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter()

routerMap(router)

router.start(App, 'app')


