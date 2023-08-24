import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import PhotoSizeSelectSmallOutlinedIcon from "@mui/icons-material/PhotoSizeSelectSmallOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";

export function Sidebar({ className, playlists }) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4 flex flex-col justify-between">
        <div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Overview
            </h2>
            <div className="space-y-1">
              <Button variant="secondary" className="w-full justify-start">
                <DashboardOutlinedIcon sx={{ paddingRight: "8px" }} />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <NotificationImportantOutlinedIcon
                  sx={{ paddingRight: "8px" }}
                />
                Alerts
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <TaskOutlinedIcon sx={{ paddingRight: "8px" }} />
                Tasks
              </Button>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {/* <CloudDoneOutlinedIcon sx={{ marginRight: "8px" }} /> */}
              Cloud Analyzer
            </h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <RequestQuoteOutlinedIcon sx={{ paddingRight: "8px" }} />
                Cost Analysis
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <PhotoSizeSelectSmallOutlinedIcon
                  sx={{ paddingRight: "8px" }}
                />
                Right Sizing
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <PrivacyTipOutlinedIcon sx={{ paddingRight: "8px" }} />
                Security Risks
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
                className="w-full justify-start font-normal"
              >
                <AccountCircleOutlinedIcon sx={{ paddingRight: "8px" }} />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                <ManageAccountsOutlinedIcon sx={{ paddingRight: "8px" }} />
                Settings
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
