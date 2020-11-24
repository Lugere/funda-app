import Vue from "vue";
import Vuex, { Store } from "vuex";
import router from "../router";
import mainEventBus from "@/components/mainEventBus";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: () => ({
        entries: [],
        subjects: [],
        users: [],
        comments: [],
        quizzes: [],
        quiz_entries: [],
        subject: 0,
        currentUser: {}
    }),
    mutations: {
        setUser(state, val) {
            state.currentUser = val;
        },
        setEntries(state, val) {
            state.entries = val;
            state.subject = 0;
        },
        setSubjects(state, val) {
            state.subjects = val;
        },
        setUsers(state, val) {
            state.users = val;
        },
        setQuizzes(state, val) {
            state.quizzes = val;
        },
        setQuizEntries(state, val) {
            state.quiz_entries = val;
        },
        setComments(state, val) {
            state.comments = val;
        },
        setSubject(state, val) {
            if (val || val == 0) state.subject = val;
        },
    },
    actions: {
        async logout() {
            router.push("Login");
        },

        async login({ dispatch, commit }, data) {
            // let { email, password } = data;
            // await Vue.axios
            //     .post("http://localhost/api/login.php", {
            //         email: email,
            //         password: password,
            //     })
            //     .then(response => {
            //         console.log(response.data);
            //         // commit("setUser", response.data);
            //     });
            router.push("Entries");
        },

        async fetchUser({ commit }) {},

        async fetchAll({ dispatch }) {
            dispatch("fetchEntries");
            dispatch("fetchSubjects");
            dispatch("fetchUsers");
            dispatch("fetchQuizzes");
            dispatch("fetchComments");
            mainEventBus.$emit("fetchedDb");
        },

        async fetchEntries({ commit }) {
            await Vue.axios
                .get("http://localhost/api/fetchEntries.php?tableName=entries")
                .then(async response => commit("setEntries", response.data))
                .catch(e => console.error(`Error fetching entries: ${e}`));
        },

        async fetchSubjects({ commit }) {
            await Vue.axios
                .get("http://localhost/api/fetchEntries.php?tableName=subjects")
                .then(async response => commit("setSubjects", response.data))
                .catch(e => console.error(`Error fetching subjects: ${e}`));
        },

        async fetchUsers({ commit }) {
            await Vue.axios
                .get("http://localhost/api/fetchEntries.php?tableName=users")
                .then(async response => commit("setUsers", response.data))
                .catch(e => console.error(`Error fetching users: ${e}`));
        },

        async fetchQuizzes({ commit }) {
            await Vue.axios
                .get("http://localhost/api/fetchEntries.php?tableName=quizzes")
                .then(async response => commit("setQuizzes", response.data))
                .catch(e => console.error(`Error fetching quizzes: ${e}`));
            await Vue.axios
                .get(
                    "http://localhost/api/fetchEntries.php?tableName=quiz_entries"
                )
                .then(async response => commit("setQuizEntries", response.data))
                .catch(e => console.error(`Error fetching quiz_entries: ${e}`));
        },

        async fetchComments({ commit }) {
            await Vue.axios
                .get("http://localhost/api/fetchEntries.php?tableName=comments")
                .then(async response => commit("setComments", response.data))
                .catch(e => console.error(`Error fetching comments: ${e}`));
        },

        async createEntry({ dispatch }, entry) {
            let { data, tableName } = entry;
            await Vue.axios
                .post(
                    "http://localhost/api/createEntry.php",
                    JSON.stringify({
                        entry: data,
                        tableName: tableName,
                    })
                )
                .then(() => dispatch("fetchAll"))
                .catch(e => console.error(`Error creating entry: ${e}`));
        },

        async deleteEntry({ dispatch }, entry) {
            let { id, tableName, columnName } = entry;
            await Vue.axios
                .post(
                    "http://localhost/api/deleteEntry.php",
                    JSON.stringify({
                        id: id,
                        tableName: tableName,
                        columnName: columnName,
                    })
                )
                .then(() => dispatch("fetchAll"))
                .catch(e => console.error(`Error deleting entry: ${e}`));
        },

        async updateEntry({ dispatch }, entry) {
            let { data, tableName, id } = entry;
            await Vue.axios
                .post(
                    "http://localhost/api/updateEntry.php",
                    JSON.stringify({
                        tableName: tableName,
                        entry: data,
                    })
                )
                .then(response => console.log(response.data))
                .catch(e => console.error(`Error deleting entry: ${e}`));
        },
    },
    modules: {},
});

export default store;
