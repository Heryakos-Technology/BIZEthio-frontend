<template>
    <div>
      <h2>Upload Image or Video</h2>
      
      <input type="file" @change="handleFileUpload" accept="image/*,video/*" />
      <button @click="uploadFile">Upload File</button>
  
      <h3>Or Upload via URL</h3>
      <input type="text" v-model="url" placeholder="Enter image/video URL" />
      <button @click="uploadUrl">Upload from URL</button>
  
      <div v-if="uploadResponse">
        <h4>Uploaded Media:</h4>
        <img v-if="isImage" :src="uploadResponse.secure_url" alt="Uploaded Media" />
        <video v-if="isVideo" :src="uploadResponse.secure_url" controls></video>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CryptoJS from 'crypto-js';
  
  export default {
    data() {
      return {
        file: null,
        url: '',
        uploadResponse: null,
        isImage: false,
        isVideo: false,
        cloudName: 'dzofoegwf',
        uploadPreset: 'ml_default',
      };
    },
    methods: {
      generateSignature(params) {
        const apiSecret = 'A5D7SF1aLxGmy_TUAao-iA5C3rM'; // Replace with your actual API secret
        const timestamp = Math.floor(Date.now() / 1000);
        const sortedParams = Object.entries(params)
          .sort()
          .map(([key, value]) => `${key}=${value}`)
          .join('&') + apiSecret;
  
        const signature = CryptoJS.SHA1(sortedParams).toString(CryptoJS.enc.Hex);
        return { signature, timestamp };
      },
      handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      async uploadFile() {
        if (!this.file) return;
  
        const timestamp = Math.floor(Date.now() / 1000);
        const params = {
          timestamp,
          upload_preset: this.uploadPreset,
        };
  
        const { signature } = this.generateSignature(params);
  
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('upload_preset', this.uploadPreset);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);
        formData.append('api_key', '734174595538154');
  
        try {
          const response = await axios.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/upload`, formData);
          this.uploadResponse = response.data;
          this.isImage = response.data.resource_type === 'image';
          this.isVideo = response.data.resource_type === 'video';
        } catch (error) {
          console.error('Error uploading file:', error.response.data);
        }
      },
      async uploadUrl() {
        if (!this.url) return;
  
        const params = {
          timestamp: Math.floor(Date.now() / 1000),
          upload_preset: this.uploadPreset,
        };
  
        const { signature } = this.generateSignature(params);
  
        const formData = new FormData();
        formData.append('file', this.url); // Ensure the URL is valid
        formData.append('upload_preset', this.uploadPreset);
        formData.append('timestamp', params.timestamp);
        formData.append('signature', signature);
  
        try {
          const response = await axios.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/upload`, formData);
          this.uploadResponse = response.data;
          this.isImage = response.data.resource_type === 'image';
          this.isVideo = response.data.resource_type === 'video';
        } catch (error) {
          console.error('Error uploading URL:', error.response.data);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>