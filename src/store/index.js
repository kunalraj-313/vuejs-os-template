import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Height of Fullscreen Window
    fullscreenWindowHeight: window.innerHeight + "px",

    // Active Window State
    activeWindow: "nil", 

    // Active Windows Array State
    activeWindows: [],

    // Z-index State
    zIndex: 2, 

  
      


    windows: [
      {
        windowId: "Biography", 
        windowState: "close",
        showOnDesktop:true,
        type:'url',
        url:'',
        displayName: "Biography",
        windowComponent: 'window',
        windowContent: 'Bio',
        windowContentPadding: {
            top: null,
            right: null,
            bottom: null,
            left: null
        },
        position: "absolute",
        positionX: "10vw",
        positionY: "10vh",
        iconImage: "bio.png",
        altText: "Placeholder Icon",
        fullscreen: false
    },
    {
      windowId: "ResumeLink", 
      windowState: "close",
      showOnDesktop:true,
      displayName: "Resume",
      windowComponent: 'window',
      type:'url',
      url:'/downloads/resume.pdf',
      windowContent: 'Photos',
      windowContentPadding: {
        top: '5%',
        right: '5%',
        bottom: '5%',
        left: '5%'
      },
      position: "absolute",
      positionX: "6vw",
      positionY: "12vh",
      iconImage: "resume.png",
      altText: "Placeholder Icon",
      fullscreen: false
    },
    {
      windowId: "PhotoWindow", 
      windowState: "close",
      showOnDesktop:true,
      displayName: "Photos",
      windowComponent: 'window',
      windowContent: 'Photos',
      windowContentPadding: {
        top: '5%',
        right: '5%',
        bottom: '5%',
        left: '5%'
      },
      position: "absolute",
      positionX: "6vw",
      positionY: "12vh",
      iconImage: "camera.png",
      altText: "Placeholder Icon",
      fullscreen: false
    },

      {
        windowId: "CaseStudies", 
        windowState: "close",
        showOnDesktop:true,
        displayName: "Case Studies",
        windowComponent: 'window',
        windowContent: 'Case',
        windowContentPadding: {
          top: '5%',
          right: '5%',
          bottom: '5%',
          left: '5%'
        },
        position: "absolute",
        positionX: "10vw",
        positionY: "10vvh",
        iconImage: "case-studies.png",
        altText: "CaseStudies Icon",
        fullscreen: false
    },


      {
        windowId: "MailLink", 
        windowState: "close",
        showOnDesktop:false,
        type:'url',
        url:"https://mail.google.com/mail/u/0/?view=cm&fs=1&to=srikanthiyr7@gmail.com&su=" +
        encodeURIComponent("Message from Website") +
        "&body=" +
        encodeURIComponent("Hi Srikanth, looking forward to connect with you"),
        displayName: "Mail",
        windowComponent: 'window',
        windowContent: 'Mail',
        windowContentPadding: {
          top: '5%',
          right: '5%',
          bottom: '5%',
          left: '5%'
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "mail.png",
        altText: "Placeholder Icon",
        fullscreen: false
      },
      {
        windowId: "Behance", 
        windowState: "close",
        displayName: "Behance",
        windowComponent: 'window',
        type:'url',
        showOnDesktop:false,
        url:'http://behance.net/srikanthiy3978',
        windowContent: 'Mail',
        windowContentPadding: {
          top: '5%',
          right: '5%',
          bottom: '5%',
          left: '5%'
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "behance.png",
        altText: "Placeholder Icon",
        fullscreen: false
      },
      {
        windowId: "Linkedin", 
        windowState: "close",
        showOnDesktop:false,
        type:'url',
        url:'http://linkedin.com/in/srikanth-n-b5995324b',
        displayName: "Linkedin",
        windowComponent: 'window',
        windowContent: 'Mail',
        windowContentPadding: {
          top: '5%',
          right: '5%',
          bottom: '5%',
          left: '5%'
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "linkedin.png",
        altText: "Placeholder Icon",
        fullscreen: false
      },
      {
        windowId: "Dribbble", 
        windowState: "close",
        showOnDesktop:false,
        displayName: "Dribbble",
        type:'url',
        url:'http://dribbble.com/srikanthiyr7',
        windowComponent: 'window',
        windowContent: 'Mail',
        windowContentPadding: {
          top: '5%',
          right: '5%',
          bottom: '5%',
          left: '5%'
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "dribble.png",
        altText: "Placeholder Icon",
        fullscreen: false
      },


    ],
  },
  mutations: {
    // Active Window Mutator
    setActiveWindow(state, window) {
      state.activeWindow = window
    },

    // Pushes Active Window onto Active Windows Array
    pushActiveWindow(state, window) {
      state.activeWindows.push(window)
    },

    // Removes Active Window from Active Windows Array
    popActiveWindow(state, window) {
      const windowIndex = state.activeWindows.indexOf(window);
      if (windowIndex !== -1) {
        state.activeWindows.splice(windowIndex, 1)
      }
    },

    // Z-index increment function
    zIndexIncrement(state, windowID) {
      state.zIndex += 1
      document.getElementById(windowID).style.zIndex = state.zIndex
    },

    // Set height of max-height of fullscreen window
    setFullscreenWindowHeight(state, height) {
      state.fullscreenWindowHeight = height
    },

    setFullscreen(state, payload) {
      function getArrItem() {
        return state.windows.find(
          (windows) => windows.windowId === payload.windowID
        );
      }
      const window = getArrItem();
      window.fullscreen = payload.fullscreen;
    },

    // Window State Mutator
    setWindowState(state, payload) {
      // payload = {'windowState': 'open', 'windowID': 'WindowOne'}

      function getArrItem() {
        return state.windows.find(
          (windows) => windows.windowId === payload.windowID
        );
      }
      const window = getArrItem();

      var preventAppendingOpenWindow = false;
      if (window.windowState == "open" || window.windowState == "minimize") {
        preventAppendingOpenWindow = true;
      }

      if (payload.windowState == "open") {
        window.windowState = payload.windowState;
        setTimeout(() => {
          this.commit("zIndexIncrement", payload.windowID);
        }, 0);
        setTimeout(() => {
          this.commit("setActiveWindow", payload.windowID);
        }, 0);
        if (preventAppendingOpenWindow == false) {
          setTimeout(() => {
            this.commit("pushActiveWindow", window);
          }, 0);
        }
      } else if (payload.windowState == "close") {
        window.windowState = payload.windowState;
        setTimeout(() => {
          this.commit("popActiveWindow", window);
        }, 0);
        setTimeout(() => {
          this.commit("setActiveWindow", "nil"); 
        }, 0);
      } else if (payload.windowState == "minimize") {
        window.windowState = payload.windowState;
        this.commit("setActiveWindow", "nil"); 
      } else {
        console.log("Error: windowState not found or invalid");
      }
    },
  },
  getters: {
    // Active Window Getter
    getActiveWindow: (state) => {
      return state.activeWindow;
    },

    // Window Getter
    getWindowById: (state) => (id) => {
      return state.windows.find((window) => window.windowId === id);
    },

    getWindowFullscreen: (state) => (id) => {
      return state.windows.find((window) => window.windowId === id).fullscreen;
    },

    getWindows: (state) => {
      return state.windows;
    },

    getActiveWindows(state) {
      return state.activeWindows;
    },

    getFullscreenWindowHeight(state) {
      return state.fullscreenWindowHeight;
    },
  },
});
