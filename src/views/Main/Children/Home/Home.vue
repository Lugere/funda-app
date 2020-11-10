<template>
    <div id="home">
        <div class="function">
            <div class="align-left">
                <span class="funda">Funda</span>
                <div class="breadcrumbs">
                    <span class="crumb">Home</span> / <span class="crumb">Computerkomponenten</span> /
                    <span class="current-crumb crumb">Wie ...</span>
                </div>
                <div class="search">
                    <md-field>
                        <md-input v-model="search" placeholder="Suchen..." />
                        <md-button class="md-icon-button md-dense">
                            <md-icon>search</md-icon>
                        </md-button>
                    </md-field>
                </div>
            </div>
            <div class="align-right">
                <span class="date">
                    {{ timestamp }}
                </span>
                <span class="welcome">Hallo Max M.</span>
            </div>
        </div>
        <div class="navigation"></div>
    </div>
</template>

<script src="./Home.ts" lang="ts"></script>

<style src="./Home.scss" lang="scss"></style>
