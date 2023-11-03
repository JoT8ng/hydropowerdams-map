import ToggleDirection from "@/lib/components/ToggleDirection";
import { useState } from "react";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <>
      <div className="flex justify-between">
        <h3>About</h3>
        <ToggleDirection
          isToggled={!isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          classes="fill-white hidden md:flex"
        />
      </div>
      {isExpanded && (
        <p>
          The Sub-saharan African Hydropower Dams Map is an ongoing project
          mapping prospective and existing dams across the region. It details
          financial, environmental and social consequences of the projects.
        </p>
      )}
    </>
  );
};

export default About;
