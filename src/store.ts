import Vue from 'vue'
import Vuex from 'vuex'
import {createVuexStore} from 'vuex-simple';
import {Store} from './store/';

Vue.use(Vuex)

const rootStore = new Store();

export default createVuexStore(rootStore)
