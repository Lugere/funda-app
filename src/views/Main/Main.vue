<template>
    <div id="main">
        <nav class="navigation">
            <div class="logo">
                <img src="@/assets/img/logo.png" />
            </div>
            <ul class="list">
                <div
                    class="item md-body-2"
                    :class="{ active: checkRoute('/Entries') }"
                    @click="changeRoute('/Entries')"
                >
                    <md-icon class="icon">help</md-icon>
                    <span class="name">Fragen</span>
                </div>
                <div
                    class="item md-body-2"
                    :class="{ active: checkRoute('/Subjects') }"
                    @click="changeRoute('/Subjects')"
                >
                    <md-icon class="icon">category</md-icon>
                    <span class="name">Kategorien</span>
                </div>
                <div
                    class="item md-body-2"
                    :class="{ active: checkRoute('/Quizzes') }"
                    @click="changeRoute('/Quizzes')"
                >
                    <md-icon class="icon">question_answer</md-icon>
                    <span class="name">Lernquiz</span>
                </div>
                <div
                    v-if="isAdmin"
                    class="item md-body-2"
                    :class="{ active: checkRoute('/Users') }"
                    @click="changeRoute('/Users')"
                >
                    <md-icon class="icon">person</md-icon>
                    <span class="name">Benutzer</span>
                </div>
                <!-- <div
                    class="item md-body-2"
                    :class="{ active: checkRoute('/Statistics') }"
                    @click="changeRoute('/Statistics')"
                >
                    <md-icon class="icon">analytics</md-icon>
                    <span class="name">Auswertung</span>
                </div> -->
                <div class="item md-body-2 last" @click="logout()">
                    <md-icon class="icon">exit_to_app</md-icon>
                    <span class="name">Abmelden</span>
                </div>
            </ul>
        </nav>
        <div class="main-view">
            <div class="function">
                <div class="col col-1">
                    <span class="funda">Funda</span>
                    <span class="md-body-2 funda-sub">
                        Fragen und Antworten | {{ getRouteString() }}
                    </span>
                </div>
                <div class="col col-2">
                    <div class="timestamp">
                        <span class="date">
                            {{ date }}
                        </span>
                        <span class="time">
                            {{ time }}
                        </span>
                    </div>
                    <span class="welcome">
                        Hallo {{ `${currentUser.first_name} ${currentUser.last_name}` }}
                    </span>
                    <div class="user-role" :title="getUserRole(currentUser.user_id)">{{ getUserRoleLetter(currentUser.user_id) }}</div>
                </div>
            </div>
            <router-view class="router-view" />
        </div>
        <div class="footer md-elevation-3">
            <div class="bar bar-rich-black" />
            <div class="bar bar-flame" />
            <div class="bar bar-blue-green" />
            <div class="bar bar-sky-blue" />
            <div class="bar bar-azure-x" />
            <div class="bar bar-android-green" />
        </div>
    </div>
</template>

<script src="./Main.ts" lang="ts"></script>

<style src="./Main.scss" lang="scss"></style>
