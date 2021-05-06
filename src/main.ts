import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// Import Vue Material
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
Vue.use(VueMaterial);

// Import Element-UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
