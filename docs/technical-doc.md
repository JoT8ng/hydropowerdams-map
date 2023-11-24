# Technical Documentation
_Last update 31/10/2023_

The Hydropower Dams is an interactive map that leverages the open-source library [leaflet.js](https://leafletjs.com/) and [Mapbox](https://www.mapbox.com/) to display data on dams overlaid with geospatial data on the region. It is a visual tool that allows everyone to explore the impact of dam projects.

## Importing Data
The variety of datasets used in the map means that the method of data hosting and importing changes based on its format. Datasets used on this map can be summarized into three formats:

- `GeoJSON` - a JSON object with coordinates that contains information and research on dams. This is a dynamic layer that will be updated by the International Rivers team.
- Raster layers - a layer that contains tiled imagery, like the biodiversity intactness layer.
- Vector layers - a layer that contains vector objects, like the watershed layer.

The GeoJSON data is stored in a Google sheet. This sheet is shared publicly and accessed with [opensheet](https://github.com/benborgers/opensheet), a free API for parsing a Google Sheet as JSON by Ben Borgers. This JSON is imported as `GeoJSON` layers using the leaflet library. Additionally, you may filter which columns of the Google sheet are visible in the information panel inside `dataConfig.ts`.

Raster and vector layers are imported via leaflet.js as a `TileLayer` component. Raster tiles are accessed through Resource Watch and vector tiles stored and accessed through Mapbox.

### Adding A Data Layer
When adding raster and vector layers, an object should be created inside `mapLayers.ts`. 

`mapLayers` also stores the configuration for GeoJSON layers’ legends, and for new layers, the object should contain a `legend` attribute with keys and values. You should also add or modify functions in `renderGeojsonFunctions` which contains the functions to render the geometry based on the type of legend provided.

## Searching and Layer Filtering on GeoJSONs
The search feature uses the data streamed from Google Sheets and the `fuse.js` library to perform searches with different parameters. This is defined in `searchConfig`.

Where applicable, symbols on layers can be toggled on/off for visibility. This is achieved by storing the filtered legends in React context to create a filtered GeoJSON object and imported into leaflet.

## Frameworks and Libraries
* Leaflet
* React Leaflet
* Mapbox
* [opensheet](https://github.com/benborgers/opensheet)
* Next.js
* Tailwind CSS

## Environment Variables
In your `.env` file, you will need to create the following variables.

`GSHEET_API`: Get a URL for your publicly shared Google sheet using the [opensheet](https://github.com/benborgers/opensheet) library.

`RW_API_KEY` (if used): Retrieve a Resource Watch API key by creating an account on [Resource Watch](https://resourcewatch.org/).

To use Mapbox capabilities, you will need to create an account with Mapbox and generate a token.


## Usage
Install dependencies by running:
```
yarn install
```

To start frontend in development mode:
```
yarn dev
```
