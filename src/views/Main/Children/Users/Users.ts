import { Component, Vue, Watch } from "vue-property-decorator";
import Vuex, { mapState } from "vuex";
import store from "@/store";
import moment from "moment";
import GetterMixin from "@/mixins/GetterMixin";

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
export default class Users extends GetterMixin {
    /* Store Bindings */
    public users!: any;

    // Table Search
    public search = "";
    public searched: any = [];

    // Table Item Select
    public selected: any = [];
    public showNewUser = false;
    public newUser = {
        created_at: moment().unix(),
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
        return items.filter(item => toLower(item.username).includes(toLower(term)));
    }

    public searchOnTable(): void {
        this.searched = this.searchByUser(this.users, this.search);
    }

    public getAlternateLabel(count): string {
        return `${count === this.users.length ? "Alle" : count} Benutzer ausgwählt`;
    }

    public deleteUsers(): void {
        for (const selected of this.selected) {
            let pos = this.users.findIndex(user => user.user_id === selected.user_id);
            store.dispatch("deleteEntry", {
                id: this.users[pos].user_id,
                tableName: "users",
                columnName: "user_id",
            });
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

    public onShwoNewUser(): void {
        this.onGeneratePassword();
        this.showNewUser = true;
    }

    public onCreateNewUser(): void {
        // Create new user
        this.newUser.username = this.username;
        this.newUser.created_at = moment().unix();
        store.dispatch("createEntry", {
            data: this.newUser,
            tableName: "users",
        });
        console.log(this.newUser);
        // Reset Dialog
        this.onAbortNewUser();
    }

    public onShowUser(user_id): void {
        this.showUser = true;
        this.showUserIndex = this.users.findIndex(user => user.user_id === user_id);
        this.shownUser = this.entries[this.showUserIndex];
    }

    public onGeneratePassword(): void {
        let randString = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

        for (let i = 0; i < 8; i++) {
            randString += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        this.newUser.password = randString;
    }

    public onSelect(items): void {
        this.selected = items;
    }

    /* Getters */
    public classs = "";

    get username() {
        let username = "";
        username += `${this.newUser.first_name.substr(0, 5)}${this.newUser.last_name.substr(
            0,
            1,
        )}`.toLowerCase();
        if (this.newUser.first_name) {
            switch (this.newUser.role) {
                case 1:
                    username += "-admin";
                    break;
                case 2:
                    username += `-${this.classs}`;
                    break;
                case 3:
                    username += "-teacher";
                    break;
            }
        }
        return username;
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
