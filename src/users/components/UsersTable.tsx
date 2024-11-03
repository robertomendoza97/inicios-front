"use client";

import React from "react";
import { IUserFromAPI } from "../interfaces/all-users.interface";
import { Column, CustomTable } from "@/src/components";
import { formatUsersForTable } from "../utils/formatUsers";
import { userTableActions } from "../utils/userActions";

interface Props {
  users: IUserFromAPI[];
}

export const UsersTable = ({ users }: Props) => {
  const columns: Column[] = [
    {
      key: "name",
      name: "nombre",
      index: true
    },
    {
      key: "last_name",
      name: "apellido",
      index: true
    },
    {
      key: "phone",
      name: "nro telefono",
      index: true
    },
    {
      key: "identityCard",
      name: "cedula",
      index: true
    },
    {
      key: "role",
      name: "perfil"
    },
    {
      key: "actions",
      name: "acciones",
      component: userTableActions
    }
  ];

  return (
    <CustomTable
      column={columns}
      data={formatUsersForTable(users)}
      path=""
      title="Usuarios"
    />
  );
};
