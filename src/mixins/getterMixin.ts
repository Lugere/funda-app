import { Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { Component, Mixin } from "vue-mixin-decorator";

@Component({
    computed: {
        ...mapState(["quizzes", "quiz_entries", "users", "entries", "subjects"]),
    },
})
export default class getterMixin extends Vue {
    public users!: any;
    public entries!: any;
    public subjects!: any;

    public getSubject(subjectId) {
        return `${this.subjects.find(x => x.subjectId == subjectId).title}`;
    }

    public getUser(userId: number) {
        return `${this.users.find(x => x.userId == userId).firstName} 
                ${this.users.find(x => x.userId == userId).lastName}`;
    }

    public getUserRole(userId) {
        let role = this.users.find(x => x.userId == userId).role;
        switch (role) {
            case "admin":
                return "Administrator";
            case "teacher":
                return "Lehrer";
            case "student":
                return "Schüler";
        }
    }

    public getUserRoleLetter(userId) {
        let role = this.users.find(x => x.userId == userId).role;
        switch (role) {
            case "admin":
                return "A";
            case "teacher":
                return "L";
            case "student":
                return "S";
        }
    }

    public getRouteString(): string {
        return this.$route.meta.breadcrumb;
    }
}
