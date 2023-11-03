import { DataPointProperties } from "@/lib/types/data";
import type {
  Feature,
  FeatureCollection,
  GeoJsonObject,
  Geometry,
  GeoJsonProperties,
} from "geojson";

// Returns a GeoJSON compatible array of objects
const transformDataToGeoJson = (data: DataPointProperties[]): GeoJsonObject => {
  // Remove points that does not contain a latitude or longitude
  const sanitizedData = data.filter(
    (dataPoint) => dataPoint.Longitude && dataPoint.Latitude
  );

  const geoJsonArray: Feature<Geometry, DataPointProperties>[] =
    sanitizedData.map((dataPoint: DataPointProperties) => {
      return {
        type: "Feature",
        properties: { ...dataPoint },
        geometry: {
          type: "Point",
          coordinates: [dataPoint.Longitude, dataPoint.Latitude],
        },
      };
    });

  const geoJsonCollection: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: geoJsonArray,
  };

  return geoJsonCollection;
};

export default transformDataToGeoJson;
