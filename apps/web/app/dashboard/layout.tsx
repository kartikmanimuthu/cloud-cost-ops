import { Sidebar } from "@/components/sidebar";
import { playlists } from "./data/playlists";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className=" lg:block" />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
