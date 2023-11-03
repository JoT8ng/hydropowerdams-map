import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const NavMobileTop = () => {
  return (
    <div className="md:hidden absolute top-0 bg-brand w-full flex flex-col items-center py-2">
      <Link
        href="https://www.internationalrivers.org/"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={logo} alt="logo" className="inline-flex" width="280" />
      </Link>
    </div>
  );
};
export default NavMobileTop;
