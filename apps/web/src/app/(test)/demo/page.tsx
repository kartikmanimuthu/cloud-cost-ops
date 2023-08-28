import TimelineGrid from "@/components/ui/timeline-grid";

export default function Demo() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center w-96">
          <h1>Demo</h1>
          <TimelineGrid initialSelectedSlots={[]} />
        </div>
      </div>
    </>
  );
}
