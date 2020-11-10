import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
    timestamp = "";

    getTimestamp(): string {
        let day = new Date().getDate();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        return `${day}.${month}.${year} | ${hours}:${minutes}`;
    }

    setTimestamp(): void {
        this.timestamp = this.getTimestamp();

        setInterval(() => {
            this.timestamp = this.getTimestamp();
        }, 1000);
    }

    mounted() {
        this.setTimestamp();
    }
}
