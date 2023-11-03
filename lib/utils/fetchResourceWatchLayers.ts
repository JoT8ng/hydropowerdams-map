import { mapTileLayers } from "@/lib/config/mapLayers";
import { TileLayers } from "@/lib/types/map";
import { reverseObj } from "@/lib/utils/reverseObj";

const fetchResourceWatchLayers = async (
  setDynamicTiles: (tiles: TileLayers) => void
) => {
  const resourceWatchIds = [
    "0e565ddf-74fd-4f90-a6b8-c89d747a89ab", // Biodiversity intactness
    "d42f17fe-ab9a-465a-ab0b-9001d63c2206", // Night lights 2012 - 2016
  ];
  const ids = Object.values(resourceWatchIds);

  const requestUrls = ids.map((id) => {
    return `https://api.resourcewatch.org/v1/dataset/${id}/?includes=layer,metadata`;
  });

  const responses = await Promise.all(
    requestUrls.map(async (url) => {
      const res = await fetch(url);

      return await res.json();
    })
  );

  const allTileLayers = responses.reduce(
    (acc, layer) => {
      acc[layer.data.attributes.slug] = {
        name: layer.data.attributes.layer[0].attributes.name,
        displayName: layer.data.attributes.metadata[0].attributes.name,
        url: `https://api.resourcewatch.org/v1/layer/${layer.data.attributes.layer[0].id}/tile/gee/{z}/{x}/{y}`,
        attribution: `<a href="${layer.data.attributes.metadata[0].attributes.info.data_download_original_link}">${layer.data.attributes.metadata[0].attributes.info.technical_title}</a>`,
        information: layer.data.attributes.layer[0].attributes.description,
        toggleable: true,
        legend: {
          type: layer.data.attributes.layer[0].attributes.legendConfig.type,
          items: layer.data.attributes.layer[0].attributes.legendConfig.items,
        },
      };

      return acc;
    },
    { ...mapTileLayers }
  );

  setDynamicTiles(reverseObj(allTileLayers));
};

export default fetchResourceWatchLayers;
