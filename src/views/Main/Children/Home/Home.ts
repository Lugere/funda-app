import { Vue, Component } from "vue-property-decorator";
import store from "@/store";

@Component
export default class Home extends Vue {
    public mounted() {
        document.title = "FUNDA - Fragen & Antworten | Home";
    }
}
