import { useEffect, useState } from "react";
import axios from "axios";

export default function LiveSensors() {
  const [data, setData] = useState([]);

  const fetchSensorData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sensors/latest");

      // assume backend returns array of latest readings
      setData(res.data);
    } catch (err) {
      console.log("Error fetching sensor data:", err);
    }
  };

  useEffect(() => {
    // initial fetch
    fetchSensorData();

    // poll every 5 seconds
    const interval = setInterval(() => {
      fetchSensorData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Live Sensor Feed (HTTP)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {data.length === 0 ? (
          <p className="text-gray-400">No data available</p>
        ) : (
          data.map((d, i) => (
            <div key={i} className="bg-gray-800 text-white p-3 rounded">
              <p>Device: {d.deviceId}</p>
              <p>Voltage: {d.voltage}</p>
              <p>Current: {d.current}</p>
              <p className="text-xs text-gray-400">
                Time: {new Date(d.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}