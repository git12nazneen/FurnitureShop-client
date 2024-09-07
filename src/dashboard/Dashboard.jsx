
import { Outlet } from "react-router-dom";

import useAdmin from "../hooks/useAdmin"; // Import your custom hook
import DashSidebar from "./DashSidebar";

const Dashboard = () => {
  const [isAdmin] = useAdmin(); // Get the admin status from your hook

  return (
    <div className="flex">
      <DashSidebar isAdmin={isAdmin} />
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
