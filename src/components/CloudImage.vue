<template>
    <div class="w-full" style="background: linear-gradient(to bottom left, #8AE4FF 0%, #BFECFC 48%, #EAFAFF 98%);">
      <AdvancedImage :cldImg="myImg" />
    </div>
  </template>
  
  <script setup>
  import { AdvancedImage } from '@cloudinary/vue';
  import { Cloudinary } from '@cloudinary/url-gen';

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo', 
    },
  });
  

  const myImg = cld.image('docs/models'); 
  </script>
  
  <style scoped>

  </style>