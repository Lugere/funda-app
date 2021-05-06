import { Component, Vue, Watch } from "vue-property-decorator";
import Vuex, { mapState } from "vuex";
import store from "@/store";
import moment from "moment";
import GetterMixin from "@/mixins/GetterMixin";

@Component({
    computed: {
        ...mapState(["entries", "subjects", "users", "comments", "subject", "currentUser"]),
    },
    filters: {
        checkLength(value: any): string {
            if (!value) return "-";
            return value;
        },
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
export default class Entries extends GetterMixin {
    /* Store Bindings */
    public entries!: any;
    public subjects!: any;
    public users!: any;
    public comments!: any;
    public subject!: any;
    public currentUser!: any;

    /* Data */
    // Subject Select
    public currentSubject = 0;

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
    public lastShownEntry: number = 0;

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
        return items.filter(item => toLower(item.question).includes(toLower(term)));
    }

    public searchBySubject(items) {
        if (this.currentSubject === 0) return items;
        return (this.searched = this.searched.filter(entry => entry.subject_id === this.currentSubject));
    }

    public searchOnTable(): void {
        store.commit("setSubject", this.currentSubject);
        this.searched = this.searchByEntry(this.entries, this.search);
        this.searched = this.searchBySubject(this.searched);
    }

    public getAlternateLabel(count): string {
        return `${count === this.entries.length ? "Alle" : count} Frage${
            count > 1 ? "n" : ""
        } ausgwählt`;
    }

    public onSelect(items): void {
        this.selected = items;
    }

    public onClearSelection(): void {
        this.selected = [];
    }

    public onDeleteEntries(): void {
        for (const selected of this.selected) {
            let pos = this.entries.findIndex(entry => entry.entry_id === selected.entry_id);
            store.dispatch("deleteEntry", {
                id: this.entries[pos].entry_id,
                tableName: "entries",
                columnName: "entry_id",
            });
        }
    }

    public onDeleteEntry(): void {
        this.showEntry = false;
        store.dispatch("deleteEntry", {
            id: this.shownEntry.entry_id,
            tableName: "entries",
            columnName: "entry_id",
        });
    }

    public onShowNewEntry(): void {
        // Show Dialog
        this.showNewEntry = true;
        this.newEntry.question = "";
        this.newEntry.answer = "";
        this.newEntry.hint = "";
        this.newEntry.subject_id = this.currentSubject > 0 ? this.currentSubject : 1;
    }

    public onAbortNewEntry(): void {
        // Hide Dialog
        this.showNewEntry = false;
    }

    public onNewEntry(): void {
        // Create new entry
        this.newEntry.created_at = moment().unix();
        if (this.currentSubject > 0) this.newEntry.subject_id = `${this.currentSubject}`;
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
        this.showEntryIndex = this.entries.findIndex(entry => entry.entry_id === entry_id);
        this.shownEntry = this.entries[this.showEntryIndex];
    }

    public onAbortNewComment(): void {
        this.showComment = false;
        this.newComment.content = "";
    }

    public onNewComment(): void {
        this.newComment.created_at = moment().unix();
        this.newComment.entry_id = this.shownEntry.entry_id;
        this.newComment.user_id = this.currentUser.user_id;
        store.dispatch("createEntry", {
            data: this.newComment,
            tableName: "comments",
        });
        // Reset dialog
        this.onAbortNewComment();
    }

    public onDeleteComment(comment_id): void {
        let pos = this.comments.findIndex(comment => comment.comment_id === comment_id);
        store.dispatch("deleteEntry", {
            id: this.comments[pos].comment_id,
            tableName: "comments",
            columnName: "comment_id",
        });
    }

    public onShowUpdate(): void {
        if (this.selected.length > 0) {
            this.newEntry.question = this.selected[0].question;
            this.newEntry.answer = this.selected[0].answer;
            this.newEntry.hint = this.selected[0].hint;
            this.newEntry.subject_id = this.selected[0].subject_id;
        } else {
            this.newEntry.question = this.shownEntry.question;
            this.newEntry.answer = this.shownEntry.answer;
            this.newEntry.hint = this.shownEntry.hint;
            this.newEntry.subject_id = this.shownEntry.subject_id;
            this.showEntry = false;
        }
        this.isUpdate = true;
        this.showNewEntry = true;
    }

    public onUpdateEntry(): void {
        this.newEntry.entry_id =
            this.selected.length > 0 ? this.selected[0].entry_id : this.shownEntry.entry_id;
        store.dispatch("updateEntry", {
            data: this.newEntry,
            tableName: "entries",
        });
        this.showNewEntry = false;
    }

    public onAbortUpdate(): void {
        this.showNewEntry = false;
        this.showEntry = true;
    }

    /* Watchers */
    @Watch("entries", { immediate: true, deep: true })
    public handler() {
        this.searchOnTable();
    }

    /* Getters */
    get entryComments() {
        return this.comments.filter(comment => comment.entry_id === this.shownEntry.entry_id);
    }

    get commentsCount() {
        let count = this.comments.filter(comment => comment.entry_id === this.shownEntry.entry_id).length;
        if (count > 0) return `${count} Kommentar${count > 1 ? "e" : ""}`;
        return "Keine Kommentare";
    }
    /* Lifecycle hooks */
    public mounted() {
        this.selected = [];
        this.currentSubject = this.subject;
        this.searchOnTable();
    }
}
