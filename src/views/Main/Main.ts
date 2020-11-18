import { Component, Vue } from "vue-property-decorator";
import SiteNav from "@/components/SiteNav.vue";
import Vuex, { mapState } from "vuex";
import store from "@/store";
import getterMixin from '@/mixins/getterMixin';

@Component({
    components: {
        SiteNav,
    },
    computed: {
        ...mapState(["entries"]),
    },
})
export default class Main extends getterMixin {
    /* Data */

    public entries!: any;
    public date = "";
    public time = "";
    public search = "";

    /* Methods */

    public logout(): void {
        store.dispatch("logout");
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
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    }

    public setTimestamp(): void {
        this.date = this.getDate();
        this.time = this.getTime();

        setInterval(() => {
            this.date = this.getDate();
            this.time = this.getTime();
        }, 60000);
    }

    public checkRoute(route): boolean {
        return route === this.$router.currentRoute.fullPath;
    }

    public changeRoute(route): void {
        if (this.$router.currentRoute.fullPath != route) this.$router.push(route);
    }

    /* Lifecycle hooks */

    public created() {
        store.dispatch("fetchEntries");
        store.dispatch("fetchSubjects");
        store.dispatch("fetchUsers");
        store.dispatch("fetchQuizzes");
        store.dispatch("fetchComments");
        this.setTimestamp();
        document.title = `FUNDA - Fragen & Antworten | ${this.getRouteString()}`;
    }
}
