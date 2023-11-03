import { TileProviders, TileLayers } from "@/lib/types/map";
import { TileLayer } from "react-leaflet";

type MapLayersProps = {
  provider: TileProviders;
  tileLayers: TileLayers;
};

// Returns a TileLayer for each layer in the mapLayers config
const TileLayers = ({ provider, tileLayers }: MapLayersProps) => {
  const selectedProvider = tileLayers[provider];

  return (
    <TileLayer
      key={selectedProvider.name}
      url={selectedProvider.url}
      attribution={selectedProvider.attribution}
    />
  );
};

export default TileLayers;
