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

    public getSubject(subject_id) {
        // return `${this.subjects.find(x => x.subject_id == subject_id).title}`;
        return "asf";
    }

    public getUser(user_id: number) {
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

    public getRouteString(): string {
        return this.$route.meta.breadcrumb;
    }
}
