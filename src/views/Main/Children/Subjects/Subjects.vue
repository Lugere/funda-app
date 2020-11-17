<template>
    <div id="subjects">
        <md-table
            @md-selected="onSelect"
            class="table"
            md-card
            md-fixed-header
            md-height="737px"
            md-sort-order="desc"
            md-sort="created_at"
            v-model="searched"
        >
            <md-table-toolbar class="toolbar">
                <div class="col-1">
                    <span class="title">Kategoriekatalog</span>
                    <md-button
                        @click="showNewSubject = true"
                        class="md-primary add-subject-btn md-raised"
                        >Kategorie hinzufügen</md-button
                    >
                </div>
                <div class="col-2">
                    <md-field md-clearable class="search">
                        <md-input
                            placeholder="Nach Kategorie suchen..."
                            v-model="search"
                            @input="searchOnTable()"
                        />
                    </md-field>
                </div>
            </md-table-toolbar>
            <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button" @click="deleteSubjects()">
                        <md-icon>delete</md-icon>
                    </md-button>
                </div>
            </md-table-toolbar>
            <md-table-empty-state
                md-label="Gähnende Leere"
                md-description="Keine Kategorien gefunden"
            >
                <md-button class="md-primary md-raised" @click="showNewSubject = true"
                    >kategorie hinzufügen</md-button
                >
            </md-table-empty-state>
            <!-- Subject Rows -->
            <md-table-row
                slot="md-table-row"
                class="row"
                md-sort-order="asc"
                md-sort="created_at"
                slot-scope="{ item }"
                md-selectable="multiple"
            >
                <!-- Title -->
                <md-table-cell md-sort-by="title" md-label="Titel">
                    {{ item.title }}
                </md-table-cell>
                <!-- Description -->
                <md-table-cell md-sort-by="description" md-label="Beschreibung">
                    {{ item.description | trimLength }}
                </md-table-cell>
                <!-- Entry Count -->
                <md-table-cell md-sort-by="entryCount" md-label="Anzahl Fragen">
                    <span class="entry-count" @click="showQuestions(item.subject_id)">
                        {{ `${getEntriesLength(item.subject_id)} Fragen` }}
                    </span>
                </md-table-cell>
                <!-- User -->
                <md-table-cell md-sort-by="user_id" md-label="Erstellt von">
                    <span class="role">
                        {{ getUserRoleLetter(item.user_id) }}
                        <md-tooltip md-delay="600">{{ getUserRole(item.user_id) }}</md-tooltip>
                    </span>
                    {{ getUser(item.user_id) }}
                </md-table-cell>
                <!-- Date -->
                <md-table-cell md-sort-by="created_at" md-label="Erstellt am">
                    {{ item.created_at | formatDate }}
                </md-table-cell>
            </md-table-row>
        </md-table>
        <md-dialog class="new-subject-dialog" :md-active.sync="showNewSubject">
            <md-dialog-title>Kategorie erstellen</md-dialog-title>
            <md-dialog-content>
                <form>
                    <md-field>
                        <label>Titel</label>
                        <md-input v-model="newSubject.title" />
                    </md-field>
                    <md-field>
                        <label>Beschreibung</label>
                        <md-textarea v-model="newSubject.description" />
                    </md-field>
                </form>
                <md-dialog-actions>
                    <md-button class="md-accent" @click="onAbortNewSubject()">Abbrechen</md-button>
                    <md-button class="md-primary md-raised" @click="onNewSubject()"
                        >Speichern</md-button
                    >
                </md-dialog-actions>
            </md-dialog-content>
        </md-dialog>
    </div>
</template>

<script src="./Subjects.ts" lang="ts"></script>

<style src="./Subjects.scss" lang="scss"></style>
