import { getServerSession } from "next-auth";
import { Header, Modal, Notifications, Sidebar } from "../../components";
import { redirect } from "next/navigation";
import { authOptions, Provider } from "@/src/auth";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  return (
    <Provider>
      <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased relative text-slate-300 selection:bg-blue-600 selection:text-white">
        <Modal />
        <div className="flex">
          <Sidebar />
          <div className="text-slate-900 w-full relative flex flex-col h-screen overflow-y-scroll">
            <Header />
            <div className="flex-grow overflow-y-scroll relative overflow-x-hidden">
              <Notifications />
              {children}
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}
