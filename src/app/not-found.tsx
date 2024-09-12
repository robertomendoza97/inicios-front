import Link from "next/link";
import { Sidebar } from "../components";
import Logo404 from "@/src/public/404.png";
import Image from "next/image";

const NotFound = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />

        <div className="w-full flex justify-center items-center">
          <div className="w-full flex-col flex justify-center items-center gap-5">
            <Image
              src={Logo404}
              alt="404 logo"
              className="w-1/5 filter opacity-30"
            />
            <p className="text-4xl font-bold text-[#b2b2b2]">
              UPS! La pagina no existe :(
            </p>
            <Link
              href="/"
              className="border-none rounded text-xl font-medium text-white bg-paletteColor1 border-2 px-5 py-2"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
