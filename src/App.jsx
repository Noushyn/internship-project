import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute';
import Users from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import ManageProductsPage from "./pages/ManageProducts"
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<PrivateRoute>  <Dashboard /> </PrivateRoute>  } />
      <Route path="/users" element={<Users />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path="/manage-products" element={<ManageProductsPage />} />
    </Routes>
    </>

  )
}

export default App;
