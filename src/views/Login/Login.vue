<template>
    <div id="login">
        <div class="login-card-container">
            <md-card class="card login-card">
                <md-card-header class="card-header">
                    <div class="card-title">Anmelden</div>
                </md-card-header>
                <md-card-content class="card-content">
                    <form @keyup.enter.prevent="login()">
                        <md-field>
                            <label>E-Mail</label>
                            <md-input autofocus v-model="form.email" type="email" />
                        </md-field>
                        <md-field>
                            <label>Passwort</label>
                            <md-input v-model="form.password" type="password" />
                        </md-field>
                    </form>
                    <md-checkbox v-model="rememberMe" class="remember-me">E-Mail merken</md-checkbox>
                    <md-checkbox v-model="remainLoggedIn">
                        Angemeldet bleiben
                        <span class="md-caption">(14 Tage aktiv)</span>
                    </md-checkbox>
                </md-card-content>
                <md-card-actions class="card-actions">
                    <md-button class="md-primary md-raised login-btn" @click="login()">
                        Anmelden
                    </md-button>
                    <a href="#" class="forgot-pass">Passwort vergessen?</a>
                </md-card-actions>
            </md-card>
        </div>
        <div class="funda-container">
            <span class="funda">funda</span>
            <span class="answer-container">
                <span class="answer">? !</span>
            </span>
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

<script src="./Login.ts" lang="ts"></script>

<style src="./Login.scss" lang="scss"></style>
