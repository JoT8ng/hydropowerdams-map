export type TileLayerProperties = {
  name: string;
  displayName: string;
  url: string;
  attribution: string;
  information: string;
  toggleable: boolean;
  legend?: Legend;
};

export type GeoJsonLayerProperties = {
  information: string;
  legend?: Legend;
};
export type Legend = {
  type: LegendType;
  items: LegendNumber[] | LegendString[];
};

export type LegendType = "size" | "color" | "choropleth";

export type LegendNumber = {
  name: string;
  code: NumberRange;
  size: string;
};

export type LegendString = {
  name: string;
  code: string;
  color: string;
};

export type NumberRange = {
  min: number;
  max: number;
};

export type GeoJsonLayers = Record<string, GeoJsonLayerProperties>;

export type TileLayers = Record<TileProviders, TileLayerProperties>;

export type TileProviders = string;
