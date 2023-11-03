import {
  BanknotesIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  GlobeEuropeAfricaIcon,
  HandRaisedIcon,
  InformationCircleIcon,
  MapIcon,
  MapPinIcon,
  ScaleIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/lib/context/DataContext";
import { DataPointVisibleProperties } from "@/lib/config/dataConfig";
import { XMarkIcon } from "@heroicons/react/24/outline";

type attributeProps = {
  children: string | number;
  name: string;
};

type propertyProps = {
  children: string | number;
};

const ICON_CLASSNAMES = "w-5 h-5 fill-brand";
// Icons for data point properties
const DATAPOINT_PROPERTIES_ICONS: Record<string, JSX.Element> = {
  Country: <MapIcon className={ICON_CLASSNAMES} />,
  Dam: <InformationCircleIcon className={ICON_CLASSNAMES} />,
  "Dam Capacity": <FunnelIcon className={ICON_CLASSNAMES} />,
  Coordinates: <MapPinIcon className={ICON_CLASSNAMES} />,
  "Dam Status": <ExclamationTriangleIcon className={ICON_CLASSNAMES} />,
  Cost: <CurrencyDollarIcon className={ICON_CLASSNAMES} />,
  Funding: <BanknotesIcon className={ICON_CLASSNAMES} />,
  Construction: <WrenchScrewdriverIcon className={ICON_CLASSNAMES} />,
  "Target Market": <UsersIcon className={ICON_CLASSNAMES} />,
  "Feasibility stage/ESIA": <UsersIcon className={ICON_CLASSNAMES} />,
  "Political Issues": <BuildingLibraryIcon className={ICON_CLASSNAMES} />,
  "Environmental Issues": <GlobeEuropeAfricaIcon className={ICON_CLASSNAMES} />,
  "Social Issues": <ScaleIcon className={ICON_CLASSNAMES} />,
  "NGOs Organizing": <HandRaisedIcon className={ICON_CLASSNAMES} />,
};

const Hydrodams = () => {
  const { dataPoint, setVisibleMobilePane } = useContext(DataContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (dataPoint) {
      setIsVisible(true);
      setVisibleMobilePane("hydrodams");
    }
  }, [dataPoint, setVisibleMobilePane]);

  const Attribute = ({ name, children }: attributeProps) => {
    return (
      <div className="text-semibold flex gap-2 items-center text-brand">
        {DATAPOINT_PROPERTIES_ICONS[name]}
        {children}
      </div>
    );
  };
  const Property = ({ children }: propertyProps) => {
    return <div className="text-sm text-gray-900">{children}</div>;
  };

  if (isVisible && dataPoint) {
    return (
      <div className="bg-white w-full md:w-80 h-auto p-4 rounded-sm overflow-y-scroll">
        <div className="border-y-2 border-brand py-4 flex items-center justify-between">
          <h2 className="text-brand">{dataPoint.properties["Dam"]}</h2>
          <XMarkIcon
            className="w-6 h-6 stroke-brand cursor-pointer"
            onClick={() => {
              setVisibleMobilePane(null);
              setIsVisible(false);
            }}
          />
        </div>
        {Object.entries(dataPoint.properties).map(([name, value], index) => {
          if (
            DataPointVisibleProperties.find((attribute) => attribute === name)
          )
            return (
              <div className="flex flex-col my-4" key={index}>
                <Attribute name={name}>{name}</Attribute>
                <Property>{value}</Property>
              </div>
            );
        })}
      </div>
    );
  } else return null;
};

export default Hydrodams;
