<template>
<nav 
    class="grid-container"
    :style="{height: gridHeight}"
>
    <li v-for="window in displayIcons" :key="window.key">
        <button class="icon" @touchstart="window.type ? redirectLink(window.url): openWindow(window.windowId)" @dblclick="window.type ? redirectLink(window.url):openWindow(window.windowId)">
            <img class="icon-image" :src="require('../assets/icons/' + window.iconImage)" :alt="window.altText" />
            <div class="border">
            <p class="icon-text">
                {{window.displayName}}
            </p>
            </div>
        </button>
    </li>
</nav>
</template>

<style scoped>

</style>

<script>
export default {
    name: 'AppGrid',
    data: function () {
        return {
            windows: this.$store.getters.getWindows,
            gridHeight: ''
        }
    },
    methods: {
        openWindow(windowId) {
            const payload = {
                'windowState': 'open',
                'windowID': windowId
            }
            this.$store.commit('setWindowState', payload)
        },
        redirectLink(url) {
        const link = document.createElement("a");
        link.href = url;
        link.target="_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    },
    computed:{
        displayIcons(){
            return this.windows.filter(window=>window.showOnDesktop)
        }
    },
    mounted() {
        let gridH =  this.$store.getters.getFullscreenWindowHeight
        this.gridHeight = gridH.substring(0, gridH.length - 2) - 60 + 'px'
    },
}
</script>
