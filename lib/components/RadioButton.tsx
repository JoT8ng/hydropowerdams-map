import { SearchFacet } from "@/lib/types/data";

type Props = {
  facet: SearchFacet;
  checked: boolean;
  handleSearchFacetChange: (threshold: number, accessor: string[]) => void;
};
const RadioButton = ({ facet, checked, handleSearchFacetChange }: Props) => {
  return (
    <div className="flex gap-1">
      <input
        type="radio"
        id="facet"
        name="facet"
        checked={checked}
        onChange={() =>
          handleSearchFacetChange(facet.threshold, facet.accessor)
        }
      />
      <label>{facet.label}</label>
    </div>
  );
};

export default RadioButton;
