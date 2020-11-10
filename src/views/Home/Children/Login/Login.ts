import { Vue, Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    form = {
        email: "",
        password: "",
    };
    rememberMe = false;
    remainLoggedIn = false;
    showLogin = false;

    public toggleLogin(): void {
        this.showLogin = !this.showLogin;
    }

    get currentPasth(): string {
        return window.location.pathname;
    }
}
