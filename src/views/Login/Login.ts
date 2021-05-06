import { Vue, Component } from "vue-property-decorator";
import store from "@/store";
import { mapState } from "vuex";
import router from "@/router";
import GetterMixin from "@/mixins/GetterMixin";

@Component({
    computed: {
        ...mapState(["currentUser", "userState"]),
    },
})
export default class Login extends GetterMixin {
    public currentUser!: any;
    public userState!: any;

    public form = {
        email: "leber.beselich@web.de",
        password: "adminadmin",
    };
    public remainLoggedIn = false;
    public rememberMe = false;

    public async login() {
        store.dispatch("updateLoadingSpinner", { isLoading: true, loadingSplash: "Anmelden..." });
        await this.sleep(1000);
        store.dispatch("loginUser", {
            email: this.form.email,
            password: this.form.password,
            expiresIn: this.remainLoggedIn ? "14d" : "24h",
        });
        store.dispatch("updateLoadingSpinner", { isLoading: false, loadingSplash: "" });
    }
}
