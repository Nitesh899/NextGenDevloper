import {
  Outlet,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function MainLayout() {
  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary">

      <Navbar />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}