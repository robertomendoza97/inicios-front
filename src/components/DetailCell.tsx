import { Tooltip } from "flowbite-react";
import { GrUpdate } from "react-icons/gr";
import Link from "next/link";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { ReactNode } from "react";
import { RiFolderReceivedLine } from "react-icons/ri";

interface OptionsKeys {
  details: ReactNode;
  update: ReactNode;
  delete: ReactNode;
  receive: ReactNode;
}

interface Options {
  path: string;
  icon: keyof OptionsKeys;
  tooltip: string;
  withId?: boolean;
  disabled?: boolean;
}

interface Props {
  id: string | number;
  options: Options[];
}

const optionsIcons: OptionsKeys = {
  details: (
    <MdOutlineRemoveRedEye
      size={15}
      className="cursor-pointer hover:scale-125 transition-transform"
    />
  ),
  update: (
    <GrUpdate
      size={15}
      className="cursor-pointer hover:scale-125 transition-transform"
    />
  ),
  delete: (
    <BsTrash
      size={15}
      className="cursor-pointer hover:scale-125 transition-transform"
    />
  ),
  receive: (
    <RiFolderReceivedLine
      size={15}
      className="cursor-pointer hover:scale-125 transition-transform"
    />
  )
};

export const DetailCell = ({ id, options }: Props) => {
  return (
    <div className="flex justify-center gap-5 h-full relative">
      {options.map(option =>
        option.disabled ? (
          <p className="opacity-60 cursor-not-allowed" key={option.path}>
            {optionsIcons[option.icon]}
          </p>
        ) : (
          <Tooltip key={option.path} content={option.tooltip}>
            <Link href={`${option.path}${id}`}>
              {optionsIcons[option.icon]}
            </Link>
          </Tooltip>
        )
      )}
    </div>
  );
};
