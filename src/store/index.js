import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index'
import { defaultRoutes, mapRoutes } from '../utils/routerAdmin';
import {menus} from "../utils/menuAdmin";
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        defaultRoutes,
        dynamicRoutes:[],
        menus:[]
    },
    actions: {
        getUser(context,params) {
            store.state.menus = JSON.parse(sessionStorage.getItem('menus'))|| JSON.parse(JSON.stringify(menus))
            context.commit('set_menus');
            context.commit('set_router');
        }
    },
    mutations: {
        set_menus(state){
            state.menus.map(item =>{
                if(item.children){
                    state.dynamicRoutes.push(...item.children)
                }else{
                    state.dynamicRoutes.push(item)
                }
            })
        },
        set_router(state) {
            state.defaultRoutes.map(item => {
                if (item.children) {
                    if (item.children.length === 2) {
                        item.children.push(...state.dynamicRoutes)
                        state.dynamicRoutes.map(item => item.component = mapRoutes(item.component))
                        router.addRoutes(state.defaultRoutes)
                    }
                }
            })
        }
    }
})

export default store