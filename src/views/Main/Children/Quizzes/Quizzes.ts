import { Component, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import Vuex, { mapState } from "vuex";
import store from "@/store";
import moment from "moment";
import getterMixin from "@/mixins/getterMixin";

@Component({
    filters: {
        trimLength(value: any): string {
            if (!value) return "-";
            if (value.length < 128) return value;
            return `${value.slice(0, 128)}...`;
        },
        formatDate(value: any): string {
            if (!value) return "-";
            const DATE = new Date(value * 1000);
            return moment(DATE).calendar();
        },
        formatFromNowDate(value: any): string {
            if (!value) return "-";
            const DATE = new Date(value * 1000);
            return moment(DATE).fromNow();
        },
    },
    computed: {
        ...mapState([
            "quizzes",
            "quiz_entries",
            "users",
            "entries",
            "subjects",
        ]),
    },
})
export default class Quizzes extends getterMixin {
    public quizzes!: any;
    public quiz_entries!: any;
    public users!: any;
    public entries!: any;
    public subjects!: any;

    public search = "";
    public searched: any = [];

    public showQuiz = false;
    public shownQuiz: any = [
        {
            quizId: 0,
        },
    ];
    public showAnswer = false;
    public currentQuestion = 0;
    public answer = "";

    /* Methods */
    public searchByEntry(items, term): any {
        if (!term) return items;
        const toLower = text => text.toString().toLowerCase();
        return items.filter(item =>
            toLower(item.title).includes(toLower(term))
        );
    }

    public searchOnTable(): void {
        this.searched = this.searchByEntry(this.quizzes, this.search);
    }

    public getQuizSubjects(): string {
        let subjects = "";
        const getSubjectId = quiz_entry => {
            return this.entries[quiz_entry.entryId - 1].subjectId;
        };
        this.quiz_entries.forEach(quiz_entry => {
            subjects += `${this.getSubject(getSubjectId(quiz_entry))}, `;
        });
        return subjects.substring(0, subjects.length - 2);
    }

    public onStartQuiz(quizId) {
        this.shownQuiz = this.quizzes.find(x => x.quizId == quizId);
        this.showQuiz = true;
        this.showAnswer = false;
    }

    // public onPreviousQuestion() {
    //     this.currentQuestion--;
    //     this.showAnswer = false
    // }

    public onNextQuestion() {
        this.currentQuestion++;
        this.showAnswer = false;
        this.answer = "";
    }

    public get quizLength() {
        let length = 0;
        this.quiz_entries.forEach(entry => {
            if (entry.quizId == this.shownQuiz.quizId) length++;
        });
        return length;
    }

    public get quizQuestion() {
        let entry = this.quiz_entries.find(
            x => x.quizId == this.shownQuiz.quizId
        );
        return this.entries.find(x => x.entryId == entry.entryId).question;
    }

    public get quizAnswer() {
        let entry = this.quiz_entries.find(
            x => x.quizId == this.shownQuiz.quizId
        );
        return this.entries.find(x => x.entryId == entry.entryId).answer;
    }

    mounted() {
        this.searchOnTable();
    }
}
