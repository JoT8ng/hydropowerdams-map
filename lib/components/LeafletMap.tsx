import dynamic from "next/dynamic";
import type { GeoJsonObject } from "geojson";

type Props = {
  data: GeoJsonObject;
};

function LeafletMap({ data }: Props) {
  const Map = dynamic(
    () => import("../components/Map"),
    { ssr: false } // Prevent server-side render
  );
  return <Map data={data} />;
}

export default LeafletMap;
