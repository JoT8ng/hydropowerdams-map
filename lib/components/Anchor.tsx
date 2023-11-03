import Link from "next/link";

type Props = {
  children: string;
  href: string;
};

const Anchor = ({ children, href }: Props) => {
  return <Link href={href}>{children}</Link>;
};

export default Anchor;
