import type { GeoJsonTypes } from "geojson";

export type DataPoint = {
  type: GeoJsonTypes;
  properties: DataPointProperties;
  geometry: {
    type: GeoJsonTypes;
    coordinates: [number, number];
  };
};

// Properties in a single data point
export type DataPointProperties = {
  Country: string;
  Dam: string;
  "Dam Capacity": string;
  Coordinates: string;
  Latitude: number;
  Longitude: number;
  Status: string;
  "Dam Status": string;
  Cost: number;
  "Cost/Million (USD)": number;
  Funding: string;
  Construction: string;
  "Target Market": string;
  "Feasibility stage/ESIA": string;
  "Political Issues": string;
  "Environmental Issues": string;
  "Social Issues": string;
  "NGOs Organizing": string;
};

export type SearchFacet = {
  label: string;
  accessor: string[];
  threshold: number;
  default: boolean;
};
