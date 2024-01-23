<template>
<div class="grid">
    <img v-for="imageName in imageNames" :key="imageName" :src="getImagePath(imageName)" :alt="imageName" />
</div>
</template>
<script>
export default {
  name: 'ImageGallery',
  data() {
    return {
        imageNames: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '18.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '13.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg'],
    };
  },
  methods: {
    getImagePath(imageName) {
      try {
        return require(`@/assets/images/` + imageName);
      } catch (e) {
        console.error('Failed to load image:', imageName, e);
      }
    },
  },
};
</script>

<style scoped>
.grid {
    column-count: 2;
    column-gap: 0.5em;
    margin-top: auto;
    margin-bottom: auto;
    padding: 20px;
}

img {
    background-color: #eee;
    display: inline-block;
    margin: 0 0 0.5em;
    width: 100%;
}

@media screen and (max-width: 600px) {
    .grid {
        column-count: 1;
    }
}
</style>
