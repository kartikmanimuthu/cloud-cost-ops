import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-background">
        <div className="flex">
          <div className="w-64 fixed left-0 h-screen border-r">
            <Sidebar className=" lg:block" />
          </div>
          <div className="ml-64 flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
