import { Component, Vue, Watch } from "vue-property-decorator";
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
        ...mapState(["quizzes", "quiz_entries", "users", "entries", "subjects"]),
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
            quiz_id: 0,
        },
    ];
    public showAnswer = false;
    public currentQuestion = 0;
    public answer = "";
    public selfEvaluation = "";

    /* Methods */
    public searchByEntry(items, term): any {
        if (!term) return items;
        const toLower = text => text.toString().toLowerCase();
        return items.filter(item => toLower(item.title).includes(toLower(term)));
    }

    public searchOnTable(): void {
        this.searched = this.searchByEntry(this.quizzes, this.search);
    }

    public getQuizSubjects(quiz_id): string {
        let subjects = "";
        const getSubject_id = quiz_entry => {
            return this.entries[quiz_entry.entry_id - 1].subject_id;
        };
        let _quiz_entries = this.quiz_entries.filter(quiz_entry => quiz_entry.quiz_id == quiz_id);
        _quiz_entries.forEach(quiz_entry => {
            let subject = `${this.getSubject(getSubject_id(quiz_entry))}, `;
            if (!subjects.includes(subject)) subjects += subject;
        });
        // Remove last comma from string
        return subjects.substring(0, subjects.length - 2);
    }

    public onCreateQuiz() {
        return;
    }

    public onStartQuiz(quiz_id) {
        this.shownQuiz = this.quizzes.find(x => x.quiz_id == quiz_id);
        this.showQuiz = true;
        this.showAnswer = false;
        this.currentQuestion = 0;
        this.selfEvaluation = "";
    }

    public onEndQuiz() {
        this.showQuiz = false;
        this.showAnswer = false;
        this.currentQuestion = 0;
        this.selfEvaluation = "";
        this.answer = "";
    }

    public onNextQuestion() {
        this.currentQuestion++;
        this.showAnswer = false;
        this.selfEvaluation = "";
        this.answer = "";
    }

    public get quizLength() {
        let length = 0;
        this.quiz_entries.forEach(entry => {
            if (entry.quiz_id == this.shownQuiz.quiz_id) length++;
        });
        return length;
    }

    public get quizQuestion() {
        let entry = this.quiz_entries.filter(x => x.quiz_id == this.shownQuiz.quiz_id);
        return this.entries.find(x => x.entry_id == entry[this.currentQuestion].entry_id).question;
    }

    public get quizAnswer() {
        let entry = this.quiz_entries.filter(x => x.quiz_id == this.shownQuiz.quiz_id);
        return this.entries.find(x => x.entry_id == entry[this.currentQuestion].entry_id).answer;
    }

    /* Watchers */
    @Watch("quizzes", { immediate: true, deep: true })
    public handler() {
        this.searchOnTable();
    }

    /* Lifecycle hooks */
    mounted() {
        this.searchOnTable();
        console.log(this.quiz_entries);
    }
}
