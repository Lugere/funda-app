import { Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { Component, Mixin } from "vue-mixin-decorator";

@Component({
    computed: {
        ...mapState(["quizzes", "quiz_entries", "users", "entries", "subjects"]),
    },
})
export default class GetterMixin extends Vue {
    public users!: any;
    public entries!: any;
    public subjects!: any;
    public quizzes!: any;
    public quiz_entries!: any;

    public sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public getSubject(subject_id) {
        if (subject_id && this.subjects && subject_id > 0) {
            return this.subjects.find(subject => subject.subject_id === subject_id).title;
        }
    }

    public getUser(user_id: number, format: string) {
        const user = this.users.find(user => user.user_id === user_id);
        if (!user) return "[gelöscht]";
        switch (format) {
            case "full":
                return `${user.first_name} ${user.last_name}`;
            case "short":
                return `${user.first_name} ${user.last_name.charAt(0)}.`;
            default:
                return `getUser(user_id=${user_id}, format=${format})`;
        }
    }

    public getUserRole(user_id: number) {
        if (user_id && this.users && user_id > 0) {
            let role = this.users.find(user => user.user_id === user_id).role;
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
        if (user_id && this.users && user_id > 0) {
            let role = this.users.find(user => user.user_id === user_id).role;
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
