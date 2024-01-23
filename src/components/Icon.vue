<template>
    <div class="icon-container" 
    
    
    >
    <div @dblclick="downloadFile" style="display: flex;flex-direction: column;align-items: center;">
      <img
        :src="path"
      :width="width"
      :height="height"
      style="cursor: pointer;margin-bottom: 10px;"
    />
    <span>
        {{ name }}
    </span>
    </div>
 
    </div>

  </template>
  
  <script>
  export default {
    name: "DownloadableImage",
    props: {
      path: {
        type: String,
        required: true,
      },
      width: {
        type: [String, Number],
        default: 100,
      },
      height: {
        type: [String, Number],
        default: 100,
      },
      downloadPath: {
        type: String,
        required: true,
      },
      name:{
        type: String,
        required: true,
      },
    },
    methods: {
      downloadFile() {
        const link = document.createElement("a");
        link.href = this.downloadPath;
        link.download = this.downloadPath // Extracts file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    },
  };
  </script>
  

  <style>
  .icon-container{
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }
</style>