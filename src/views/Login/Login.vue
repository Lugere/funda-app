<template>
    <div id="login">
        <md-card class="card login-card" v-if="!showLogin">
            <md-card-header class="card-header">
                <div class="card-title">Anmelden</div>
            </md-card-header>
            <md-card-content class="card-content">
                <form>
                    <md-field>
                        <label>E-Mail</label>
                        <md-input autofocus v-model="form.email" type="email" />
                    </md-field>
                    <md-field>
                        <label>Passwort</label>
                        <md-input v-model="form.password" type="password" />
                    </md-field>
                    <a href="#" class="forgot-pass">Passwort vergessen?</a>
                </form>
                <md-checkbox v-model="rememberMe">E-Mail merken</md-checkbox>
                <md-checkbox v-model="remainLoggedIn">Angemeldet bleiben</md-checkbox>
            </md-card-content>
            <md-card-actions class="card-actions">
                <md-button class="md-primary md-raised login-btn" to="Home">
                    Anmelden
                </md-button>
            </md-card-actions>
        </md-card>

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
