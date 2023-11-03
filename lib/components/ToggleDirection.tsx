import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

type Props = { isToggled: boolean; onClick: () => void; classes?: string };

const ToggleDirection = ({ isToggled, onClick, classes }: Props) => {
  const toggleIconClasses = `w-6 h-6 fill-black cursor-pointer ${classes}`;
  const toggleIcon = isToggled ? (
    <ChevronUpIcon className={toggleIconClasses} onClick={onClick} />
  ) : (
    <ChevronDownIcon className={toggleIconClasses} onClick={onClick} />
  );
  return <button>{toggleIcon}</button>;
};

export default ToggleDirection;
