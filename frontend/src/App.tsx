import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// =====================================================
// PUBLIC / MAIN PAGES
// =====================================================

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";

// =====================================================
// AUTHENTICATION PAGES
// =====================================================

import Login from "./pages/Login";
import Register from "./pages/Register";
import PhoneLogin from "./pages/PhoneLogin";
import VerifyOTP from "./pages/VerifyOTP";

// =====================================================
// ACCOUNT
// =====================================================

import Profile from "./pages/Profile";


export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC AUTHENTICATION LAYOUT
            Navbar + Footer
            ================================================= */}

        <Route element={<MainLayout />}>

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Register */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* Phone Login */}
          <Route
            path="/phone-login"
            element={<PhoneLogin />}
          />

          {/* OTP Verification */}
          <Route
            path="/verify-otp"
            element={<VerifyOTP />}
          />

        </Route>


        {/* =================================================
            PROTECTED WEBSITE
            Login required
            Navbar + Footer
            ================================================= */}

        <Route element={<ProtectedRoute />}>

          <Route element={<MainLayout />}>

            {/* Home */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* About */}
            <Route
              path="/about"
              element={<About />}
            />

            {/* Services */}
            <Route
              path="/services"
              element={<Services />}
            />

            {/* Service Detail */}
            <Route
              path="/services/:slug"
              element={<ServiceDetail />}
            />

            {/* Projects */}
            <Route
              path="/projects"
              element={<Projects />}
            />

            {/* Project Detail */}
            <Route
              path="/projects/:slug"
              element={<ProjectDetail />}
            />

            {/* Blog */}
            <Route
              path="/blog"
              element={<Blog />}
            />

            {/* Blog Detail */}
            <Route
              path="/blog/:slug"
              element={<BlogDetail />}
            />

            {/* Careers */}
            <Route
              path="/careers"
              element={<Careers />}
            />

            {/* Job Detail */}
            <Route
              path="/careers/:slug"
              element={<JobDetail />}
            />

            {/* Testimonials */}
            <Route
              path="/testimonials"
              element={<Testimonials />}
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* Request Quote */}
            <Route
              path="/quote"
              element={<Quote />}
            />

            {/* =================================================
                PROFILE
                Protected + Navbar + Footer
                ================================================= */}

            <Route
              path="/profile"
              element={<Profile />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>
  );
}