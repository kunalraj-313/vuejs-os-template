<template>
<nav class="navbar-container">
<div class='start-menu-drawer' v-if="startToggled">
<div class='sidebar'>
<img :src="require('@/assets/icons/sidebar.png')" width='25px' height='150px' >

</div>
</div>
<div @click="toggleStart"  :class="startToggled ? 'start-menu-active':'start-menu'" >
<img :src="require('@/assets/icons/start-icon.png')" width='19px' style='margin-right:5px;'>
Start
</div>
    <div 
        v-for="window in this.activeWindows" 
        :key="window.key"
    >
        <button 
            v-if="$store.getters.getActiveWindow!==window.windowId && (window.windowState=='open' || window.windowState=='minimize')" v-on:click="openWindow(window.windowId)" 
            class="navbar-item open">
                {{window.displayName}}
        </button>
        <button 
            v-if="$store.getters.getActiveWindow==window.windowId" 
            v-on:click="openWindow(window.windowId)" 
            class="navbar-item-depressed">
                {{window.displayName}}
        </button>
    </div>
    <div class="spacer"></div>
    <div alt="time" class="time">
        <!-- <img src="../assets/speakers.png" class="icon-image"/> -->
        <time>
            {{time}}
        </time>
    </div>
</nav>
</template>

<style scoped>
/*-------------------------------------------*\
    Container
\*-------------------------------------------*/

.navbar-container {
    width: 100%;
    height: 35px;
    background: rgb(192, 192, 192);
    border-top: solid rgb(250, 250, 250) 2px;
    z-index: 100;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.start-menu{
 box-shadow: 1.5px 1.5px black;
    border-top: solid rgb(250, 250, 250) 1.5px;
    border-left: solid rgb(250, 250, 250) 1.5px;
    border-bottom: solid rgb(90, 90, 90) 1.5px;
    border-right: solid rgb(90, 90, 90) 1.5px;
    background: rgb(192, 192, 192);
    border-radius: 0.5px;
    width: 100px;
    margin: 5px;
    height: 25px;
        display: flex;
    justify-content: center;
    align-items: center;
}

.start-menu-active {
      background: rgb(192, 192, 192);
    box-shadow: none;
    border-top: solid rgb(0, 0, 0) 1.5px;
    border-left: solid rgb(0, 0, 0) 1.5px;
    border-bottom: solid rgb(250, 250, 250) 1.5px;
    border-right: solid rgb(250, 250, 250) 1.5px;
        border-radius: 0.5px;
    width: 100px;
    margin: 5px;
    height: 25px;
        display: flex;
    justify-content: center;
    align-items: center;

}

.start-menu-drawer{
    z-index: 2147483647 ;
    position: absolute;
    left: 0px;
    bottom: 39px;
    width: 165px;
    height: 282px;
    background: #000;
    background: #c3c3c3;
    overflow: hidden;
    border-top: 2px solid #fafafa;
    border-left: 2px solid #fafafa;
    border-right: 1.5px solid #5a5a5a;
    border-bottom: 1.5px solid #5a5a5a;
    box-shadow: 1.5px 1.5px #000;
    max-height: 100%;
    max-width: 100%;
    align-items: flex-end;
    outline: 1px solid #dedede;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 12px;
}

.sidebar{
    width: 25px;
    background: #7b7d7b;
    height: 100%;
    display: flex;
    align-items: flex-end;
}




/*-------------------------------------------*\
    Navbar Items
\*-------------------------------------------*/

.navbar-item {
    width: 100px;
    height: 25px;
    border-radius: 10px;
    margin-left: 2px;
    margin-right: 2px;
    box-shadow: 1.5px 1.5px black;
    border-top: solid rgb(250, 250, 250) 1.5px;
    border-left: solid rgb(250, 250, 250) 1.5px;
    border-bottom: solid rgb(90, 90, 90) 1.5px;
    border-right: solid rgb(90, 90, 90) 1.5px;
    background: rgb(192, 192, 192);
    border-radius: 0.5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
    font-weight: bold;
    font-size: 0.7rem;
}

.navbar-item:active {
    background: rgb(192, 192, 192);
    box-shadow: none;
    border-top: solid rgb(0, 0, 0) 1.5px;
    border-left: solid rgb(0, 0, 0) 1.5px;
    border-bottom: solid rgb(250, 250, 250) 1.5px;
    border-right: solid rgb(250, 250, 250) 1.5px;
}

.navbar-item:hover {
    cursor: pointer;
}

.navbar-item-depressed {
    width: 100px;
    height: 25px;
    border-radius: 10px;
    margin-left: 2px;
    margin-right: 2px;
    border-radius: 0.5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
    font-weight: bold;
    font-size: 0.7rem;
    background: rgb(192, 192, 192);
    box-shadow: none;
    background: repeating-conic-gradient(rgb(189, 190, 189) 0% 25%, rgb(255, 255, 255) 0% 50%) 50% / 2px 2px;
    border-top: solid rgb(0, 0, 0) 1.5px;
    border-left: solid rgb(0, 0, 0) 1.5px;
    border-bottom: solid rgb(250, 250, 250) 1.5px;
    border-right: solid rgb(250, 250, 250) 1.5px;
}

/*-------------------------------------------*\
    Utilities
\*-------------------------------------------*/

.spacer {
    flex-grow: 1;
}

.time {
    width: 75px;
    margin: 5px;
    height: 25px;
    background: rgb(192, 192, 192);
    border-right: solid rgb(250, 250, 250) 1.5px;
    border-bottom: solid rgb(250, 250, 250) 1.5px;
    border-top: solid rgb(90, 90, 90) 1.5px;
    border-left: solid rgb(90, 90, 90) 1.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 0.6em;
}

/*-------------------------------------------*\
    CSS Normalisation 
\*-------------------------------------------*/

button {
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    outline: inherit;
}
</style>

<script>
import moment from 'moment'
export default {
    name: 'Navbar',
    data: function () {
        return {
            activeWindows: this.$store.getters.getActiveWindows,
            startToggled:false,
            // date time for moment.js
            time: '',
            date: ''
        }
    },
    beforeMount() {
        setInterval(() => {
            this.time = moment().format('hh:mm A')
        }, 1000)
        setInterval(() => {
            this.date = moment().format('ddd DD MMMM')
        }, 1000)
    },
    methods: {
        openWindow(windowId) {
            const payload = {
                'windowState': 'open',
                'windowID': windowId
            }
            this.$store.commit('setWindowState', payload)
        },

        toggleStart(){
            this.startToggled = !this.startToggled
        }
    }
}
</script>
