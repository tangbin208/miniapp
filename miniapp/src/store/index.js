import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger"

//引入模块

import list from "./modules/list"
import add from "./modules/addInterView"
import search from "./modules/search"

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        list,
        add,
        search,
    },
    plugins:[createLogger()]
})
