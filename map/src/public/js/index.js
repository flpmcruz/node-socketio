const socket = io();
const statusApp = document.querySelector("#status");

mapboxgl.accessToken =
  "pk.eyJ1IjoiZmxwbWlyZWxlcyIsImEiOiJjbGRxOXNpanAwdDE0M3BxcnRpbnR4M3loIn0.hnb6jGdJTHMp4WtrHGyZQA";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

let marker;
socket.on("connect", () => {
  socket.on("welcome", (data) => {
    statusApp.innerHTML = data.msg;
    marker = new mapboxgl.Marker().setLngLat(data.position).addTo(map);
  });
});

socket.on("position", ({ position }) => {
  marker.setLngLat(position);
  map.flyTo({
    center: position,
    essential: true // this animation is considered essential with respect to prefers-reduced-motion
  });
});
