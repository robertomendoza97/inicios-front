"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
  path: string;
  icon: JSX.Element;
  title: string;
}

export const SidebarMenuItem = ({ path, title, icon }: props) => {
  const currentPath = usePathname();

  return (
    <Link
      href={`${path}`}
      className={`px-2 inline-flex space-x-2 items-center py-3 font-medium hover:bg-white/5 transition ease-linear duration-150  w-full
         ${path === currentPath ? "border-b pl-5 transition-all" : ""}
        `}
    >
      <div>{icon}</div>
      <div className="flex flex-col">
        <span className="text-base leading-5 text-white">{title}</span>
      </div>
    </Link>
  );
};
