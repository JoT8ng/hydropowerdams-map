import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import About from "@/lib/components/About";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { DataContext } from "@/lib/context/DataContext";

const Info = () => {
  const { setVisibleMobilePane } = useContext(DataContext);

  return (
    <div className="bg-brand text-white p-4 rounded-sm flex flex-col gap-2">
      <Link
        href="https://www.internationalrivers.org/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={logo}
          alt="logo"
          className="hidden md:inline-flex"
          width="300"
        />
      </Link>
      <h1>Hydropower Dams in Sub-saharan Africa</h1>
      {setVisibleMobilePane && (
        <XMarkIcon
          className="absolute right-2 md:hidden w-6 h-6 cursor-pointer"
          onClick={() => setVisibleMobilePane(null)}
        />
      )}
      <div className="border-t-2 border-white pt-4">
        <About />
      </div>
      <p>
        For questions or any suggestions contact:
        <br />
        <a href="mailto:contact@internationalrivers.org" className="underline">
          contact@internationalrivers.org
        </a>
      </p>
      <Link
        href="https://github.com/IntlRivers/hydropowerdams-map"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        <p>How this map was made</p>
      </Link>
    </div>
  );
};

export default Info;
