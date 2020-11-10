<template>
	<div id="site-nav" class="nav-bar md-elevation-3">
		<div class="logo-container">
			<img src="@/assets/img/blue_fox.png" class="logo" />
		</div>
		<div class="funda-container">funda</div>
		<md-tabs class="tab-container">
			<md-tab class="tab" md-label="Home" md-icon="home" to="Home" />
			<md-tab class="tab" md-label="Profil" md-icon="face" to="Profile" />
			<md-tab
				class="tab"
				md-label="Einstellungen"
				md-icon="settings"
				to="Settings"
			/>
		</md-tabs>
		<div class="action-container">
			<a @click="logout()">Abmelden</a>
		</div>
	</div>
</template>

<script lang="ts" src="./SiteNav.ts"></script>

<style lang="scss" src="./SiteNav.scss"></style>
