import { Component, Vue, Watch } from "vue-property-decorator";
import Vuex, { mapState } from "vuex";
import store from "@/store";
import moment from "moment";
import getterMixin from "@/mixins/getterMixin";

@Component({
    computed: {
        ...mapState(["users"]),
    },
    filters: {
        trimLength(value: any): string {
            if (!value) return "-";
            if (value.length < 60) return value;
            return `${value.slice(0, 60)}...`;
        },
        formatDate(value: any): string {
            if (!value) return "-";
            const DATE = new Date(value * 1000);
            return moment(DATE).calendar();
        },
        formatCommentDate(value: any): string {
            if (!value) return "-";
            const DATE = new Date(value * 1000);
            return moment(DATE).fromNow();
        },
    },
})
export default class Users extends getterMixin {
    /* Store Bindings */
    public users!: any;

    /* Data */
    // Subject Select
    currentSubject = 0;

    // Table Search
    public search = "";
    public searched: any = [];

    // Table Item Select
    public selected = [
        {
            userId: 0,
        },
    ];
    public showNewUser = false;
    public newUser = {
        user_id: 0,
        createdAt: moment().unix(),
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: 1,
        username: "",
    };
    public resetNewUser: any = {};

    public showUser = false;
    public showUserIndex = 0;
    public shownUser: any = {};

    // Table Empty State Messages
    public noUsersTxt = `Es existieren noch keine Fragen im Katalog`;
    public termNotFound = `Keine Fragen gefunden, die '${this.search}' enthalten.`;

    /* Methods */
    public searchByUser(items, term): any {
        if (!term) return items;
        const toLower = text => text.toString().toLowerCase();
        return items.filter(item =>
            toLower(item.username).includes(toLower(term))
        );
    }

    public searchOnTable(): void {
        this.searched = this.searchByUser(this.users, this.search);
    }

    public getAlternateLabel(count): string {
        return `${
            count == this.users.length ? "Alle" : count
        } Benuter ausgwählt`;
    }

    public deleteUsers(): void {
        for (let i = 0; i < this.selected.length; i++) {
            let pos = this.users.findIndex(
                x => x.userId == this.selected[i].userId
            );
            this.users.splice(pos, 1);
        }
    }

    public onAbortNewUser(): void {
        // Hide Dialog
        this.showNewUser = false;
        this.newUser.first_name = "";
        this.newUser.last_name = "";
        this.newUser.email = "";
        this.newUser.password = "";
        this.newUser.role = 1;
        this.newUser.username = "";
    }

    public onNewUser(): void {
        // Create new user
        this.newUser.createdAt = moment().unix();
        this.newUser.user_id = this.users.length + 1;
        store.dispatch("createUser", this.newUser);
        // Reset Dialog
        this.onAbortNewUser();
    }

    public onShowUser(user_id): void {
        this.showUser = true;
        this.showUserIndex = this.users.findIndex(
            user => user.user_id == user_id
        );
        this.shownUser = this.entries[this.showUserIndex];
    }

    public onSelect(items): void {
        this.selected = items;
    }

    /* Watchers */
    @Watch("users", { immediate: true, deep: true })
    public handler() {
        this.searchOnTable();
    }

    /* Lifecycle hooks */
    public mounted() {
        this.selected = [];
        this.searchOnTable();
    }
}
