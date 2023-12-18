import * as mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2x2IiwiYSI6ImNsaTRteXhxZDAwbTUzbHF1MjNlcDZidHYifQ.irMKtbo9BzdoJ3iSnqEA0w";

mapboxgl.accessToken = MAPBOX_TOKEN;

export { mapboxgl };
