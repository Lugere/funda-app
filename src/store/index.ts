import Vue from "vue";
import Vuex, { Store } from "vuex";
import router from "../router";
import mainEventBus from "@/components/mainEventBus";
import { Message } from "element-ui";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        entries: [],
        subjects: [],
        users: [],
        comments: [],
        quizzes: [],
        quiz_entries: [],
        subject: 0,
        currentUser: [],
        isLoading: false,
        loadingSplash: "Wear you seatbelt",
    },
    mutations: {
        setUserProfile(state, val) {
            if (typeof val === "boolean") state.currentUser = [];
            else state.currentUser = val;
        },
        setEntries(state, val) {
            state.entries = val;
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
            if (val || val === 0) state.subject = val;
        },
        setLoadingSpinner(state, val) {
            const { isLoading, loadingSplash } = val;
            state.isLoading = isLoading;
            state.loadingSplash = loadingSplash;
        },
    },
    actions: {
        async logoutUser({ commit }) {
            const securityToken = localStorage.getItem("securityToken");
            await Vue.axios
                .post("http://localhost/funda-api/logoutUser.php", {
                    securityToken,
                })
                .then(response => {
                    const { msg } = response.data;
                    if (msg == "logout_success") {
                        commit("setUserProfile", {});
                        router.push("Login").catch(() => {});
                        Message.success("Erfolgreich abgemeldet");
                    } else {
                        Message.error("Fehler! Logout nicht erfolgreich");
                    }
                });
        },

        async loginUser({ commit }, data) {
            let { email, password, expiresIn } = data;
            await Vue.axios
                .post("http://localhost/funda-api/loginUser.php", {
                    email,
                    password,
                    expiresIn,
                })
                .then(response => {
                    const { msg, user, token } = response.data;
                    switch (msg) {
                        case "login_success":
                            commit("setUserProfile", user);
                            router.push("/").catch(() => {});
                            localStorage.setItem("securityToken", token);
                            Message.success("Login erfolgreich!");
                            break;
                        case "password_incorrect" || "user_not_found":
                            Message.error("Bitte E-Mail oder Password überprüfen");
                            break;
                        case "invalid_rowcount":
                            console.error(msg);
                            Message.error("Interner Fehler! Bitte später nochmal versuchen");
                            break;
                        default:
                            console.error(msg);
                            Message.error("Unbekannter Fehler! Bitte kontaktieren Sie einen Admin");
                            break;
                    }
                })
                .catch(e => {
                    console.error(e.message);
                    Message.error("Es konnte keine Verbindung zur Datenbank hergestellt werden");
                });
        },

        async checkAuthStatus({ commit }) {
            const securityToken = localStorage.getItem("securityToken");
            await Vue.axios
                .post("http://localhost/funda-api/checkAuth.php", {
                    securityToken,
                })
                .then(response => {
                    const { msg, user } = response.data;
                    if (msg == "user_logged_in") {
                        commit("setUserProfile", user);
                    } else {
                        commit("setUserProfile", {});
                        router.push("Login").catch(() => {});
                    }
                })
                .catch(e => console.error(`Error checking user authStatus: ${e.message}`));
        },

        async fetchUser({ commit }) {
            return this.state.currentUser;
        },

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
                .get("http://localhost/funda-api/fetchEntries.php?tableName=entries")
                .then(async response => commit("setEntries", response.data))
                .catch(e => console.error(`Error fetching entries: ${e}`));
        },

        async fetchSubjects({ commit }) {
            await Vue.axios
                .get("http://localhost/funda-api/fetchEntries.php?tableName=subjects")
                .then(async response => commit("setSubjects", response.data))
                .catch(e => console.error(`Error fetching subjects: ${e}`));
        },

        async fetchUsers({ commit }) {
            await Vue.axios
                .get("http://localhost/funda-api/fetchEntries.php?tableName=users")
                .then(async response => commit("setUsers", response.data))
                .catch(e => console.error(`Error fetching users: ${e}`));
        },

        async fetchQuizzes({ commit }) {
            await Vue.axios
                .get("http://localhost/funda-api/fetchEntries.php?tableName=quizzes")
                .then(async response => commit("setQuizzes", response.data))
                .catch(e => console.error(`Error fetching quizzes: ${e}`));
            await Vue.axios
                .get("http://localhost/funda-api/fetchEntries.php?tableName=quiz_entries")
                .then(async response => commit("setQuizEntries", response.data))
                .catch(e => console.error(`Error fetching quiz_entries: ${e}`));
        },

        async fetchComments({ commit }) {
            await Vue.axios
                .get("http://localhost/funda-api/fetchEntries.php?tableName=comments")
                .then(async response => commit("setComments", response.data))
                .catch(e => console.error(`Error fetching comments: ${e}`));
        },

        async createEntry({ dispatch }, entry) {
            let { data, tableName } = entry;
            await Vue.axios
                .post(
                    "http://localhost/funda-api/createEntry.php",
                    JSON.stringify({
                        entry: data,
                        tableName,
                    }),
                )
                .then(response => {
                    console.log(response.data);
                    dispatch("fetchAll");
                })
                .catch(e => console.error(`Error creating entry - ${tableName}: ${e}`));
        },

        async deleteEntry({ dispatch }, entry) {
            let { id, tableName, columnName } = entry;
            await Vue.axios
                .post(
                    "http://localhost/funda-api/deleteEntry.php",
                    JSON.stringify({
                        id,
                        tableName,
                        columnName,
                    }),
                )
                .then(() => dispatch("fetchAll"))
                .catch(e => console.error(`Error deleting entry: ${e}`));
        },

        async updateEntry({ dispatch }, entry) {
            let { data, tableName, id } = entry;
            await Vue.axios
                .post(
                    "http://localhost/funda-api/updateEntry.php",
                    JSON.stringify({
                        id,
                        tableName,
                        entry: data,
                    }),
                )
                .then(() => dispatch("fetchAll"))
                .catch(e => console.error(`Error deleting entry: ${e}`));
        },

        updateLoadingSpinner({ commit }, loadingData) {
            commit("setLoadingSpinner", loadingData);
        },
    },
    modules: {},
});

export default store;
