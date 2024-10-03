import { Header, Modal, Notifications, Sidebar } from "../../components";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
