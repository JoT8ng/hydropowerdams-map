import { GeoJsonLayers, TileLayers } from "@/lib/types/map";

export const mapGeoJsonLayers: GeoJsonLayers = {
  Dams: {
    information: "This layer displays the locations of dams",
  },
  "Cost/Million (USD)": {
    information: "This layer displays the cost of the dam per million in USD.",
    legend: {
      type: "size",
      items: [
        { name: "Unknown", code: { min: 0, max: 0 }, size: "3" },
        { name: "1 - 300", code: { min: 1, max: 300 }, size: "4" },
        { name: "301 - 1200", code: { min: 301, max: 1200 }, size: "6" },
        { name: "1201 - 2900", code: { min: 1200, max: 2900 }, size: "10" },
        { name: "2901 - 6000", code: { min: 2901, max: 6000 }, size: "12" },
        { name: "6001 - 80000", code: { min: 6001, max: 80000 }, size: "15" },
      ],
    },
  },
  Status: {
    information: "This layer displays the current status of the dam.",
    legend: {
      type: "color",
      items: [
        { name: "Under Construction", code: "C", color: "#E69F00" },
        { name: "Completed", code: "COM", color: "#56B4E9" },
        { name: "Under Operation", code: "O", color: "#009E73" },
        { name: "Operating Partially", code: "OP", color: "#F0E442" },
        { name: "Proposed", code: "P", color: "#0072B2" },
        { name: "Under Rehabilitation", code: "R", color: "#D55E00" },
        { name: "Suspended", code: "S", color: "#CC79A7" },
        { name: "Uncertain", code: "U", color: "#332288" },
      ],
    },
  },
  // add more geojson layers here
};

export const mapTileLayers: TileLayers = {
  openStreetMap: {
    name: "OpenStreetMap",
    displayName: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    information: "OpenStreetMap",
    toggleable: false,
  },
  google: {
    name: "Google",
    displayName: "Google Satellite",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    attribution: "Google",
    information: "Satellite imagery",
    toggleable: true,
  },
  watersheds: {
    name: "watersheds",
    displayName: "Watersheds",
    url: `https://api.mapbox.com/styles/v1/intlrivers/clm3q7poc00u001pe70spejuj/tiles/512/{z}/{x}/{y}?access_token=${process.env.MAPBOX_KEY}`,
    attribution: "Data from HydroSHEDS",
    information: "Data from HydroSHEDS",
    toggleable: true,
  },
  rivers: {
    name: "rivers",
    displayName: "Rivers",
    url: `https://api.mapbox.com/styles/v1/intlrivers/clm4thx3700uj01pj8fjahweu/tiles/512/{z}/{x}/{y}?access_token=${process.env.MAPBOX_KEY}`,
    attribution: "Data from HydroSHEDS",
    information: "Data from HydroSHEDS",
    toggleable: true,
  },
  // add more tile layers here
};
