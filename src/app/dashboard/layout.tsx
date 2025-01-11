import { getServerSession } from "next-auth";
import { Header, Modal, Notifications, Sidebar } from "../../components";
import { redirect } from "next/navigation";
import { authOptions, Provider } from "@/src/auth";
import { Suspense } from "react";
import GlobalLoading from "./loading";
import { Flowbite } from "flowbite-react";
import { customTheme } from "./theme";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  return (
    <Provider>
      <Flowbite theme={{ theme: customTheme }}>
        <div className="bg-slate-100 overflow-y-auto w-screen h-screen antialiased relative text-slate-300 selection:bg-blue-600 selection:text-white">
          <Modal />
          <div className="flex">
            <Sidebar />
            <div className="text-slate-900 w-full relative flex flex-col h-screen overflow-y-auto">
              <Header />
              <div className="flex-grow overflow-y-auto relative overflow-x-hidden">
                <Notifications />
                <Suspense fallback={<GlobalLoading />}>{children}</Suspense>
              </div>
            </div>
          </div>
        </div>
      </Flowbite>
    </Provider>
  );
}
