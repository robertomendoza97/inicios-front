import Link from "next/link";
import { FaRegEye } from "react-icons/fa";

interface props {
  id: number;
  name: string;
  email: string;
  phone: string;
  state: string;
  details: string;
}

const ClientRow = ({ details, email, id, name, phone, state }: props) => {
  return (
    <tr>
      <td className="p-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded-full"
              src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
              width="40"
              height="40"
              alt="Alex Shatov"
            />
          </div>
          <div className="font-medium text-gray-800">{name}</div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{email}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium text-green-500">{phone}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-lg text-center">{state}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-lg text-center">
          <Link href={`/dashboard/client/${id}`}>
            <FaRegEye style={{ margin: "auto", cursor: "pointer" }} />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ClientRow;
