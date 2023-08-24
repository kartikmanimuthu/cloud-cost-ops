import { Sidebar } from "@/components/sidebar";

export type Playlist = (typeof playlists)[number];

export const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-background">
        <div className="flex">
          <div className="w-64 fixed left-0 top-0 h-screen border-r">
            <Sidebar playlists={playlists} className=" lg:block" />
          </div>
          <div className="ml-64 flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
