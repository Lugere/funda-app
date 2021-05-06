import { Component, Vue } from "vue-property-decorator";
import SiteNav from "@/components/SiteNav.vue";
import Vuex, { mapState } from "vuex";
import store from "@/store";
import GetterMixin from "@/mixins/GetterMixin";

@Component({
    components: {
        SiteNav,
    },
    computed: {
        ...mapState(["entries", "currentUser", "userState"]),
    },
})
export default class Main extends GetterMixin {
    /* Data */

    public entries!: any;
    public currentUser!: any;
    public userState!: any;

    public date = "";
    public time = "";
    public search = "";

    /* Methods */

    public async logout(): Promise<void> {
        store.dispatch("updateLoadingSpinner", { isLoading: true, loadingSplash: "Abmelden..." });
        await this.sleep(1000);
        store.dispatch("logoutUser");
        store.dispatch("updateLoadingSpinner", { isLoading: false, loadingSplash: "" });
    }

    public getDate(): string {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let weekday = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
        return `${weekday[date.getDay()]}, ${day}.${month}.${year}`;
    }

    public getTime(): string {
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    }

    public setTimestamp(): void {
        this.date = this.getDate();
        this.time = this.getTime();

        setInterval(() => {
            this.date = this.getDate();
            this.time = this.getTime();
        }, 1000);
    }

    public checkRoute(route): boolean {
        return route === this.$router.currentRoute.fullPath;
    }

    public changeRoute(route): void {
        if (this.$router.currentRoute.fullPath !== route) this.$router.push(route);
    }

    /* Getters */
    public get isAdmin(): boolean {
        return this.currentUser.role === "admin";
    }

    /* Lifecycle hooks */
    public mounted() {
        store.dispatch("fetchAll");
        store.dispatch("fetchUser");
        this.setTimestamp();
        document.title = `FUNDA - Fragen & Antworten | ${this.getRouteString()}`;
    }
}
