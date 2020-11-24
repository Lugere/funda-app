import { Vue, Component } from "vue-property-decorator";
import store from "@/store";
import { mapState } from 'vuex';
import router from '@/router';

@Component({
    computed: {
        ...mapState(["currentUser", "userState"])
    }
})
export default class Login extends Vue {
    public currentUser!: any;
    public userState!: any;

    public form = {
        email: "robin.leber@itacsoftware.com",
        password: "test",
    };
    public remainLoggedIn = false;
    public rememberMe = false;

    public login() {
        // store.dispatch("login", {
        //     email: this.form.email,
        //     password: this.form.password,
        // });
        // console.log(this.currentUser);
        // console.log("login userstate:" + this.userState);
        router.push("/Entries");
    }
}
