import React from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { IoHomeOutline } from "react-icons/io5";
import CompanyLogoIcon from "@/src/public/svg/logo";
import { LuUsers } from "react-icons/lu";
import { IoIosPhonePortrait } from "react-icons/io";
import Link from "next/link";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";

const menuOptions = [
  { title: "Home", path: "/dashboard/main", icon: <IoHomeOutline /> },
  { title: "Clientes", path: "/dashboard/clients", icon: <LuUsers /> },
  {
    title: "Productos",
    path: "/dashboard/products",
    icon: <IoIosPhonePortrait />
  },
  {
    title: "Ventas",
    path: "/dashboard/sales",
    icon: <FaRegMoneyBillAlt />
  },
  {
    title: "Prestamos",
    path: "/dashboard/loans",
    icon: <FaMoneyBillTransfer />
  },
  {
    title: "Inventario",
    path: "/dashboard/inventory",
    icon: <MdOutlineInventory />
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
        <Link href="/dashboard/main" className="h-full">
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
