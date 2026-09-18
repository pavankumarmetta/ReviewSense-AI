import {
  LayoutDashboard,
  BrainCircuit,
  House
} from "lucide-react";

import {
  Link
} from "react-router-dom";

function Sidebar() {

  return (

    <div
      className="w-[260px]
      min-h-screen
      bg-white/70
      backdrop-blur-xl
      border-r border-[#eadfd3]
      p-6"
    >

      <h1 className="text-3xl font-bold mb-12">

        ReviewSense-AI

      </h1>

      <div className="flex flex-col gap-4">

        <Link to="/">

          <div
            className="flex items-center gap-3
            p-4 rounded-2xl
            hover:bg-[#f5e7d8]
            transition"
          >

            <House />

            Home

          </div>

        </Link>

        <Link to="/analyzer">

          <div
            className="flex items-center gap-3
            p-4 rounded-2xl
            hover:bg-[#f5e7d8]
            transition"
          >

            <BrainCircuit />

            Analyzer

          </div>

        </Link>

        <Link to="/dashboard">

          <div
            className="flex items-center gap-3
            p-4 rounded-2xl
            bg-[#e8c7ad]"
          >

            <LayoutDashboard />

            Dashboard

          </div>

        </Link>

      </div>

    </div>
  );
}

export default Sidebar;