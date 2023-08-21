import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar({ className, playlists }) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Alerts
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Tasks
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Cloud Analyzer
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              Cost Analysis
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Right Sizing
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Security Risks
            </Button>
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
                className="w-full justify-start font-normal"
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                Settings
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
