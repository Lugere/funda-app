<template>
    <div id="quizzes">
        <md-toolbar class="toolbar">
            <div class="col-1">
                <span class="title">Quizkatalog</span>
                <md-button class="md-raised md-primary"
                    >Quiz erstellen</md-button
                >
            </div>
            <div class="col-2">
                <md-field class="search">
                    <md-input
                        @input="searchOnTable"
                        placeholder="Nach Quiz suchen..."
                        v-model="search"
                    />
                </md-field>
            </div>
        </md-toolbar>
        <div class="quiz-container">
            <md-card class="quiz" v-for="quiz in searched" :key="quiz.quizId">
                <md-card-header>
                    <div class="md-title">{{ quiz.title }}</div>
                    <div>
                        <span class="md-body-2">
                            {{ getUser(quiz.userId) }}
                        </span>
                        <span class="md-caption">
                            {{ quiz.createdAt | formatFromNowDate }}
                        </span>
                    </div>
                    <div class="subjects md-body-2">
                        <span class="md-caption">
                            Themen:
                        </span>
                        {{ getQuizSubjects(quiz.quizId) }}
                    </div>
                    <md-menu
                        md-size="big"
                        md-direction="bottom-end"
                        class="more-button"
                    >
                        <md-button class="md-icon-button" md-menu-trigger>
                            <md-icon>more_vert</md-icon>
                        </md-button>

                        <md-menu-content>
                            <md-menu-item>
                                <span>Bearbeiten</span>
                                <md-icon>create</md-icon>
                            </md-menu-item>

                            <md-menu-item>
                                <span>Löschen</span>
                                <md-icon class="md-accent">delete</md-icon>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </md-card-header>
                <md-divider class="md-inset" />
                <md-card-expand>
                    <md-card-actions md-alignment="space-between">
                        <div>
                            <md-button
                                class="md-raised md-primary"
                                @click="onStartQuiz(quiz.quizId)"
                            >
                                Quiz starten
                            </md-button>
                            <md-button class="md-raised show-entries-button">
                                Fragen anzeigen
                            </md-button>
                        </div>
                        <!-- Expand Trigger -->
                        <md-card-expand-trigger>
                            <md-button class="md-icon-button">
                                <md-icon>keyboard_arrow_down</md-icon>
                            </md-button>
                        </md-card-expand-trigger>
                    </md-card-actions>
                    <!-- Expand Content -->
                    <md-card-expand-content>
                        <md-card-content>
                            {{ quiz.description | trimLength }}
                        </md-card-content>
                    </md-card-expand-content>
                </md-card-expand>
            </md-card>
        </div>
        <md-card v-if="!quizzes">
            <md-empty-state
                md-label="Gähnende Leere"
                md-description="Kein Quiz gefunden"
            >
                <md-button class="md-primary md-raised"
                    >Quiz erstellen</md-button
                >
            </md-empty-state>
        </md-card>
        <md-dialog
            :md-active.sync="showQuiz"
            class="quiz-dialog"
            v-if="showQuiz"
        >
            <md-dialog-title>{{ shownQuiz.title }}</md-dialog-title>
            <md-dialog-content v-if="!showAnswer">
                <div class="md-caption">
                    Frage {{ currentQuestion + 1 }}/{{ quizLength }}
                </div>
                <span class="md-subheading">{{ quizQuestion }}</span>
                <md-field class="answer-area">
                    <label>Deine Antwort</label>
                    <md-textarea v-model="answer" />
                </md-field>
                <a class="show-hint">Hinweis zeigen</a>
            </md-dialog-content>
            <md-dialog-content v-else>
                <div class="md-caption">
                    Frage {{ currentQuestion + 1 }}/{{ quizLength }}
                </div>
                <span class="md-subheading">{{ quizQuestion }}</span>
                <span class="md-caption">Antwort</span>
                <p class="answer md-body-1">
                    {{ quizAnswer }}
                </p>
                <div class="user-answer">
                    <span class="md-caption">Deine Antwort</span>
                    {{ answer }}
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <!-- <md-button class="md-raised" :disabled="currentQuestion < 1" @click="onPreviousQuestion()">Vorherige Frage</md-button> -->
                <md-button
                    class="md-raised next-question-button"
                    :disabled="currentQuestion + 1 == quizLength"
                    @click="onNextQuestion()"
                    >Nächste Frage</md-button
                >
                <md-button
                    class="md-raised md-primary"
                    v-if="!showAnswer"
                    @click="showAnswer = true"
                    >Antwort anzeigen</md-button
                >
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script src="./Quizzes.ts" lang="ts"></script>

<style src="./Quizzes.scss" lang="scss"></style>
