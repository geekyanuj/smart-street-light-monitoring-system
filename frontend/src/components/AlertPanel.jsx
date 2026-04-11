import { useEffect, useState } from "react";
import axios from "axios";

export default function AlertPanel() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alerts/latest");
      setAlerts(res.data);
    } catch (err) {
      console.log("Error fetching alerts:", err);
    }
  };

  useEffect(() => {
    // initial fetch
    fetchAlerts();

    // poll every 5 seconds
    const interval = setInterval(() => {
      fetchAlerts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-900 p-4 text-white rounded">
      <h2 className="font-bold text-lg">⚠ Fault Alerts</h2>

      {alerts.length === 0 ? (
        <p className="text-gray-300 mt-2">No alerts</p>
      ) : (
        <div className="mt-2 space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className="bg-red-800 p-2 rounded">
              <p className="font-semibold">{a.deviceId}</p>
              <p>{a.message}</p>
              <p className="text-xs text-gray-300">
                {new Date(a.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}