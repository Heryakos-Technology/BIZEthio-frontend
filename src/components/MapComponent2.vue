<template>
  <div class="mt-16">
    <div id="map2" style="height: 400px;"></div>
    <button class="float-right cursor-pointer mt-2" @click="close"><i class="fa-solid fa-xmark text-2xl "></i></button>
    <button class="bg-orange-400 mt-2 text-white cursor-pointer hover:bg-amber-300 px-8 rounded-lg py-2" @click="saveLocation">Save Location</button>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  props: {
    currentLocation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      marker: null,
      selectedLocation: {
        lat: null,
        lng: null,
      },
      //isMapInitialized2: false, // Flag to check if map is initialized
    };
  },
  mounted() {
    if (this.currentLocation && this.currentLocation.lat && this.currentLocation.lng) {
      this.initMap1();
    } else {
      console.error("Current location is not defined.");
    }
  },
  methods: {
    initMap1() {
     // if (this.isMapInitialized2) return; // Prevent re-initialization

      // Initialize the map centered on the current location
      this.map = L.map('map2').setView([this.currentLocation.lat, this.currentLocation.lng], 13);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);

      // Add a marker for the current location
      this.marker = L.marker([this.currentLocation.lat, this.currentLocation.lng]).addTo(this.map)
        .bindPopup('You are here!')
        .openPopup();

      // Allow adding a new marker on map click
      this.map.on('click', (e) => {
        this.addMarker(e.latlng);
      });

      //this.isMapInitialized2 = true; // Set the flag to true
    },
    close() {
      this.$emit('close');
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
      this.$emit('location-selected', this.selectedLocation);
    },
  },
  beforeDestroy() {
    if (this.map) {
      this.map.off(); // Remove event listeners
      this.map.remove(); // Clean up the map instance
    }
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 400px;
  position: relative;
  z-index: 10;
}
</style>