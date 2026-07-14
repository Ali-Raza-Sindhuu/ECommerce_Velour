import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Collection from "./pages/Collection";
import MainLayout from "./components/layout/MainLayout";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetails from "./pages/ProductDetails";
import ProtectedRoute from "./components/protection/ProtectedRoute";
import Dashboard from "./components/user/Dashboard";
import AdminRoute from "./components/protection/AdminRoute";
import { AdminDashboard } from "./components/admin/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shop/:slug" element={<ProductDetails/>} />
          <Route path="/collections" element={<Collection />} />
          <Route path='/contact' element={<Contact/>} />
          <Route path="/blog" element={<Blog/>} /> 
        </Route>

        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
        }/>

        <Route path="/adminDashboard" element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
