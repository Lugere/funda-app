<template>
    <div id="main">
        <div class="footer md-elevation-3">
            <div class="bar bar-rich-black" />
            <div class="bar bar-flame" />
            <div class="bar bar-blue-green" />
            <div class="bar bar-sky-blue" />
            <div class="bar bar-azure-x" />
            <div class="bar bar-android-green" />
        </div>
        <nav class="navigation">
            <div class="logo">
                <img src="@/assets/img/logo.png" />
            </div>
            <ul class="list">
                <div
                    class="item"
                    :class="{ active: checkRoute('/Home') }"
                    @click="changeRoute('/Home')"
                >
                    <md-icon class="icon">home</md-icon>
                    <span class="name">Home</span>
                </div>
                <div
                    class="item"
                    :class="{ active: checkRoute('/Entries') }"
                    @click="changeRoute('/Entries')"
                >
                    <md-icon class="icon">help</md-icon>
                    <span class="name">Fragen</span>
                </div>
                <div
                    class="item"
                    :class="{ active: checkRoute('/Subjects') }"
                    @click="changeRoute('/Subjects')"
                >
                    <md-icon class="icon">category</md-icon>
                    <span class="name">Kategorien</span>
                </div>
                <div
                    class="item"
                    :class="{ active: checkRoute('/Quizzes') }"
                    @click="changeRoute('/Quizzes')"
                >
                    <md-icon class="icon">question_answer</md-icon>
                    <span class="name">Quizzes</span>
                </div>
                <div
                    class="item"
                    :class="{ active: checkRoute('/Statistics') }"
                    @click="changeRoute('/Statistics')"
                >
                    <md-icon class="icon">analytics</md-icon>
                    <span class="name">Auswertung</span>
                </div>
                <div class="item last" @click="$router.replace('Login')">
                    <md-icon class="icon">exit_to_app</md-icon>
                    <span class="name">Abmelden</span>
                </div>
            </ul>
        </nav>
        <div class="main-view">
            <div class="function">
                <div class="col col-1">
                    <span class="funda">Funda</span>
                    <div class="breadcrumbs">
                        <span class="crumb">Home</span> /
                        <span class="crumb">Computerkomponenten</span> /
                        <span class="current-crumb crumb">Wie ist ein CPU aufgebaut?</span>
                    </div>
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
                    <span class="welcome">Hallo Max M.</span>
                </div>
            </div>
            <router-view class="router-view" />
        </div>
    </div>
</template>

<script src="./Main.ts" lang="ts"></script>

<style src="./Main.scss" lang="scss"></style>
