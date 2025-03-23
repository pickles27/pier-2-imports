import Link from "next/link";
import { FaBox } from "react-icons/fa6";

export const Header = () => (
  <header className="fixed w-full py-4 px-4 sm:px-20 bg-inherit drop-shadow-xs">
    <Link
      className="flex justify-center sm:justify-start items-center gap-2"
      href="/"
    >
      <FaBox size={32} />
      <h1 className="text-2xl">OrderTrack</h1>
    </Link>
  </header>
);
