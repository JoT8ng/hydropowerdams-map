import { Feature } from "geojson";
import type { Point } from "geojson";
import L from "leaflet";

// Render base data point layer
export const renderDataPoint = (
  geoJsonPoint: Feature<Point, any>,
  latlng: L.LatLngExpression
) => {
  const style = {
    color: "#fff",
    fillColor: "#055CA8",
    fillOpacity: 0.8,
    weight: 2,
    radius: 6,
  };
  return L.circleMarker(latlng, style);
};

// Renders circles based on status
export function renderStatusDataPoint(
  geoJsonPoint: Feature<Point, any>,
  latlng: L.LatLngExpression
) {
  const switchStatus = () => {
    const status = geoJsonPoint.properties["Status"];
    switch (status) {
      case "O":
        return "#009E73";
      case "P":
        return "#0072B2";
      case "C":
        return "#E69F00";
      case "S":
        return "#CC79A7";
      case "COM":
        return "#56B4E9";
      case "R":
        return "#D55E00";
      case "OP":
        return "#F0E442";
      case "U":
        return "#332288";
    }
  };
  const style = {
    color: "#fff",
    fillColor: switchStatus(),
    fillOpacity: 0.8,
    weight: 2,
    radius: 8,
  };

  return L.circleMarker(latlng, style);
}

type NewType = Feature<Point, any>;

// Renders circles based on cost
export function renderCostDataPoint(
  geoJsonPoint: NewType,
  latlng: L.LatLngExpression
) {
  const calculateRadius = () => {
    const num = geoJsonPoint.properties["Cost/Million (USD)"];
    switch (true) {
      case !num:
        return 3;
      case 1 < num && num <= 300:
        return 4;
      case 300 < num && num <= 1200:
        return 6;
      case 1200 < num && num <= 2900:
        return 10;
      case 2900 < num && num <= 6000:
        return 12;
      case 6000 < num && num <= 80000:
        return 15;
      default:
        return 3;
    }
  };
  const style = {
    color: "#fff",
    fillColor: "#055CA8",
    fillOpacity: 0.8,
    weight: 2,
    radius: calculateRadius(),
  };

  return L.circleMarker(latlng, style);
}
