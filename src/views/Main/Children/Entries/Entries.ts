import { Component, Vue, Watch } from "vue-property-decorator";
import Vuex, { mapState } from "vuex";
import store from "@/store";
import moment from "moment";
import getterMixin from "@/mixins/getterMixin";
import mainEventBus from "@/components/mainEventBus";

@Component({
    computed: {
        ...mapState(["entries", "subjects", "users", "comments", "subject"]),
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
export default class Entries extends getterMixin {
    /* Store Bindings */
    public entries!: any;
    public subjects!: any;
    public users!: any;
    public comments!: any;
    public subject!: any;

    /* Data */
    // Subject Select
    currentSubject = 0;

    // Table Search
    public search = "";
    public searched: any = [];

    // Table Item Select
    public selected: any = [];

    public showNewEntry = false;
    public newEntry: any = {
        subject_id: 1,
        question: "",
        answer: "",
        hint: "",
        user_id: 1,
        created_at: moment().unix(),
    };
    public isUpdate = false;
    public resetNewEntry: any = {};

    public showEntry = false;
    public showEntryIndex: number = 0;
    public shownEntry: any = {};

    public newComment: any = {
        content: "",
        entry_id: 1,
        user_id: 1,
        created_at: moment().unix(),
    };
    public resetNewComment: any = {};
    public showComment = false;

    // Table Empty State Messages
    public noEntriesTxt = `Es existieren noch keine Fragen im Katalog`;
    public termNotFound = `Keine Fragen gefunden, die '${this.search}' enthalten.`;

    /* Methods */
    public searchByEntry(items, term): any {
        if (!term) return items;
        const toLower = text => text.toString().toLowerCase();
        return items.filter(item =>
            toLower(item.question).includes(toLower(term))
        );
    }

    public searchBySubject(items) {
        if (this.currentSubject == 0) return items;
        return (this.searched = this.searched.filter(
            x => x.subject_id == this.currentSubject
        ));
    }

    public searchOnTable(): void {
        store.commit("setSubject", this.currentSubject);
        this.searched = this.searchByEntry(this.entries, this.search);
        this.searched = this.searchBySubject(this.searched);
    }

    public getAlternateLabel(count): string {
        return `${count == this.entries.length ? "Alle" : count} Frage${
            count > 1 ? "n" : ""
        } ausgwählt`;
    }

    public onSelect(items): void {
        this.selected = items;
    }

    public deleteEntries(): void {
        for (let i = 0; i < this.selected.length; i++) {
            let pos = this.entries.findIndex(
                x => x.entry_id == this.selected[i].entry_id
            );
            store.dispatch("deleteEntry", {
                id: this.entries[pos].entry_id,
                tableName: "entries",
                columnName: "entry_id",
            });
        }
    }

    public onAbortNewEntry(): void {
        // Hide Dialog
        this.showNewEntry = false;
        this.newEntry.question = "";
        this.newEntry.answer = "";
        this.newEntry.hint = "";
        this.newEntry.subject_id = 1;
    }

    public onNewEntry(): void {
        // Create new entry
        console.log("onNewEntry");
        this.newEntry.created_at = moment().unix();
        store.dispatch("createEntry", {
            data: this.newEntry,
            tableName: "entries",
        });
        // Reset Dialog
        this.onAbortNewEntry();
    }

    public onShowEntry(entry_id): void {
        this.isUpdate = false;
        this.showEntry = true;
        this.showEntryIndex = this.entries.findIndex(
            entry => entry.entry_id == entry_id
        );
        this.shownEntry = this.entries[this.showEntryIndex];
    }

    public onAbortNewComment(): void {
        this.showComment = false;
        this.newComment.content = "";
    }

    public onNewComment(): void {
        this.newComment.created_at = moment().unix();
        this.newComment.entry_id = this.shownEntry.entry_id;
        this.newComment.user_id = 3;
        store.dispatch("createEntry", {
            data: this.newComment,
            tableName: "comments",
        });
        // Reset dialog
        this.onAbortNewComment();
    }

    public onDeleteComment(comment_id): void {
        let pos = this.comments.findIndex(x => x.comment_id == comment_id);
        store.dispatch("deleteEntry", {
            id: this.comments[pos].comment_id,
            tableName: "comments",
            columnName: "comment_id",
        });
    }

    public onShowUpdate(): void {
        this.showNewEntry = true;
        this.newEntry.question = this.selected[0].question;
        this.newEntry.answer = this.selected[0].answer;
        this.newEntry.hint = this.selected[0].hint;
        this.newEntry.subject_id = this.selected[0].subject_id;
        this.isUpdate = true;
    }

    public onUpdateEntry(): void {
        this.newEntry.entry_id = this.selected[0].entry_id;
        store.dispatch("updateEntry", {
            data: this.newEntry,
            tableName: "entries",
        });
        this.showNewEntry = false;
    }

    /* Getters */
    get entryComments() {
        return this.comments.filter(
            x => x.entry_id == this.shownEntry.entry_id
        );
    }

    get commentsCount() {
        let count = this.comments.filter(
            x => x.entry_id == this.shownEntry.entry_id
        ).length;
        if (count > 0) return `${count} Kommentar${count > 1 ? "e" : ""}`;
        return "Keine Kommentare";
    }

    /* Lifecycle hooks */

    public mounted() {
        this.selected = [];
        this.currentSubject = this.subject;
        this.searchOnTable();
        mainEventBus.$on("fetchedDb", () => {
            this.entries = store.state.entries;
            this.subjects = store.state.subjects;
            this.users = store.state.users;
            this.comments = store.state.comments;
            this.subject = store.state.subject;
        });
    }
}
