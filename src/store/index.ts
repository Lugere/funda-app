import Vue from "vue";
import Vuex, { Store } from "vuex";
import router from "../router";
import axios from "axios";
import Login from "@/views/Login/Login";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        entries: [
            {
                entry_id: 1,
                user_id: 1,
                subject_id: 1,
                question: "Was ist ein BIOS?",
                hint: "Grundsystem des PC's",
                answer:
                    "Basic Input/Output System - Das ursprüngliche PC-BIOS erschien 1981 mit dem ersten IBM-PC. Die Abkürzung BIOS steht für Basic Input Output System, zu Deutsch grundlegendes Ein- und Ausgabesystem. Die eigentliche Aufgabe des BIOS ist es, den PC in einen betriebsbereiten Zustand zu versetzen. Dazu bringt es den Computer in einen festgelegten Anfangszustand, prüft mit dem Power-On Self Test die Funktionstüchtigkeit und übergibt dann die Kontrolle über den PC an das Betriebssystem oder ein bootfähiges Medium.",
                created_at: 1605363726,
            },
            {
                entry_id: 2,
                user_id: 3,
                subject_id: 1,
                question: "Wie greife ich auf das BIOS zu?",
                hint: "Wird beim Start angezeigt",
                answer:
                    "Es gibt verschiedene Möglichkeiten. Beim starten des Computers wird meist auf dem ersten Bildschirm angezeigt wie man ins BIOS gelangt z.B. F2, F12, ENTF oder ESC.",
                created_at: 1605453735,
            },
            {
                entry_id: 3,
                user_id: 2,
                subject_id: 2,
                question: "Wofür steht CPU?",
                hint: "Central...",
                answer: "Central Processing Unit",
                created_at: 1505360896,
            },
            {
                entry_id: 4,
                user_id: 2,
                subject_id: 3,
                question: "Welche Arten von Festplatten gibt es?",
                hint: "Magnet, Transistor, Band",
                answer: "HDD, SSD, Diskette, Magnetband",
                created_at: 1605454152,
            },
        ],
        subjects: [
            {
                subject_id: 1,
                user_id: 1,
                title: "BIOS & UEFI",
                description: "",
                created_at: 1605453735,
            },
            {
                subject_id: 2,
                user_id: 1,
                title: "CPU",
                description: "",
                created_at: 1505360896,
            },
            {
                subject_id: 3,
                user_id: 1,
                title: "Festplatten",
                description: "",
                created_at: 1605454152,
            },
        ],
        users: [
            {
                user_id: 1,
                first_name: "Arno",
                last_name: "Reitz",
                email: "arno.reitz@bbs-montabaur.de",
                role: "admin",
                username: "arnor",
            },
            {
                user_id: 2,
                first_name: "Steffen",
                last_name: "Lippert",
                email: "steffen.lipper@staw.de",
                role: "teacher",
                username: "steffl",
            },
            {
                user_id: 3,
                first_name: "Robin",
                last_name: "Leber",
                email: "robinl.bsfi19@bbs-montabaur.de",
                role: "student",
                username: "robinl",
            },
        ],
        comments: [
            {
                comment_id: 1,
                user_id: 1,
                content: "Wirklich gut formuliert mit einer sehr ausführlichen Antwort",
                created_at: 1605464772,
                entry_id: 1,
            },
            {
                comment_id: 2,
                user_id: 3,
                content: "fand ich in meinem quiz sehr hilfreich",
                created_at: 1605464772,
                entry_id: 1,
            },
            {
                comment_id: 3,
                user_id: 3,
                content: "wirklich schön formuliert! fand ich in meinem quiz sehr hilfreich",
                created_at: 1605464772,
                entry_id: 1,
            },
        ],
        quizzes: [
            {
                quiz_id: 1,
                user_id: 3,
                title: "BIOS Quiz",
                description:
                    "Alles rund um das Thema BIOS und UEFI. Perfekte Vorbereitung für die Arbeit in LF0 am 31.02.2021",
                created_at: 1605532272,
            },
            {
                quiz_id: 2,
                user_id: 2,
                title: "CPU und GPU",
                description: "Kleine Zusammenfassung zu unserem letzten Thema",
                created_at: 1605532272,
            },
        ],
        quiz_entries: [
            {
                quiz_entry_id: 1,
                quiz_id: 1,
                entry_id: 2,
            },
            {
                quiz_entry_id: 2,
                quiz_id: 1,
                entry_id: 1,
            },
            {
                quiz_entry_id: 2,
                quiz_id: 2,
                entry_id: 1,
            },
            {
                quiz_entry_id: 3,
                quiz_id: 2,
                entry_id: 4,
            },
            {
                quiz_entry_id: 4,
                quiz_id: 2,
                entry_id: 3,
            },
        ],
        subject: 0,
    },
    mutations: {
        setEntries(state, val) {
            state.entries = val;
            state.subject = 0;
            console.log("fetchEntries");
            console.log(state.entries);
        },
        setSubjects(state, val) {
            state.subjects = val;
            state.subject = 0;
            console.log("fetchSubjects");
            console.log(state.subjects);
        },
        pushEntry(state, val) {
            if (val) state.entries.push(Object.assign({}, val));
        },
        pushSubject(state, val) {
            if (val) state.subjects.push(Object.assign({}, val));
        },
        pushComment(state, val) {
            if (val) state.comments.push(Object.assign({}, val));
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
            Vue.axios
                .get("http://localhost/api/fetchEntries.php?tableName=entries")
                .then(async response => commit("setEntries", response.data))
                .catch(e => console.error(`Error fetching tables: ${e}`));
            Vue.axios
                .get("http://localhost/api/fetchEntries.php?tableName=subjects")
                .then(async response => commit("setEntries", response.data))
                .catch(e => console.error(`Error fetching tables: ${e}`));
        },

        async createEntry({ dispatch, commit }, entry) {
            commit("pushEntry", entry);
        },
        async createSubject({ dispatch, commit }, subject) {
            commit("pushSubject", subject);
        },
        async createComment({ dispatch, commit }, comment) {
            commit("pushComment", comment);
        },
    },
    modules: {},
});

export default store;
