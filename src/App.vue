<template>
  <div id="app" @mouseover="playAudioOnHover" @click="playAudioOnClick">
    <div class="mute-button" @click="toggleMute">
      <div v-if="isMuted">
        <img
          src="/images/volume_off.svg"
          alt="Volume Off"
          width="27px"
          height="27px"
        />
      </div>
      <div v-else>
        <img
          src="/images/volume_on.svg"
          alt="Volume Off"
          width="27px"
          height="27px"
        />
      </div>
    </div>
    <div class="explore-btn" @click="startExplore" v-if="!explore">
        EXPLORE
    </div>
    <div class="video-background">
      <video autoplay muted loop ref="video">
        <source src="/videos/spaceship-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <top-navbar id="top-navbar"></top-navbar>
    <div>
        
    </div>
    <div class="screen" id="screen" v-if="explore">
      <audio ref="audio" id="audio-player" autoplay loop>
        <source src="/audios/stay-ost.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
      <div
        v-for="window in windows"
        :key="window.key"
        :aria-label="window.displayName"
      >
        <component
          :is="window.windowComponent"
          :nameOfWindow="window.windowId"
          :content_padding_bottom="window.windowContentPadding['bottom']"
          :content_padding_left="window.windowContentPadding['left']"
          :content_padding_right="window.windowContentPadding['right']"
          :content_padding_top="window.windowContentPadding['top']"
          :id="window.windowId"
          :style="{
            position: window.position,
            left: window.positionX,
            top: window.positionY,
          }"
          v-if="windowCheck(window.windowId)"
        >
          <component :is="window.windowContent" slot="content"> </component>
        </component>
      </div>
      <app-grid></app-grid>
    </div>
    <navbar id="navbar" v-if="explore"/>
  </div>
</template>

<script>
/*------------------------------------------------------------*\
    Import Components, you can change the path for different
    component themes (blueprint, windows, macos)
\*------------------------------------------------------------*/
import Navbar from "./components/macos/Navbar";
// import TopNavbar from './components/macos/TopNavbar.vue'
import Window from "./components/template/Window";
import AppGrid from "./components/AppGrid";
import Placeholder from "./components/views/Placeholder";
import Photos from "./components/views/Photos";
import OSWindow from "./components/template/OSWindow";
import Blueprint from "./components/views/Blueprint";
import Windows from "./components/views/Windows.vue";
import MacOS from "./components/views/MacOS.vue";
import Test from "./components/views/Test.vue";
import Bio from "./components/views/Bio.vue";
import Case from "./components/views/Case.vue";
export default {
  name: "App",
  data: function () {
    return {
      windows: this.$store.getters.getWindows,
      isMuted: false,
      explore:false,
      windowComponents: {},
    };
  },
  components: {
    Window,
    Navbar,
    AppGrid,
    Placeholder,
    Photos,
    OSWindow,
    Blueprint,
    Windows,
    MacOS,
    Test,
    Case,
    Bio,
    // TopNavbar,
  },
  computed: {
    style() {
      return {
        "--fullscreen": this.$store.getters.getFullscreenWindowHeight,
      };
    },
  },
  mounted() {
    /*-------------------------------------------------*\
            This fixes height problems for mobile devices 

            Code is detecting height of navbar and setting
            respective heights of screen
        \*-------------------------------------------------*/

    const audio = this.$refs.audio;
    const video = this.$refs.video;
    video.pause()
    audio.addEventListener("canplay", () => {
      audio.currentTime = 25; // Set desired start time
    });
    let navbar = document.getElementById("navbar");
    let topnavbar = document.getElementById("top-navbar");
    let topNavbarHeight = topnavbar.clientHeight;
    let navbarHeight = navbar.clientHeight;

    document.getElementById("screen").style.height =
      window.innerHeight - navbarHeight - topNavbarHeight + "px";

    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    function resetHeight() {
      document.body.style.height = window.innerHeight + "px";
      document.html.style.height = window.innerHeight + "px";
    }
    window.addEventListener("resize", resetHeight);
    this.$store.commit(
      "setFullscreenWindowHeight",
      window.innerHeight - navbarHeight - topNavbarHeight + "px"
    );
  },
  methods: {
    openWindow(windowId) {
      const payload = {
        windowState: "open",
        windowID: windowId,
      };
      this.$store.commit("setWindowState", payload);
    },

    playAudioOnHover() {
      const audio = this.$refs.audio;
      audio.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    },
    playAudioOnClick() {
      this.playAudioOnHover(); // Call the same method for clicks
    },

    toggleMute() {
      const audio = this.$refs.audio;
      audio.muted = !audio.muted; // Toggle mute
      this.isMuted = audio.muted; // Update mute state
    },

    startExplore(){
        this.explore=true
        const audio = this.$refs.audio;
        const video = this.$refs.video;
        audio.play();
        video.play();
    },

    windowCheck(windowId) {
      if (this.$store.getters.getWindowById(windowId).windowState == "open") {
        return true;
      }
    },
  },
};
</script>

<style>
/*---------------------------------------------------------------------------*\
    CSS Imports
    Change 'blueprint' to 'windows' or 'macos' to use windows or macos theme
\*---------------------------------------------------------------------------*/
@import "./assets/css/utils/normalize.css";
@import "./assets/css/macos/app.css";
@import "./assets/css/macos/window.css";
@import "./assets/css/macos/appgrid.css";

/*-------------------------------------------*\
    Utilities
\*-------------------------------------------*/

html {
  overflow: hidden;
}

.explore-btn {
    width: 150px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 10px;
    color: white;
    border: 2px solid white;
    position: absolute;
    top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
}

.explore-btn:hover{
    background: white;
    color: black;
}

#app {
  font-family: "Courier New", Courier, monospace;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  flex-direction: column;
}

.screen {
  width: 100%;
  position: absolute;
  z-index: 1000;
}

.mute-button {
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  z-index: 1001;
}

/*-------------------------------------------*\
    Fullscreen
\*-------------------------------------------*/

.fullscreen {
  left: 0 !important;
  position: relative;
  display: block;
  top: 0 !important;
  right: 0 !important;
}
</style>
