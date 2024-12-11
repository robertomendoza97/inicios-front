"use client";

import { SidebarMenuItem } from "./SidebarMenuItem";
import { IoHomeOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import CompanyLogoIcon from "@/src/public/svg/logo";
import Link from "next/link";
import { PATHS } from "@/src/utils";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const menuOptions = [
  { title: "Home", path: PATHS.HOME, icon: <IoHomeOutline /> },
  { title: "Clientes", path: PATHS.CLIENTS.MAIN, icon: <LuUsers /> },
  {
    title: "Productos",
    path: PATHS.PRODUCTS.MAIN,
    icon: <MdOutlineInventory />
  },
  {
    title: "Ventas",
    path: PATHS.SALES.MAIN,
    icon: <FaRegMoneyBillAlt />
  },
  {
    title: "Prestamos",
    path: PATHS.LOANS,
    icon: <FaMoneyBillTransfer />
  },
  {
    title: "Categorias",
    path: PATHS.CATEGORIES.MAIN,
    icon: <BiCategoryAlt />
  },
  {
    title: "Usuarios",
    path: PATHS.USERS.MAIN,
    icon: <FaUsers />
  },
  {
    title: "Pedidos",
    path: PATHS.ORDERS.MAIN,
    icon: <VscGitPullRequestGoToChanges />
  }
];

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      id="menu"
      className={`bg-paletteColor3 min-h-screen z-10 relative text-slate-300 h-screen transition-[width] ${
        open ? "w-[250px]" : "w-0"
      }`}
    >
      <div className="w-full overflow-hidden">
        <div
          id="logo"
          className="my-4 px-6 h-16 flex items-center justify-center"
        >
          <Link href={PATHS.HOME} className="h-full">
            <CompanyLogoIcon color="#FFF" className="h-full" />
          </Link>
        </div>
        <div id="nav" className="px-6 text-xl">
          {menuOptions.map(mo => (
            <SidebarMenuItem {...mo} key={mo.path} />
          ))}
        </div>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="absolute bottom-0 bg-paletteColor4 left-[100%] z-20 cursor-pointer h-14 flex items-center justify-center rounded-tr "
      >
        <IoIosArrowUp className={`${open ? "-rotate-90" : "rotate-90"}`} />
      </div>
    </div>
  );
};
