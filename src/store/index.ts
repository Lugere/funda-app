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
                entryId: 1,
                userId: 1,
                subjectId: 1,
                question: "Was ist ein BIOS?",
                hint: "Grundsystem des PC's",
                answer:
                    "Basic Input/Output System - Das ursprüngliche PC-BIOS erschien 1981 mit dem ersten IBM-PC. Die Abkürzung BIOS steht für Basic Input Output System, zu Deutsch grundlegendes Ein- und Ausgabesystem. Die eigentliche Aufgabe des BIOS ist es, den PC in einen betriebsbereiten Zustand zu versetzen. Dazu bringt es den Computer in einen festgelegten Anfangszustand, prüft mit dem Power-On Self Test die Funktionstüchtigkeit und übergibt dann die Kontrolle über den PC an das Betriebssystem oder ein bootfähiges Medium.",
                createdAt: 1605363726,
            },
            {
                entryId: 2,
                userId: 3,
                subjectId: 1,
                question: "Wie greife ich auf das BIOS zu?",
                hint: "Wird beim Start angezeigt",
                answer:
                    "Es gibt verschiedene Möglichkeiten. Beim starten des Computers wird meist auf dem ersten Bildschirm angezeigt wie man ins BIOS gelangt z.B. F2, F12, ENTF oder ESC.",
                createdAt: 1605453735,
            },
            {
                entryId: 3,
                userId: 2,
                subjectId: 2,
                question: "Wofür steht CPU?",
                hint: "Central...",
                answer: "Central Processing Unit",
                createdAt: 1505360896,
            },
            {
                entryId: 4,
                userId: 2,
                subjectId: 3,
                question: "Welche Arten von Festplatten gibt es?",
                hint: "Magnet, Transistor, Band",
                answer: "HDD, SSD, Diskette, Magnetband",
                createdAt: 1605454152,
            },
        ],
        subjects: [
            {
                subjectId: 1,
                userId: 1,
                title: "BIOS & UEFI",
                description: "",
                createdAt: 1605453735,
            },
            {
                subjectId: 2,
                userId: 1,
                title: "CPU",
                description: "",
                createdAt: 1505360896,
            },
            {
                subjectId: 3,
                userId: 1,
                title: "Festplatten",
                description: "",
                createdAt: 1605454152,
            },
        ],
        users: [
            {
                userId: 1,
                firstName: "Arno",
                lastName: "Reitz",
                email: "arno.reitz@bbs-montabaur.de",
                role: "admin",
                username: "arnor",
            },
            {
                userId: 2,
                firstName: "Steffen",
                lastName: "Lippert",
                email: "steffen.lipper@staw.de",
                role: "teacher",
                username: "steffl",
            },
            {
                userId: 3,
                firstName: "Robin",
                lastName: "Leber",
                email: "robinl.bsfi19@bbs-montabaur.de",
                role: "student",
                username: "robinl",
            },
        ],
        comments: [
            {
                commentId: 1,
                userId: 1,
                content: "Wirklich gut formuliert mit einer sehr ausführlichen Antwort",
                createdAt: 1605464772,
                entryId: 1,
            },
            {
                commentId: 2,
                userId: 3,
                content: "fand ich in meinem quiz sehr hilfreich",
                createdAt: 1605464772,
                entryId: 1,
            },
            {
                commentId: 3,
                userId: 3,
                content: "wirklich schön formuliert! fand ich in meinem quiz sehr hilfreich",
                createdAt: 1605464772,
                entryId: 1,
            },
        ],
        quizzes: [
            {
                quizId: 1,
                userId: 3,
                title: "BIOS Quiz",
                description:
                    "Alles rund um das Thema BIOS und UEFI. Perfekte Vorbereitung für die Arbeit in LF0 am 31.02.2021",
                createdAt: 1605532272,
            },
            {
                quizId: 2,
                userId: 2,
                title: "CPU und GPU",
                description: "Kleine Zusammenfassung zu unserem letzten Thema",
                createdAt: 1605532272,
            },
        ],
        quiz_entries: [
            {
                quizEntryId: 1,
                quizId: 1,
                entryId: 2,
            },
            {
                quizEntryId: 2,
                quizId: 1,
                entryId: 1,
            },
            {
                quizEntry_id: 2,
                quizId: 2,
                entryId: 1,
            },
            {
                quizEntry_id: 3,
                quizId: 2,
                entryId: 4,
            },
            {
                quizEntry_id: 4,
                quizId: 2,
                entryId: 3,
            },
        ],
        subject: 0,
    },
    mutations: {
        setState(state, val) {
            state = val;
            state.subject = 0;
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
            await Vue.axios
                .post("http://localhost/funda/fetchEntries.php")
                .then(async response => commit("setState", response.data))
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
