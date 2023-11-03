import { DataContext } from "@/lib/context/DataContext";
import { DataPoint } from "@/lib/types/data";
import { NumberRange, TileProviders } from "@/lib/types/map";
import {
  renderDataPoint,
  renderCostDataPoint,
  renderStatusDataPoint,
} from "@/lib/utils/renderGeojsonFunctions";
import { Feature, Geometry } from "geojson";
import { LeafletMouseEvent } from "leaflet";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import Leaflet from "leaflet";
import _ from "lodash";
import TileLayers from "@/lib/components/TileLayers";
import { between } from "@/lib/utils/helpers";

const MapContent = ({ data }: { data: any }) => {
  const map = useMap();

  const {
    dataPoint,
    setDataPoint,
    visibleTileLayers,
    visibleGeoJsonLayer,
    dynamicTiles,
    setFilteredLegends,
  } = useContext(DataContext);

  const [filteredGeoJson, setFilteredGeoJson] = useState(data);
  const [geoJsonKey, addToGeoJsonKey] = useState(1);

  const damsRef: RefObject<Leaflet.GeoJSON> = useRef(null);
  const statusRef: RefObject<Leaflet.GeoJSON> = useRef(null);
  const costRef: RefObject<Leaflet.GeoJSON> = useRef(null);

  const { filteredLegends } = useContext(DataContext);

  useEffect(() => {
    const onDataPointChange = () => {
      const foundLayer = map.eachLayer(
        (layer: any) => layer.feature === dataPoint
      );

      if (foundLayer) {
        // TS complains about _layers not being found in foundLayer but we can ignore it
        //@ts-ignore
        const pathLayer = _.find(foundLayer._layers, function (object) {
          return object.feature === dataPoint;
        });

        // TODO: Notify user tha the layer has been filtered
        if (!pathLayer) {
          return;
        }

        map.setView(pathLayer._latlng, 5);

        // Switch ref object based on active reference
        let currentRef;
        if (statusRef.current) {
          currentRef = statusRef;
        } else if (costRef.current) {
          currentRef = costRef;
        } else {
          currentRef = damsRef;
        }
        handleFeatureClick(pathLayer, currentRef);
      }
    };
    if (dataPoint) {
      onDataPointChange();
    }
  }, [dataPoint, map]);

  useEffect(() => {
    const handleFilterChange = () => {
      let filteredData;
      if (typeof filteredLegends[0] === "string") {
        filteredData = data.features.filter(
          (dataPoint: DataPoint) =>
            !(filteredLegends as string[]).includes(dataPoint.properties.Status)
        );
      } else if (typeof filteredLegends[0] === "object") {
        filteredData = data.features.filter(
          (dataPoint: DataPoint) =>
            !(filteredLegends as NumberRange[]).some((legend) =>
              between(
                dataPoint.properties["Cost/Million (USD)"] || 0,
                legend.min,
                legend.max
              )
            )
        );
      }

      setFilteredGeoJson({ type: "FeatureCollection", features: filteredData });
    };

    if (data) {
      if (filteredLegends.length > 0) {
        handleFilterChange();
      } else if (filteredLegends.length === 0) {
        setFilteredGeoJson(data);
      }
      // Force the GeoJson components to re-render
      addToGeoJsonKey(geoJsonKey + 1);
    }
    // Prevent geojsonKey from re-triggering effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filteredLegends]);

  const handleFeatureClick = (layer: any, ref: RefObject<Leaflet.GeoJSON>) => {
    if (!ref.current) return;
    ref.current.resetStyle();
    layer.setStyle({ color: "red" });
  };

  // Reset filters and data when the geojson layer changes
  useEffect(() => {
    setFilteredLegends([]);
    setFilteredGeoJson(data);
  }, [visibleGeoJsonLayer, setFilteredGeoJson, data, setFilteredLegends]);

  const onEachFeature = (
    feature: Feature<Geometry>,
    layer: any,
    ref: RefObject<Leaflet.GeoJSON>
  ) => {
    layer.on({
      click: (e: LeafletMouseEvent) => {
        setDataPoint(feature as DataPoint);
        e.target.setStyle({ fillColor: "red" });
        map.setView(e.latlng, 5);
        handleFeatureClick(e.target, ref);
      },
      mouseover: (e: LeafletMouseEvent) => {
        e.target.setStyle({ fillColor: "orange" });
      },
      mouseout: (e: LeafletMouseEvent) => {
        e.target.setStyle({ fillColor: layer.defaultOptions.fillColor });
      },
    });
  };

  return (
    <>
      {visibleGeoJsonLayer === "Dams" && (
        <GeoJSON
          key={`dams-${geoJsonKey}`}
          ref={damsRef}
          data={filteredGeoJson}
          pointToLayer={(geoJsonPoint, latlng) =>
            renderDataPoint(geoJsonPoint, latlng)
          }
          onEachFeature={(feature, layer) =>
            onEachFeature(feature, layer, damsRef)
          }
        />
      )}
      {visibleGeoJsonLayer === "Cost/Million (USD)" && (
        <GeoJSON
          key={`cost-${geoJsonKey}`}
          ref={costRef}
          data={filteredGeoJson}
          pointToLayer={(geoJsonPoint, latlng) =>
            renderCostDataPoint(geoJsonPoint, latlng)
          }
          onEachFeature={(feature, layer) =>
            onEachFeature(feature, layer, costRef)
          }
        />
      )}
      {visibleGeoJsonLayer === "Status" && (
        <GeoJSON
          key={`status-${geoJsonKey}`}
          ref={statusRef}
          data={filteredGeoJson}
          pointToLayer={(geoJsonPoint, latlng) =>
            renderStatusDataPoint(geoJsonPoint, latlng)
          }
          onEachFeature={(feature, layer) =>
            onEachFeature(feature, layer, statusRef)
          }
        />
      )}
      {/* Tile layers */}
      {visibleTileLayers.map((provider) => (
        <TileLayers
          key={provider}
          provider={provider as TileProviders}
          tileLayers={dynamicTiles}
        />
      ))}
    </>
  );
};
export default MapContent;
