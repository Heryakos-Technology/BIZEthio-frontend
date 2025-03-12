<template>
    <div class="w-full" style="background: linear-gradient(to bottom left, #8AE4FF 0%, #BFECFC 48%, #EAFAFF 98%);">
      <AdvancedImage :cldImg="myImg" />
    </div>
  </template>
  
  <script setup>
  import { AdvancedImage } from '@cloudinary/vue';
  import { Cloudinary } from '@cloudinary/url-gen';
  
  // Create a Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo', // Replace 'demo' with your actual cloud name
    },
  });
  
  // Create an image instance
  const myImg = cld.image('docs/models'); // Replace 'docs/models' with your actual public ID
  </script>
  
  <style scoped>
  /* Add any styles specific to your CloudImage component here */
  </style>