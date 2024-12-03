"use client";
import { Calendar as CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const timeframeOptions = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
  "Last Month",
  "Custom Range",
];

const Calendar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [internalDateRange, setInternalDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [selectedTimeframe, setSelectedTimeframe] =
    useState<string>("Custom Range");

  // Dark mode toggle effect
  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDarkMode) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleDateRangeChange = (item: RangeKeyDict) => {
    const updatedDateRange = [item.selection];
    setInternalDateRange(updatedDateRange);
    setSelectedTimeframe("Custom Range");
  };

  const handleTimeframeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTimeframe = e.target.value;
    setSelectedTimeframe(selectedTimeframe);

    updateDateRangeByTimeframe(selectedTimeframe);
  };

  const updateDateRangeByTimeframe = (timeframe: string) => {
    const today = new Date();

    const dateRanges = {
      Today: {
        startDate: today,
        endDate: today,
      },
      Yesterday: {
        startDate: new Date(today.getTime() - 86400000),
        endDate: new Date(today.getTime() - 86400000),
      },
      "Last 7 Days": {
        startDate: new Date(today.getTime() - 6 * 86400000),
        endDate: today,
      },
      "Last 30 Days": {
        startDate: new Date(today.getTime() - 29 * 86400000),
        endDate: today,
      },
      "This Month": {
        startDate: new Date(today.getFullYear(), today.getMonth(), 1),
        endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
      },
      "Last Month": {
        startDate: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        endDate: new Date(today.getFullYear(), today.getMonth(), 0),
      },
    };

    setInternalDateRange([
      {
        startDate: dateRanges[timeframe as keyof typeof dateRanges].startDate,
        endDate: dateRanges[timeframe as keyof typeof dateRanges].endDate,
        key: "selection",
      },
    ]);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    // Update local storage
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    // Toggle dark class on html element
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const dateRangeString = `${internalDateRange[0].startDate?.toLocaleDateString()} - ${internalDateRange[0].endDate?.toLocaleDateString()}`;

  return (
    <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      {/* Date Range Display */}
      <div className="flex justify-end mb-4 space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
          </div>
          <input
            type="text"
            value={dateRangeString}
            readOnly
            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
        <select
          value={selectedTimeframe}
          onChange={handleTimeframeChange}
          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {timeframeOptions.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-white dark:bg-gray-800 dark:text-gray-200"
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Picker */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-md">
        <DateRangePicker
          direction="horizontal"
          months={2}
          editableDateInputs={true}
          onChange={handleDateRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={internalDateRange}
          date={new Date()}
          className="react-date-range"
        />
      </div>

      {/* Apply/Cancel Buttons */}
      {selectedTimeframe === "Custom Range" && (
        <div className="flex justify-end mt-4 space-x-2">
          <button className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-500">
            Cancel
          </button>
          <button className="bg-blue-500 dark:bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-600 dark:hover:bg-blue-700">
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
