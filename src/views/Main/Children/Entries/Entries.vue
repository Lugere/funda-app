<template>
    <div id="entries">
        <!-- Entries Table -->
        <md-table
            @md-selected="onSelect"
            class="table"
            md-card
            md-fixed-header
            md-sort-order="desc"
            md-height="737px"
            md-sort="created_at"
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
                                :value="option.subject_id"
                                v-for="(option, index) in subjects"
                                :key="index"
                            >
                                {{ option.title }}
                            </md-option>
                        </md-select>
                    </md-field>
                    <md-button @click="onShowNewEntry()" class="md-primary add-entry-btn md-raised"
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
                <div class="md-toolbar-section-start">
                    {{ getAlternateLabel(count) }}

                    <a class="unselect-all-button" @click="onClearSelection()">Alle abwählen</a>
                </div>
                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button" @click="onDeleteEntries()">
                        <md-icon>delete</md-icon>
                    </md-button>
                </div>
            </md-table-toolbar>
            <md-table-empty-state md-label="Gähnende Leere" md-description="Keine Fragen gefunden">
                <md-button class="md-primary md-raised" @click="onShowNewEntry()"
                    >frage hinzufügen</md-button
                >
            </md-table-empty-state>
            <!-- Entry Rows -->
            <md-table-row
                class="row"
                @click="onShowEntry(item.entry_id)"
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
                <md-table-cell md-sort-by="subject_id" md-label="Kategorie">
                    {{ getSubject(item.subject_id) | trimLength }}
                </md-table-cell>
                <!-- User -->
                <md-table-cell md-sort-by="user_id" md-label="Erstellt von">
                    <div
                        :class="users.find(user => user.user_id === item.user_id).role"
                        class="role"
                    >
                        {{ getUserRoleLetter(item.user_id) }}
                        <md-tooltip md-delay="600">{{ getUserRole(item.user_id) }}</md-tooltip>
                    </div>
                    {{ getUser(item.user_id, "short") }}
                </md-table-cell>
                <!-- Date -->
                <md-table-cell md-sort-by="created_at" md-label="Erstellt am">
                    {{ item.created_at | formatDate }}
                </md-table-cell>
            </md-table-row>
        </md-table>
        <!-- Add new Entry Dialog -->
        <md-dialog class="new-entry-dialog" :md-active.sync="showNewEntry">
            <md-dialog-title>Frage {{ isUpdate ? "bearbeiten" : "erstellen" }}</md-dialog-title>
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
                        <md-select v-model="newEntry.subject_id">
                            <md-option
                                :value="option.subject_id"
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
                    <md-button class="md-accent" @click="isUpdate ? onAbortUpdate() : onAbortNewEntry()">Abbrechen</md-button>
                    <md-button
                        class="md-primary md-raised"
                        @click="isUpdate ? onUpdateEntry() : onNewEntry()"
                        >Speichern</md-button
                    >
                </md-dialog-actions>
            </md-dialog-content>
        </md-dialog>
        <!-- Show Entry Dialog -->
        <md-dialog class="entry-dialog" :md-active.sync="showEntry">
            <md-dialog-title class="title">{{ shownEntry.question }}</md-dialog-title>
            <md-menu class="dialog-menu" md-size="auto" md-direction="bottom-end">
                <md-button class="md-icon-button" md-menu-trigger>
                    <md-icon>more_vert</md-icon>
                </md-button>

                <md-menu-content class="comment-menu-content">
                    <md-menu-item @click="onShowUpdate()">
                        <md-icon>create</md-icon>
                        <span>Bearbeiten</span>
                    </md-menu-item>

                    <md-menu-item @click="onDeleteEntry()">
                        <md-icon>delete</md-icon>
                        <span>Löschen</span>
                    </md-menu-item>
                </md-menu-content>
            </md-menu>
            <span class="subtitle">
                <span class="md-caption">
                    erstellt von
                </span>
                <span class="md-body-2">{{ getUser(shownEntry.user_id, "full") }}</span>
                <span> • </span>
                <span class="md-body-2">{{ shownEntry.created_at | formatDate }}</span>
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
                    <p class="md-body-2">{{ getSubject(shownEntry.subject_id) }}</p>
                </div>
                <br />
                <div class="field">
                    <span class="md-caption">Antworthinweis</span>
                    <p class="md-body-2">{{ shownEntry.hint | checkLength }}</p>
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
                                @click="onNewComment()"
                                :disabled="newComment.content === ''"
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
                            <md-list-item
                                v-for="comment in entryComments"
                                :key="comment.comment_id"
                            >
                                <div class="comment">
                                    <div class="top-line">
                                        <span class="md-body-2 username">{{
                                            getUser(comment.user_id, "full")
                                        }}</span>
                                        <span class="md-caption date">{{
                                            comment.created_at | formatCommentDate
                                        }}</span>
                                    </div>
                                    <p
                                        class="md-body-1 content"
                                        style="display: flex; flex-flow: row wrap; max-width: 250px;"
                                    >
                                        {{ comment.content }}
                                    </p>
                                </div>
                                <md-menu
                                    v-if="comment.user_id === 3"
                                    md-size="auto"
                                    md-direction="bottom-end"
                                >
                                    <md-button class="md-icon-button" md-menu-trigger>
                                        <md-icon>more_vert</md-icon>
                                    </md-button>

                                    <md-menu-content class="comment-menu-content">
                                        <md-menu-item>
                                            <md-icon>create</md-icon>
                                            <span>Bearbeiten</span>
                                        </md-menu-item>

                                        <md-menu-item @click="onDeleteComment(comment.comment_id)">
                                            <md-icon>delete</md-icon>
                                            <span>Löschen</span>
                                        </md-menu-item>
                                    </md-menu-content>
                                </md-menu>
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
