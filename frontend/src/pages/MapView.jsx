import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const devices = [
  { id: "SL_001", lat: 23.78, lng: 86.43, status: "ON" },
  { id: "SL_002", lat: 23.79, lng: 86.44, status: "OFF" },
];

export default function MapView() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Street Light Map</h2>

      <MapContainer center={[23.78, 86.43]} zoom={13} className="h-[500px] mt-4">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {devices.map((d) => (
          <Marker key={d.id} position={[d.lat, d.lng]}>
            <Popup>
              {d.id} - {d.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}