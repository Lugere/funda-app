import { Component, Vue, Watch } from "vue-property-decorator";
import Vuex, { mapState } from "vuex";
import store from "@/store";
import moment from "moment";
import getterMixin from '@/mixins/getterMixin';

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
    public subject!: number;

    /* Data */
    // Subject Select
    currentSubject = 0;

    // Table Search
    public search = "";
    public searched: any = [];

    // Table Item Select
    public selected = [
        {
            entryId: 0,
        },
    ];

    public showNewEntry = false;
    public newEntry = {
        answer: "",
        createdAt: moment().unix(),
        entryId: 1,
        hint: "",
        question: "",
        subjectId: 1,
        userId: 3,
    };
    public resetNewEntry: any = {};

    public showEntry = false;
    public showEntryIndex: number = 0;
    public shownEntry = {
        entryId: 1,
        userId: 2,
        subjectId: 3,
    };

    public newComment = {
        commentId: 1,
        content: "",
        createdAt: moment().unix(),
        entryId: 1,
        userId: 1,
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
        if (this.currentSubject == 0) return items;
        return (this.searched = this.searched.filter(x => x.subjectId == this.currentSubject));
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
            let pos = this.entries.findIndex(x => x.entryId == this.selected[i].entryId);
            this.entries.splice(pos, 1);
        }
    }

    public onAbortNewEntry(): void {
        // Hide Dialog
        this.showNewEntry = false;
        this.newEntry.question = "";
        this.newEntry.answer = "";
        this.newEntry.hint = "";
        this.newEntry.subjectId = 1;
    }

    public onNewEntry(): void {
        // Create new entry
        this.newEntry.createdAt = moment().unix();
        this.newEntry.entryId = this.entries.length + 1;
        store.dispatch("createEntry", this.newEntry);
        // Reset Dialog
        this.onAbortNewEntry();
    }

    public onShowEntry(entryId): void {
        this.showEntry = true;
        this.showEntryIndex = this.entries.findIndex(x => x.entryId == entryId);
        this.shownEntry = this.entries[this.showEntryIndex];
    }

    public onAbortNewComment(): void {
        this.showComment = false;
        this.newComment.content = "";
    }

    public onCreateNewComment(): void {
        this.newComment.createdAt = moment().unix();
        this.newComment.commentId = this.comments.length + 1;
        this.newComment.entryId = this.shownEntry.entryId;
        this.newComment.userId = 3;
        store.dispatch("createComment", this.newComment);
        // Reset dialog
        this.onAbortNewComment();
    }

    public onDeleteComment(commentId): void {
        let pos = this.comments.findIndex(x => x.commentId == commentId);
        this.comments.splice(pos, 1);
    }

    /* Getters */

    get entryComments() {
        return this.comments.filter(x => x.entryId == this.shownEntry.entryId);
    }

    get commentsCount() {
        let count = this.comments.filter(x => x.entryId == this.shownEntry.entryId).length;
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
