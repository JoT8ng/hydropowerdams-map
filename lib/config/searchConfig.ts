import { SearchFacet } from "@/lib/types/data";

export const searchFacetsConfig: SearchFacet[] = [
  {
    label: "Dams",
    accessor: ["properties.Dam"],
    threshold: 0.2,
    default: true,
  },
  {
    label: "Country",
    accessor: ["properties.Country"],
    threshold: 0.3,
    default: false,
  },
  {
    label: "Funding",
    accessor: ["properties.Funding"],
    threshold: 0.6,
    default: false,
  },
];
