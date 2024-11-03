// nextauth.d.ts
import { DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  name: string;
  last_name: string;
  phone: string;
  birthdate: string;
  gender: string;
  identityCard: string;
  id: string;
  role: string;
  email: string;
  isActive: boolean;
  token: string;
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
