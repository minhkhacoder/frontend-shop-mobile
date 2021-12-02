import Vue from 'vue'
import Vuex from 'vuex'
import {products} from './modules/product.module'
import {category} from './modules/category.module'
import {auth} from './modules/auth.module'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    products,
    category
},
})