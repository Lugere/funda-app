import { Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { Component, Mixin } from "vue-mixin-decorator";

@Component({
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
export default class getterMixin extends Vue {
    public users!: any;
    public entries!: any;
    public subjects!: any;
    public quizzes!: any;
    public quiz_entries!: any;

    public getSubject(subject_id) {
        if (subject_id) {
            return this.subjects.find(
                subject => subject.subject_id == subject_id
            ).title;
        }
    }

    public getUser(user_id: number) {
        if (user_id) {
            return `${
                this.users.find(user => user.user_id == user_id).first_name
            }`;
        }
    }

    public getUserRole(user_id: number) {
        if (user_id) {
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
    }

    public getUserRoleLetter(user_id) {
        return user_id;
        if (user_id) {
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
    }

    public getRouteString(): string {
        return this.$route.meta.breadcrumb;
    }
}
