# Hydropower Dams Map by International Rivers

[Live version](https://hydropowerdamsmap.org) | [International Rivers NGO](https://www.internationalrivers.org/)

## About

The Sub-saharan African Hydropower Dams Map is an ongoing project mapping prospective and existing dams across the region. It details financial, environmental and social consequences of the projects.

## How it was built

This interactive map was built using [Nextjs](https://nextjs.org/), [React](https://react.dev/), and [leaflet](https://leafletjs.com/).

Research data on hydropower dams was conducted by [International Rivers](https://www.internationalrivers.org/).

Data is streamed from a Google sheet using [Opensheet API](https://github.com/benborgers/opensheet).

The project uses data from the [Resource Watch API](https://api.resourcewatch.org/) for several layers of information. See attribution credits in the bottom right of the active map layer.

## How to run

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### More

For more information, please contact [International Rivers](https://www.internationalrivers.org/).
