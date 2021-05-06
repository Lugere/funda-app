<template>
    <div id="users">
        <!-- Users Table -->
        <md-table
            @md-selected="onSelect"
            class="table"
            md-card
            md-fixed-header
            md-height="737px"
            md-sort="created_at"
            v-model="searched"
            md-sort-order="desc"
        >
            <md-table-toolbar class="toolbar">
                <div class="col-1">
                    <span class="title">Benutzerliste</span>
                    <md-button @click="showNewUser = true" class="md-primary add-user-btn md-raised"
                        >benutzer hinzufügen</md-button
                    >
                </div>
                <div class="col-2">
                    <md-field md-clearable class="search">
                        <md-input
                            placeholder="Nach Benutzer suchen..."
                            v-model="search"
                            @input="searchOnTable()"
                        />
                    </md-field>
                </div>
            </md-table-toolbar>
            <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                <div class="md-toolbar-section-start">
                    {{ getAlternateLabel(count) }}
                </div>

                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button" @click="deleteUsers()">
                        <md-icon>delete</md-icon>
                    </md-button>
                </div>
            </md-table-toolbar>
            <md-table-empty-state
                md-label="Gähnende Leere"
                md-description="Keine Benutzer gefunden"
            >
                <md-button class="md-primary md-raised" @click="onShowNewUser()"
                    >benutzer hinzufügen</md-button
                >
            </md-table-empty-state>
            <!-- User Rows -->
            <md-table-row
                class="row"
                @click="onShowUser(item.userId)"
                slot="md-table-row"
                slot-scope="{ item }"
                md-selectable="multiple"
            >
                <!-- User -->
                <md-table-cell md-sort-by="user" md-label="Benutzername">
                    {{ item.username }}
                </md-table-cell>
                <md-table-cell md-sort-by="first_name" md-label="Vorname">
                    {{ item.first_name }}
                </md-table-cell>
                <md-table-cell md-sort-by="last_name" md-label="Nachname">
                    {{ item.last_name }}
                </md-table-cell>
                <md-table-cell md-sort-by="email" md-label="E-Mail">
                    {{ item.email }}
                </md-table-cell>
                <md-table-cell md-sort-by="role" md-label="Rolle">
                    {{ getUserRole(item.user_id) }}
                </md-table-cell>
                <md-table-cell md-sort-by="created_at" md-label="Erstellt am">
                    {{ item.created_at | formatDate }}
                </md-table-cell>
            </md-table-row>
        </md-table>
        <!-- Add new User Dialog -->
        <md-dialog class="new-user-dialog" :md-active.sync="showNewUser">
            <md-dialog-title>Benutzer erstellen</md-dialog-title>
            <md-dialog-content>
                <form>
                    <md-field>
                        <label>Vorname</label>
                        <md-input v-model="newUser.first_name" />
                    </md-field>
                    <md-field>
                        <label>Nachname</label>
                        <md-input v-model="newUser.last_name" />
                    </md-field>
                    <md-field>
                        <label>Benutzername</label>
                        <md-input :value="username" disabled />
                    </md-field>
                    <md-field>
                        <label>E-Mail</label>
                        <md-input v-model="newUser.email" />
                    </md-field>
                    <div class="generate-pass-wrapper">
                        <md-field md-clearable>
                            <label>Passwort</label>
                            <md-input v-model="newUser.password" />
                        </md-field>
                        <md-button
                            class="md-success md-raised generate-pass-button"
                            @click="onGeneratePassword()"
                        >
                            Generieren
                        </md-button>
                    </div>
                    <md-field>
                        <label>Rolle</label>
                        <md-select v-model="newUser.role">
                            <md-option value="admin">Administrator</md-option>
                            <md-option value="teacher">Lehrer</md-option>
                            <md-option value="student">Schüler</md-option>
                        </md-select>
                    </md-field>
                    <md-field v-if="newUser.role === 2">
                        <label>Klasse</label>
                        <md-select size="auto" v-model="classs">
                            <md-option value="bsfi18">
                                BSFI18
                            </md-option>
                            <md-option value="bsfi19">
                                BSFI19
                            </md-option>
                            <md-option value="bsfi20">
                                BSFI20
                            </md-option>
                        </md-select>
                    </md-field>
                </form>
                <md-dialog-actions>
                    <md-button class="md-accent" @click="onAbortNewUser()">Abbrechen</md-button>
                    <md-button class="md-primary md-raised" @click="onCreateNewUser()"
                        >Speichern</md-button
                    >
                </md-dialog-actions>
            </md-dialog-content>
        </md-dialog>
    </div>
</template>

<script src="./Users.ts" lang="ts"></script>

<style src="./Users.scss" lang="scss"></style>
