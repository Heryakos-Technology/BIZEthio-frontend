<template>
    <div class=" mt-16 ">
      <div id="map" style="height: 400px;"></div>
      <button class="bg-orange-400 text-white px-8 rounded-lg py-2" @click="saveLocation">Save Location</button>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  
  export default {
    data() {
      return {
        map: null,
        marker: null,
        selectedLocation: {
          lat: null,
          lng: null,
        },
      };
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        this.map = L.map('map').setView([51.505, -0.09], 13); // Default location
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(this.map);
  
        this.map.on('click', (e) => {
          this.addMarker(e.latlng);
        });
      },
      addMarker(latlng) {
        if (this.marker) {
          this.marker.setLatLng(latlng);
        } else {
          this.marker = L.marker(latlng).addTo(this.map);
        }
        this.selectedLocation = latlng;
      },
      saveLocation() {
        // Emit the selected location to the parent component
        this.$emit('location-selected', this.selectedLocation);
      },
    },
  };
  </script>
  
  <style>
  #map {
    width: 100%;
    height: 400px;
  }
  </style>