<template>
    <div id="entries">
        <!-- Entries Table -->
        <md-table
            @md-selected="onSelect"
            class="table"
            md-card
            md-fixed-header
            md-height="737px"
            md-sort="createdAt"
            v-model="searched"
        >
            <md-table-toolbar class="toolbar">
                <div class="col-1">
                    <span class="title">Fragenkatalog</span>
                    <md-field class="subject-select">
                        <md-select
                            @md-selected="searchOnTable()"
                            v-model="currentSubject"
                            placeholder="Thema auswählen"
                        >
                            <md-option :value="0">Alle Kategorien</md-option>
                            <md-option
                                :value="option.subjectId"
                                v-for="(option, index) in subjects"
                                :key="index"
                            >
                                {{ option.title }}
                            </md-option>
                        </md-select>
                    </md-field>
                    <md-button
                        @click="showNewEntry = true"
                        class="md-primary add-entry-btn md-raised"
                        >frage hinzufügen</md-button
                    >
                </div>
                <div class="col-2">
                    <md-field md-clearable class="search">
                        <md-input
                            placeholder="Nach Frage suchen..."
                            v-model="search"
                            @input="searchOnTable()"
                        />
                    </md-field>
                </div>
            </md-table-toolbar>
            <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button" @click="deleteEntries()">
                        <md-icon>delete</md-icon>
                    </md-button>
                </div>
            </md-table-toolbar>
            <md-table-empty-state md-label="Gähnende Leere" md-description="Keine Fragen gefunden">
                <md-button class="md-primary md-raised" @click="showNewEntry = true"
                    >frage hinzufügen</md-button
                >
            </md-table-empty-state>
            <!-- Entry Rows -->
            <md-table-row
                class="row"
                @click="onShowEntry(item.entryId)"
                slot="md-table-row"
                slot-scope="{ item }"
                md-selectable="multiple"
            >
                <!-- Question -->
                <md-table-cell md-sort-by="question" md-label="Frage">
                    {{ item.question }}
                </md-table-cell>
                <!-- Answer -->
                <md-table-cell
                    md-sort-by="answer"
                    md-label="Antwort"
                    :title="item.answer.length >= 60 ? item.answer : ''"
                >
                    {{ item.answer | trimLength }}
                </md-table-cell>
                <!-- Subject -->
                <md-table-cell md-sort-by="subjectId" md-label="Kategorie">
                    {{ getSubject(item.subjectId) | trimLength }}
                </md-table-cell>
                <!-- User -->
                <md-table-cell md-sort-by="userId" md-label="Erstellt von">
                    <span class="role">
                        {{ getUserRoleLetter(item.userId) }}
                        <md-tooltip md-delay="600">{{ getUserRole(item.userId) }}</md-tooltip>
                    </span>
                    {{ getUser(item.userId) }}
                </md-table-cell>
                <!-- Date -->
                <md-table-cell md-sort-by="createdAt" md-label="Erstellt am">
                    {{ item.createdAt | formatDate }}
                </md-table-cell>
            </md-table-row>
        </md-table>
        <!-- Add new Entry Dialog -->
        <md-dialog class="new-entry-dialog" :md-active.sync="showNewEntry">
            <md-dialog-title>Frage erstellen</md-dialog-title>
            <md-dialog-content>
                <form>
                    <md-field>
                        <label>Frage</label>
                        <md-input v-model="newEntry.question" />
                    </md-field>
                    <md-field>
                        <label>Antwort</label>
                        <md-textarea v-model="newEntry.answer" />
                    </md-field>
                    <md-field>
                        <label>Kategorie</label>
                        <md-select v-model="newEntry.subjectId">
                            <md-option
                                :value="option.subjectId"
                                v-for="(option, index) in subjects"
                                :key="index"
                            >
                                {{ option.title }}
                            </md-option>
                        </md-select>
                    </md-field>
                    <md-field>
                        <label>Hinweis</label>
                        <md-input v-model="newEntry.hint" />
                    </md-field>
                </form>
                <md-dialog-actions>
                    <md-button class="md-accent" @click="onAbortNewEntry()">Abbrechen</md-button>
                    <md-button class="md-primary md-raised" @click="onNewEntry()"
                        >Speichern</md-button
                    >
                </md-dialog-actions>
            </md-dialog-content>
        </md-dialog>
        <!-- Show Entry Dialog -->
        <md-dialog class="entry-dialog" :md-active.sync="showEntry">
            <md-dialog-title class="title">{{ shownEntry.question }}</md-dialog-title>
            <span class="subtitle">
                <span class="md-caption">
                    erstellt von
                </span>
                <span class="md-body-2">{{ getUser(shownEntry.userId) }}</span>
                <span> • </span>
                <span class="md-body-2">{{ shownEntry.createdAt | formatDate }}</span>
            </span>
            <md-dialog-content style="max-width: 600px;">
                <div class="field">
                    <md-content class="md-scrollbar" style="max-height: 200px;">
                        <span class="md-caption">Antwort</span>
                        <p class="md-body-2">{{ shownEntry.answer }}</p>
                    </md-content>
                </div>
                <br />
                <div class="field">
                    <span class="md-caption">Kategorie</span>
                    <p class="md-body-2">{{ getSubject(shownEntry.subjectId) }}</p>
                </div>
                <br />
                <div class="field">
                    <span class="md-caption">Antworthinweis</span>
                    <p class="md-body-2">{{ shownEntry.hint }}</p>
                </div>
            </md-dialog-content>
            <md-divider class="md-inset" />
            <md-dialog-title style="margin-bottom: 0;">{{ commentsCount }}</md-dialog-title>
            <md-dialog-content>
                <div class="comment-section">
                    <div class="create-comment">
                        <md-field style="margin-bottom: 0;">
                            <md-input
                                @focus="showComment = true"
                                placeholder="Frage kommentieren..."
                                v-model="newComment.content"
                                md-counter="128"
                                :maxlength="128"
                            />
                        </md-field>
                        <div v-if="showComment" class="button-group">
                            <md-button
                                class="md-primary md-raised"
                                @click="onCreateNewComment()"
                                :disabled="newComment.content == ''"
                            >
                                Kommentieren
                            </md-button>
                            <md-button class="md-accent" @click="onAbortNewComment()"
                                >Abbrechen</md-button
                            >
                        </div>
                    </div>
                    <md-list class="comments">
                        <md-content class="md-scrollbar">
                            <md-list-item v-for="comment in entryComments" :key="comment.commentId">
                                <div class="comment">
                                    <div class="top-line">
                                        <span class="md-body-2 username">{{
                                            getUser(comment.userId)
                                        }}</span>
                                        <span class="md-caption date">{{
                                            comment.createdAt | formatCommentDate
                                        }}</span>
                                    </div>
                                    <p
                                        class="md-body-1 content"
                                        style="display: flex; flex-flow: row wrap; max-width: 250px;"
                                    >
                                        {{ comment.content }}
                                    </p>
                                </div>
                                <md-button
                                    v-if="comment.userId == 3"
                                    class="md-icon-button md-accent"
                                    @click="onDeleteComment(comment.commentId)"
                                >
                                    <md-icon>delete</md-icon>
                                </md-button>
                            </md-list-item>
                        </md-content>
                    </md-list>
                </div>
            </md-dialog-content>
        </md-dialog>
    </div>
</template>

<script src="./Entries.ts" lang="ts"></script>

<style src="./Entries.scss" lang="scss"></style>