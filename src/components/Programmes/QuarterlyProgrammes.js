import React, { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import axiosInstance from "../../api/axiosInstance"; // make sure this points to your configured base

const monthsByQuarter = {
  Q1: ["January", "February", "March"],
  Q2: ["April", "May", "June"],
  Q3: ["July", "August", "September"],
  Q4: ["October", "November", "December"],
};

const getWeekNumber = (date) => {
  const day = new Date(date);
  const firstDay = new Date(day.getFullYear(), day.getMonth(), 1);
  return Math.ceil((day.getDate() + firstDay.getDay()) / 7);
};

export default function QuarterlyProgrammes() {
  const [quarter, setQuarter] = useState("Q1");
  const [allProgrammes, setAllProgrammes] = useState([]);
  const printRef = useRef();

  // Fetch programmes from backend
  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const res = await axiosInstance.get("/programmes");
        const processed = res.data.map((prog) => {
          const date = new Date(prog.date);
          return {
            ...prog,
            month: date.toLocaleString("default", { month: "long" }),
            week: getWeekNumber(date),
          };
        });
        setAllProgrammes(processed);
      } catch (err) {
        console.error("Error fetching programmes:", err.message);
      }
    };

    fetchProgrammes();
  }, []);

  const handleExportAsImage = async () => {
    if (!printRef.current) return;
    try {
      const dataUrl = await toPng(printRef.current, { cacheBust: true });
      download(dataUrl, `${quarter}-programmes.png`);
    } catch (error) {
      console.error("Image export failed:", error);
    }
  };

  return (
    <div className="p-8 bg-[#f2f9ff] min-h-screen">
      <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
        <div className="flex flex-row justify-between items-center gap-4">
          <select
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
            className="p-2 rounded border border-gray-300"
          >
            <option value="Q1">1st Quarter</option>
            <option value="Q2">2nd Quarter</option>
            <option value="Q3">3rd Quarter</option>
            <option value="Q4">4th Quarter</option>
          </select>
          <button
            onClick={handleExportAsImage}
            className="bg-[#1d1c4f] text-white px-4 py-2 rounded hover:bg-[#342a8d]"
          >
            📷 Export as Image
          </button>
        </div>
      </div>

      <div ref={printRef} className="space-y-5">
        <h1 className="text-3xl font-bold text-center flex-grow text-[#1d1c4f]">
          {quarter} Programmes Overview
        </h1>

        {monthsByQuarter[quarter].map((month) => (
          <div key={month}>
            <h2 className="text-2xl font-bold mb-4 text-[#1d1c4f]">{month}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((weekNumber) => {
                const found = allProgrammes.find(
                  (prog) => prog.month === month && prog.week === weekNumber
                );

                return (
                  <div
                    key={weekNumber}
                    className={`rounded-xl shadow-md p-5 text-white ${
                      weekNumber % 2 === 0 ? "bg-[#5c48d3]" : "bg-[#e8e9fc] text-[#1d1c4f]"
                    }`}
                  >
                    <p className="text-sm uppercase tracking-wider mb-1">
                      {month.slice(0, 3)} - Week {weekNumber}
                    </p>

                    {found ? (
                      <>
                        <h3 className="text-lg font-bold mb-1">{found.name}</h3>
                        <p className="text-sm">{found.department}</p>
                        <p className="text-sm">{new Date(found.date).toLocaleDateString()}</p>
                      </>
                    ) : (
                      <p className="font-semibold italic text-sm">
                        No Program (Ministerial)
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
