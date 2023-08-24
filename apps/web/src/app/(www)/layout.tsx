import Image from "next/image";

import { MainNav } from "@/components/main-nav";
import TeamSwitcher from "@/components/team-switcher";
import { UserNav } from "@/components/user-nav";
import { Sidebar } from "@/components/sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            {/* <MainNav className="mx-6" /> */}
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="bg-background">
            <div className="flex">
              <div className="w-64 fixed left-0 h-screen border-r">
                <Sidebar className="lg:block" />
              </div>
              <div className="ml-64 flex-1">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
