import Vue from "vue";
import Vuex, { Store } from "vuex";
import router from "../router";
import axios from "axios";
import Login from "@/views/Login/Login";

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
    }),
    mutations: {
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
            console.log(val);
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

        async login() {
            router.push("/");
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
                .get("http://localhost/api/fetchEntries.php?tableName=quiz_entries")
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
            await Vue.axios
                .post(
                    "http://localhost/api/createEntry.php",
                    JSON.stringify({
                        entry: entry,
                        tableName: "entries",
                    })
                )
                .then(() => {
                    dispatch("fetchEntries");
                })
                .catch(e => console.error(`Error creating entry: ${e}`));
        },

        async deleteEntry({ dispatch }, entry_id) {
            await Vue.axios
                .post(
                    "http://localhost/api/deleteEntry.php",
                    JSON.stringify({
                        tableName: "entries",
                        column: "entry_id",
                        id: entry_id,
                    })
                )
                .then(response => {
                    dispatch("fetchEntries");
                    console.log(response.data);
                })
                .catch(e => console.error(`Error deleting entry: ${e}`));
        },

        async createSubject({ dispatch, commit }, subject) {
            await Vue.axios
                .post(
                    "http://localhost/api/createEntry.php",
                    JSON.stringify({
                        entry: subject,
                        tableName: "subjects",
                    })
                )
                .then(() => {
                    dispatch("fetchSubjects");
                })
                .catch(e => console.error(`Error creating entry: ${e}`));
        },

        async createComment({ dispatch, commit }, comment) {
            await Vue.axios
                .post(
                    "http://localhost/api/createEntry.php",
                    JSON.stringify({
                        entry: comment,
                        tableName: "comments",
                    })
                )
                .then(response => {
                    console.log(response.data);
                    dispatch("fetchSubjects");
                })
                .catch(e => console.error(`Error creating entry: ${e}`));
        },
    },
    modules: {},
});

export default store;
