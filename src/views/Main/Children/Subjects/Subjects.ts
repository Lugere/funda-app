import { Component, Vue, Watch } from "vue-property-decorator";
import Vuex, { mapState } from "vuex";
import store from "@/store";
import moment from "moment";
import getterMixin from '@/mixins/getterMixin';

@Component({
    computed: {
        ...mapState(["entries", "subjects", "users"]),
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
    },
})
export default class Subjects extends getterMixin {
    /* Store Bindings */
    public entries!: any;
    public subjects!: any;
    public users!: any;

    /* Data */

    // Table Search
    public search = "";
    public searched: any = [];

    // Table Item Select
    public selected = [
        {
            subject_id: 0,
        },
    ];

    public showNewSubject = false;
    public newSubject = {
        subject_id: 1,
        title: "",
        description: "",
        user_id: 3,
        created_at: moment().unix(),
    };
    public resetNewSubject = this.newSubject;

    // Table Empty State Messages
    public noEntriesTxt = `Es existieren noch keine Fragen im Katalog`;
    public termNotFound = `Keine Fragen gefunden, die '${this.search}' enthalten.`;

    /* Methods */
    public searchByEntry(items, term): any {
        if (!term) return items;
        const toLower = text => text.toString().toLowerCase();
        return items.filter(item => toLower(item.title).includes(toLower(term)));
    }

    public searchOnTable(): void {
        this.searched = this.searchByEntry(this.subjects, this.search);
    }

    public getAlternateLabel(count): string {
        return `${count == this.subjects.length ? "Alle" : count} Kategorie${
            count > 1 ? "n" : ""
        } ausgwählt`;
    }

    public onSelect(items): void {
        this.selected = items;
    }

    public getUser(user_id) {
        return `${this.users.find(x => x.user_id == user_id).first_name} 
                ${this.users.find(x => x.user_id == user_id).last_name}`;
    }

    public getUserRole(user_id) {
        let role = this.users.find(x => x.user_id == user_id).role;
        switch (role) {
            case "admin":
                return "Administrator";
            case "teacher":
                return "Lehrer";
            case "student":
                return "Schüler";
        }
    }

    public getUserRoleLetter(user_id) {
        let role = this.users.find(x => x.user_id == user_id).role;
        switch (role) {
            case "admin":
                return "A";
            case "teacher":
                return "L";
            case "student":
                return "S";
        }
    }

    public getEntriesLength(subject_id): number {
        let count = 0;
        this.entries.forEach(entry => {
            if (entry.subject_id == subject_id) count++;
        });
        return count;
    }

    public deleteSubjects(): void {
        for (let i = 0; i < this.selected.length; i++) {
            let pos = this.subjects.findIndex(x => x.subject_id == this.selected[i].subject_id);
            if (this.entries.find(x => x.subject_id == this.subjects[pos].subject_id)) {
                alert("Es gibt Fragen die dieser Kategorie angehören!");
                return;
            } else this.subjects.splice(pos, 1);
        }
    }

    public onAbortNewSubject(): void {
        // Hide Dialog
        this.showNewSubject = false;
        //
        this.newSubject = this.resetNewSubject;
    }

    public onNewSubject(): void {
        // Create new Subject
        this.newSubject.subject_id = this.subjects.length + 1;
        store.dispatch("createSubject", this.newSubject);
        // Hide Dialog
        this.showNewSubject = false;
        this.newSubject = this.resetNewSubject;
    }

    public showQuestions(subject_id): void {
        store.commit("setSubject", subject_id);
        this.$router.push("/Entries");
    }

    /* Lifecycle hooks */

    public mounted() {
        this.searchOnTable();
        this.selected = [];
    }
}
