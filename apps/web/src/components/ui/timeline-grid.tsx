"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const TimelineGrid = ({ initialSelectedSlots = [] }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlots = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const [selectedSlots, setSelectedSlots] = useState([]);

  const slotComparator = (a, b) => {
    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const [dayA, hourA] = a.split("-");
    const [dayB, hourB] = b.split("-");

    if (dayOrder.indexOf(dayA) < dayOrder.indexOf(dayB)) return -1;
    if (dayOrder.indexOf(dayA) > dayOrder.indexOf(dayB)) return 1;

    return parseInt(hourA, 10) - parseInt(hourB, 10);
  };

  useEffect(() => {
    setSelectedSlots([...initialSelectedSlots].sort(slotComparator));
  }, [initialSelectedSlots]);

  const toggleSelected = (day, hour) => {
    const key = `${day}-${hour}`;
    if (selectedSlots.includes(key)) {
      setSelectedSlots((prev) => {
        const updatedSlots = prev.filter((slot) => slot !== key);
        return updatedSlots.sort(slotComparator);
      });
    } else {
      setSelectedSlots((prev) => {
        const updatedSlots = [...prev, key];
        return updatedSlots.sort(slotComparator);
      });
    }
  };

  const handleSubmit = () => {
    console.log("Selected Time Slots:", selectedSlots);
  };

  return (
    <div className="bg-card text-card-foreground border border-border shadow-lg rounded-2xl overflow-hidden p-4">
      <div className="mb-4 text-lg font-semibold">Schedule Grid</div>
      <table className="w-full">
        <thead>
          <tr>
            <th
              className="w-8 h-8 text-center p-1 shadow-sm"
              key="header-daytime"
            >
              <button className="w-full h-full bg-gray-200 hover:bg-gray-300 rounded-lg">
                Day/Time
              </button>
            </th>
            {days.map((day) => (
              <th
                className="w-8 h-8 text-center p-1 shadow-sm"
                key={`header-${day}`}
              >
                <button className="w-full h-full bg-gray-200 hover:bg-gray-300 rounded-lg">
                  {day}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((hour) => (
            <tr key={hour}>
              <td className="w-8 h-8 text-center p-1 font-semibold  shadow-sm">
                <button className="w-full h-full bg-gray-200 hover:bg-gray-300 rounded-lg">
                  {hour}
                </button>
              </td>
              {days.map((day) => (
                <td key={day} className="w-8 h-8 text-center p-1  shadow-sm">
                  <button
                    className={`w-full h-full rounded-lg ${
                      selectedSlots.includes(`${day}-${hour}`)
                        ? "bg-red-400"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => toggleSelected(day, hour)}
                  ></button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default TimelineGrid;
