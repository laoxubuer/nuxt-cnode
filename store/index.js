import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'
import CreateAxios from '../utils/axios'

Vue.use(Vuex)

const createStore = () => {
    let store = new Vuex.Store({
        state,
        getters,
        mutations,
        actions
    })

    store.$axios = store.state.$axios =  new CreateAxios(store)

    if (process.browser) {
        let replaceState = store.replaceState.bind(store)
        store.replaceState = (...args) => {
            replaceState(...args)
            store.state.$axios = store.$axios
            replaceState = null
        }
    }

    return store
}

export default createStore
