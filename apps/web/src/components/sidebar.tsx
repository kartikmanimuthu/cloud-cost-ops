import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";

export function Sidebar({ className }) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4 flex flex-col justify-between">
        <div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Overview
            </h2>
            <div className="space-y-1">
              <Button
                variant="secondary"
                className="w-full justify-start font-normal space-x-1"
              >
                <Icons.dashboard className="w-6 h-6" />
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start font-normal space-x-1"
              >
                <Icons.alert className="w-6 h-6" />
                <Link href="/alert">Alerts</Link>
              </Button>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Cloud Analyzer
            </h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start font-normal space-x-1"
              >
                <Icons.costExplorer className="w-6 h-6" />
                <Link href="/dashboard">Cost Insights</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start font-normal space-x-1"
              >
                <Icons.rightSizing className="w-6 h-6"></Icons.rightSizing>
                <Link href="/right-sizing">Right Sizing</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start font-normal space-x-1"
              >
                <Icons.schedular className="w-6 h-6" />
                <Link href="/auto-schedular">Auto Schedular</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Account
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              <Button
                variant="ghost"
                className="w-full justify-start font-normal space-x-1"
              >
                <Icons.integration className="w-6 h-6" />
                <Link href="/integration">Integration</Link>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start font-normal space-x-1"
              >
                <Icons.user className="w-6 h-6" />
                <Link href="/profile">Profile</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start font-normal space-x-1"
              >
                <Icons.setting className="w-6 h-6" />
                <Link href="/setting">Settings</Link>
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
