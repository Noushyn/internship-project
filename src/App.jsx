import './App.css'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';

function App() {

  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard" element={<PrivateRoute>  <Dashboard /> </PrivateRoute>  } />
    </Routes>
  )
}

export default App;
