import { Component, Vue } from "vue-property-decorator";
import SiteNav from "@/components/SiteNav.vue";

@Component({
    components: {
        SiteNav
    }
})
export default class Home extends Vue {
    get currentPath(): string {
        return window.location.pathname;
    }
}
