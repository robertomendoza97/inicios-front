import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { LogoutButton } from "../LogoutButton";
import { TfiReload } from "react-icons/tfi";
import { ReloadButton } from "./ReloadButton";

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full bg-secondary1 px-7 py-4 flex justify-between shadow-m">
      <div>navegacion</div>

      <div className="flex h-full items-center gap-5">
        <ReloadButton />
        <p className="bg-paletteColor5 text-paletteColor3 rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {session?.user?.name?.charAt(0).toUpperCase()}
        </p>
        <LogoutButton />
      </div>
    </header>
  );
};
