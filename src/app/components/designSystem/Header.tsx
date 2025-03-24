import Link from "next/link";
import { IconType } from "react-icons";

export type HeaderProps = {
  Icon: IconType;
  label: string;
  url: string;
};

export const Header = ({ Icon, label, url }: HeaderProps) => (
  <header className="fixed w-full py-4 px-4 sm:px-20 bg-inherit drop-shadow-xs">
    <Link
      className="flex justify-center sm:justify-start items-center gap-2"
      href={url}
    >
      <Icon size={32} />
      <h1 className="text-2xl font-bold">{label}</h1>
    </Link>
  </header>
);
