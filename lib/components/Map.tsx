import { MapContainer, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { DataContext } from "@/lib/context/DataContext";
import { useContext, useEffect } from "react";
import type { GeoJsonObject } from "geojson";
import fetchResourceWatchLayers from "@/lib/utils/fetchResourceWatchLayers";
import MapContent from "@/lib/components/MapContent";

type Props = {
  data: GeoJsonObject;
};

const Map = ({ data }: Props) => {
  const { setDynamicTiles } = useContext(DataContext);

  useEffect(() => {
    try {
      fetchResourceWatchLayers(setDynamicTiles);
    } catch {
      console.log("Error");
    }
    // Do not allow re-fetching
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapContainer
      center={[-1.381022, 32.065957]}
      zoom={4}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
      minZoom={3}
      maxBounds={[
        [-65.983, -31.815],
        [56.628, 70.644],
      ]}
    >
      <ScaleControl position="bottomright" />
      <MapContent data={data} />
    </MapContainer>
  );
};

export default Map;
