import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type Props = { isToggled: boolean; onClick: () => void };

const ToggleEye = ({ isToggled, onClick }: Props) => {
  const toggleIcon = isToggled ? (
    <EyeIcon className="w-4 h-4 fill-brand" onClick={onClick} />
  ) : (
    <EyeSlashIcon className="w-4 h-4 fill-gray-400" onClick={onClick} />
  );

  return <button>{toggleIcon}</button>;
};

export default ToggleEye;
