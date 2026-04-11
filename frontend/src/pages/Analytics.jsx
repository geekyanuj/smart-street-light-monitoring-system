import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function Analytics() {
  const [data, setData] = useState([]);

  const fetchEnergyData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/analytics/energy");

      // keep last 20 points
      setData(res.data.slice(-20));
    } catch (err) {
      console.log("Error fetching energy data:", err);
    }
  };

  useEffect(() => {
    // initial load
    fetchEnergyData();

    // poll every 5 seconds
    const interval = setInterval(() => {
      fetchEnergyData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Energy Usage (Live HTTP)</h2>

      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="power" stroke="#22c55e" />
      </LineChart>
    </div>
  );
}