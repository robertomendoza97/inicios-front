import { PATHS } from "@/src/utils";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  redirect(PATHS.HOME);
};

export default DashboardPage;
