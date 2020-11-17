<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import getterMixin from './mixins/getterMixin';

@Component
export default class App extends getterMixin {
    mounted() {
        moment.locale("de");
    }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
    "default",
    (
        primary: #a0ca16,
        accent: #ed4d1d,
    )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto Regular";
}

a,
a:link,
a:hover,
a:active,
a:visited {
    cursor: pointer;
    text-decoration: none !important;
}

#app {
    background-image: url("assets/img/bg2.png");
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    height: 100vh;
    width: 100vw;
    font-family: "Roboto";

    .md-dialog .md-dialog-container {
        min-width: 768px !important;
    }
}
/*
 * Robot
 */
@font-face {
    font-family: "Roboto Black";
    src: url("./assets/font/Roboto/Roboto-Black.ttf");
}
@font-face {
    font-family: "Roboto Black Italic";
    src: url("./assets/font/Roboto/Roboto-BlackItalic.ttf");
}
@font-face {
    font-family: "Roboto Bold";
    src: url("./assets/font/Roboto/Roboto-Bold.ttf");
}
@font-face {
    font-family: "Roboto Bold Italic";
    src: url("./assets/font/Roboto/Roboto-BoldItalic.ttf");
}
@font-face {
    font-family: "Roboto Italic";
    src: url("./assets/font/Roboto/Roboto-Italic.ttf");
}
@font-face {
    font-family: "Roboto Light";
    src: url("./assets/font/Roboto/Roboto-Light.ttf");
}
@font-face {
    font-family: "Roboto Light Italic";
    src: url("./assets/font/Roboto/Roboto-LightItalic.ttf");
}
@font-face {
    font-family: "Roboto Medium";
    src: url("./assets/font/Roboto/Roboto-Medium.ttf");
}
@font-face {
    font-family: "Roboto Medium Italic";
    src: url("./assets/font/Roboto/Roboto-MediumItalic.ttf");
}
@font-face {
    font-family: "Roboto Regular";
    src: url("./assets/font/Roboto/Roboto-Regular.ttf");
}
@font-face {
    font-family: "Roboto Thin";
    src: url("./assets/font/Roboto/Roboto-Thin.ttf");
}
@font-face {
    font-family: "Roboto Thin Italic";
    src: url("./assets/font/Roboto/Roboto-ThinItalic.ttf");
}

/*
 * Roboto Slab
 */
@font-face {
    font-family: "Roboto Slab Black";
    src: url("./assets/font/Roboto_Slab/RobotoSlab-Black.ttf");
}
@font-face {
    font-family: "Roboto Slab Bold";
    src: url("./assets/font/Roboto_Slab/RobotoSlab-Bold.ttf");
}
@font-face {
    font-family: "Roboto Slab Extra Bold";
    src: url("./assets/font/Roboto_Slab/RobotoSlab-ExtraBold.ttf");
}
@font-face {
    font-family: "Roboto Slab Extra Light";
    src: url("./assets/font/Roboto_Slab/RobotoSlab-ExtraLight.ttf");
}
@font-face {
    font-family: "Roboto Slab Medium";
    src: url("./assets/font/Roboto_Slab/RobotoSlab-Medium.ttf");
}
@font-face {
    font-family: "Roboto Slab Regular";
    src: url("./assets/font/Roboto_Slab/RobotoSlab-Regular.ttf");
}
@font-face {
    font-family: "Roboto Slab Semi Bold";
    src: url("./assets/font/Roboto_Slab/RobotoSlab-SemiBold.ttf");
}
@font-face {
    font-family: "Roboto Slab Thin";
    src: url("./assets/font/Roboto_Slab/RobotoSlab-Thin.ttf");
}

/*
 * Karma
 */
@font-face {
    font-family: "Karma Bold";
    src: url("./assets/font/Karma/Karma-Bold.ttf");
}
@font-face {
    font-family: "Karma Light";
    src: url("./assets/font/Karma/Karma-Light.ttf");
}
@font-face {
    font-family: "Karma Medium";
    src: url("./assets/font/Karma/Karma-Medium.ttf");
}
@font-face {
    font-family: "Karma Regular";
    src: url("./assets/font/Karma/Karma-Regular.ttf");
}
@font-face {
    font-family: "Karma Semi Bold";
    src: url("./assets/font/Karma/Karma-SemiBold.ttf");
}

/*
 * Yantramanav
 */
@font-face {
    font-family: "Yantramanav Black";
    src: url("./assets/font/Yantramanav/Yantramanav-Black.ttf");
}
@font-face {
    font-family: "Yantramanav Bold";
    src: url("./assets/font/Yantramanav/Yantramanav-Bold.ttf");
}
@font-face {
    font-family: "Yantramanav Light";
    src: url("./assets/font/Yantramanav/Yantramanav-Light.ttf");
}
@font-face {
    font-family: "Yantramanav Medium";
    src: url("./assets/font/Yantramanav/Yantramanav-Medium.ttf");
}
@font-face {
    font-family: "Yantramanav Regular";
    src: url("./assets/font/Yantramanav/Yantramanav-Regular.ttf");
}
@font-face {
    font-family: "Yantramanav Thin";
    src: url("./assets/font/Yantramanav/Yantramanav-Thin.ttf");
}
</style>
