"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { PiSignOutLight } from "react-icons/pi";

export const LogoutButton = () => {
  return (
    <PiSignOutLight
      onClick={() => signOut()}
      className="text-white cursor-pointer"
      size={30}
    />
  );
};
