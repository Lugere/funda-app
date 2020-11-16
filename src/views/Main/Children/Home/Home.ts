import { Vue, Component } from "vue-property-decorator";
import store from "@/store";

@Component
export default class Home extends Vue {
    mounted() {
        document.title = "FUNDA - Fragen & Antworten | Home";
    }
}
