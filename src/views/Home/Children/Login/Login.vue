<template>
    <div id="login">
        <div class="md-layout row">
            <div class="md-layout-item col-1"></div>
            <div class="md-layout-item col-2">
                <md-card class="card login-card" v-if="!showLogin">
                    <md-card-header class="card-header">
                        <div class="card-title">Anmelden</div>
                    </md-card-header>
                    <md-card-content class="card-content">
                        <form>
                            <md-field>
                                <label>E-Mail</label>
                                <md-input
                                    autofocus
                                    v-model="form.email"
                                    type="email"
                                />
                            </md-field>
                            <md-field>
                                <label>Passwort</label>
                                <md-input
                                    v-model="form.password"
                                    type="password"
                                />
                            </md-field>
                            <a href="#" class="forgot-pass"
                                >Passwort vergessen?</a
                            >
                        </form>
                        <md-checkbox v-model="rememberMe"
                            >E-Mail merken</md-checkbox
                        >
                        <md-checkbox v-model="remainLoggedIn"
                            >Angemeldet bleiben</md-checkbox
                        >
                    </md-card-content>
                    <md-card-actions class="card-actions">
                        <md-button class="md-primary md-raised login-btn">
                            Anmelden
                        </md-button>
                        <div class="create-account">
                            Noch kein Konto?<br />
                            <a @click="toggleLogin()">Hier registrieren</a>
                        </div>
                    </md-card-actions>
                </md-card>
                <md-card class="card sign-up-card" v-else>
                    <md-card-header class="card-header">
                        <div class="card-title">Registrieren</div>
                    </md-card-header>
                    <md-card-content class="card-content">
                        <form>
                            <md-field>
                                <label>Name</label>
                                <md-input
                                    autofocus
                                    v-model="form.email"
                                    type="email"
                                />
                            </md-field>
                            <md-field>
                                <label>E-Mail</label>
                                <md-input
                                    autofocus
                                    v-model="form.email"
                                    type="email"
                                />
                            </md-field>
                            <md-field>
                                <label>Passwort</label>
                                <md-input
                                    v-model="form.password"
                                    type="password"
                                />
                            </md-field>
                            <md-field>
                                <label>Passwort wiederholen</label>
                                <md-input
                                    v-model="form.password"
                                    type="password"
                                />
                            </md-field>
                        </form>
                    </md-card-content>
                    <md-card-actions class="card-actions">
                        <md-button class="md-primary md-raised login-btn">
                            Registrieren
                        </md-button>
                        <div class="create-account">
                            Du hast schon ein Konto?<br />
                            <a @click="toggleLogin()">Zurück zum Login</a>
                        </div>
                    </md-card-actions>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script src="./Login.ts" lang="ts"></script>

<style src="./Login.scss" lang="scss"></style>
