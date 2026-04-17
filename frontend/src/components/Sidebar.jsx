import { NavLink, useNavigate } from "react-router-dom";
import logonew from "../assets/logo-new.jpg";

export default function Sidebar() {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("auth");
		localStorage.removeItem("user");
		navigate("/login");
	};
	return (
		<aside className="h-screen w-60 bg-gray-900 text-white flex flex-col shadow-lg">
			<div className="p-6 text-2xl font-bold tracking-wide border-b border-gray-800">
				<img src={logonew} alt="Logo" className="h-10 w-100 p-10"/>
			</div>
			<nav className="flex-1 p-4 space-y-2">
				<NavLink to="/" className={({isActive}) => isActive ? "block p-3 rounded bg-blue-700" : "block p-3 rounded hover:bg-gray-800"} end>
					Dashboard
				</NavLink>
				<NavLink to="/map" className={({isActive}) => isActive ? "block p-3 rounded bg-blue-700" : "block p-3 rounded hover:bg-gray-800"}>
					Map View
				</NavLink>
				<NavLink to="/analytics" className={({isActive}) => isActive ? "block p-3 rounded bg-blue-700" : "block p-3 rounded hover:bg-gray-800"}>
					Analytics
				</NavLink>
				<NavLink to="/live" className={({isActive}) => isActive ? "block p-3 rounded bg-blue-700" : "block p-3 rounded hover:bg-gray-800"}>
					Live Sensors
				</NavLink>
			</nav>
			<button onClick={handleLogout} className="m-4 p-3 bg-red-600 rounded hover:bg-red-700 transition">Logout</button>
		</aside>
	);
}
