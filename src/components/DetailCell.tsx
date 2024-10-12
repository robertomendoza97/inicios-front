import { Tooltip } from "flowbite-react";
import { GENERAL_LABELS } from "../utils";
import { GrUpdate } from "react-icons/gr";
import Link from "next/link";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

interface Props {
  id: string | number;
  remove?: boolean;
  update?: boolean;
  details?: boolean;
  deletePath?: string;
  updatePath?: string;
  detailsPath?: string;
}

export const DetailCell = ({
  id,
  remove,
  deletePath = "#",
  details,
  detailsPath = "#",
  update,
  updatePath = "#"
}: Props) => {
  return (
    <div className="flex justify-center gap-5 h-full relative">
      {details && (
        <Tooltip content={GENERAL_LABELS.ACTIONS.SEE_DETAILS}>
          <Link href={`${detailsPath}${id}`}>
            <MdOutlineRemoveRedEye
              onClick={() => console.log(id)}
              size={15}
              className="cursor-pointer hover:scale-125 transition-transform"
            />
          </Link>
        </Tooltip>
      )}
      {update && (
        <Tooltip content={GENERAL_LABELS.ACTIONS.UPDATE}>
          <Link href={`${updatePath}${id}`}>
            <GrUpdate
              size={15}
              className="cursor-pointer hover:scale-125 transition-transform"
            />
          </Link>
        </Tooltip>
      )}
      {remove && (
        <Tooltip content={GENERAL_LABELS.ACTIONS.DELETE}>
          <Link href={`${deletePath}${id}`}>
            <BsTrash
              size={15}
              className="cursor-pointer hover:scale-125 transition-transform"
            />
          </Link>
        </Tooltip>
      )}
    </div>
  );
};
