import React from "react";
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
    path: PATHS.SALES,
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
  }
];

export const Sidebar = () => {
  return (
    <div
      id="menu"
      style={{ width: "270px" }}
      className="bg-paletteColor3 min-h-screen z-10 text-slate-300 left-0 h-screen w-min"
    >
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
  );
};
