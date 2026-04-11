import { useEffect, useState } from "react";

export default function Navbar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format parts separately (more control)
  const day = now.toLocaleDateString("en-IN", { weekday: "short" }); // Sat
  const date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const hours = now.getHours().toString().padStart(2, "0");

  const minutes = now.getMinutes().toString().padStart(2, "0");

  const seconds = now.getSeconds().toString().padStart(2, "0");

  const ampm = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    hour12: true,
  }).split(" ")[1];

  return (
    <header className="sticky top-0 z-20 w-full bg-gray-800 shadow flex items-center justify-between h-16 px-6">
      
      {/* Title */}
      <h2 className="text-2xl font-bold text-white tracking-wide">
        Smart Street Light Monitoring System
      </h2>

      {/* Professional Clock */}
      <div className="flex items-center gap-3 text-white">
        

        {/* Time Block */}
        <div className="flex flex-col items-end leading-tight">
          
          {/* Date Line */}
          <span className="text-xs text-gray-400 tracking-wide">
            {day}, {date}
          </span>

          {/* Time Line */}
          <span className="font-mono text-lg font-semibold tracking-wider">
            {hours}
            <span className="inline-block w-2 text-center">:</span>
            {minutes}
            <span className="inline-block w-2 text-center">:</span>
            {seconds}
            <span className="ml-2 text-sm text-gray-300">{ampm.toUpperCase()}</span>
          </span>

        </div>
      </div>
    </header>
  );
}