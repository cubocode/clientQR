import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Producto from "./components/Producto/Producto";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import Login from "./components/Login/Login";
import CrearUsuario from "./components/Login/CrearUsuario";
import ProtectedRoute from "./components/ProtectedRoute";
import MiPerfil from "./components/Perfil/MiPerfil";
import PerfilPublico from "./components/Perfil/PerfilPublico";
import ProductoPublico from './components/Producto/ProductoPublico';
import { AuthProvider } from "./context/AuthContext";
import {
  Route,
  Routes,
  Navigate,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
      document.body.style.overflow = 'auto';
    }, 1200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <div className="App" style={{ minHeight: '100vh', overflow: 'auto' }}>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route 
              path="/registro" 
              element={
                <ProtectedRoute>
                  <Producto />
                </ProtectedRoute>
              } 
            />
            <Route path="/resume" element={<Resume />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<MiPerfil />} />
            <Route path="/perfil/:userId" element={<PerfilPublico />} />
            <Route path="/crear-usuario" element={<CrearUsuario />} />
            <Route path="/producto/:id" element={<ProductoPublico />} />
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
          <Footer />
        </div>
      ),
    },
  ], {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  });

  return (
    <AuthProvider>
      <Preloader load={load} />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
