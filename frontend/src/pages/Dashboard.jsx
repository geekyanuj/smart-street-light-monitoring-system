import { useEffect, useState } from "react";
import AlertPanel from "../components/AlertPanel";
import DeviceList from "../components/DeviceList";
import { getDevices } from "../api/deviceApi";

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const res = await getDevices();
      setDevices(res.data);
    } catch (err) {
      setDevices([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 5000);
    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => fetchDevices();

  const onCount = (status) => devices.filter((d) => d.status === status).length;

  return (
    <div className="space-y-6">
      <AlertPanel />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 text-white p-6 rounded flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-blue-400">{devices.length}</div>
          <div className="text-lg mt-2">Total Devices</div>
        </div>
        <div className="bg-gray-900 text-white p-6 rounded flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-green-400">{onCount("ON")}</div>
          <div className="text-lg mt-2">Lights ON</div>
        </div>
        <div className="bg-gray-900 text-white p-6 rounded flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-yellow-400">{onCount("OFF")}</div>
          <div className="text-lg mt-2">Lights OFF</div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4 text-white">Device Status Overview</h3>
        {loading ? (
          <div className="text-gray-400">Loading devices...</div>
        ) : (
          <DeviceList devices={devices} refresh={onRefresh} />
        )}
      </div>
    </div>
  );
}