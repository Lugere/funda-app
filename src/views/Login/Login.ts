import { Vue, Component } from "vue-property-decorator";
import store from '@/store';

@Component
export default class Login extends Vue {
    form = {
        email: "",
        password: "",
    };
    rememberMe = false;

    login() {
        store.dispatch("login")
    }
}
