"use client";

import LineChartTabs from "./components/linecharts";
import Assets from "./components/assets";
import { DummyForm } from "./components/dummyForm";

export default function Page() {
  return (
    <>
      <div className="col-span-3 lg:col-span-4 ">
        <div className="h-full px-4 py-6 lg:px-8">
          <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 pt-6 gap-8">
            <div className="grid gap-y-4">
              <LineChartTabs />
              <Assets />
            </div>
            <div>
              <DummyForm />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
