<template>
  <div id="users">
    <!-- Users Table -->
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
          <span class="title">Benutzer</span>
          <md-button
            @click="showNewUser = true"
            class="md-primary add-user-btn md-raised"
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
        <md-button class="md-primary md-raised" @click="showNewUser = true"
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
        <md-table-cell md-sort-by="createdAt" md-label="Erstellt am">
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
            <label>Rolle</label>
            <md-select v-model="newUser.role">
              <md-option :value="1">Administrator </md-option>
              <md-option :value="2">Schüler </md-option>
              <md-option :value="3">Lehrer </md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>Hinweis</label>
            <md-input v-model="newUser.hint" />
          </md-field>
        </form>
        <md-dialog-actions>
          <md-button class="md-accent" @click="onAbortNewUser()"
            >Abbrechen</md-button
          >
          <md-button class="md-primary md-raised" @click="onNewUser()"
            >Speichern</md-button
          >
        </md-dialog-actions>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script src="./Users.ts" lang="ts"></script>

<style src="./Users.scss" lang="scss"></style>
