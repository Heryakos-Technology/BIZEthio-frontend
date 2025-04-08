<template>
  <div class="mt-16">
    <div id="map" style="height: 400px;"></div>
    <button class="float-right cursor-pointer" @click="close"><i class="fa-solid fa-xmark text-2xl "></i></button>
    <button class="bg-orange-300 text-white pointer-cursor hover:bg-amber-300 px-8 rounded-lg py-2" @click="saveLocation">Save Location</button>
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
    };
  },
  mounted() {

    if (this.currentLocation && this.currentLocation.lat && this.currentLocation.lng) {
      this.initMap();
    } else {
      console.error("Current location is not defined.");
    }
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([this.currentLocation.lat, this.currentLocation.lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(this.map);

      this.marker = L.marker([this.currentLocation.lat, this.currentLocation.lng]).addTo(this.map)
        .bindPopup('You are here!')
        .openPopup();

      this.map.on('click', (e) => {
        this.addMarker(e.latlng);
      });
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
};
</script>

<style>
#map {
  width: 100%;
  height: 400px;
}
</style>