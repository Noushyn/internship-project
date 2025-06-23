import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute';
import Users from './pages/UsersPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<PrivateRoute>  <Dashboard /> </PrivateRoute>  } />
      <Route path="/users" element={<Users />} />
      
    </Routes>
  )
}

export default App;
