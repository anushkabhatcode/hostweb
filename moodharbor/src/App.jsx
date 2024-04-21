import Login from './components/Auth/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/Auth/UserContext';
import Dashboard from './components/Dashboard/Dashboard';
import { useState } from 'react';
import Contact from './components/Contact';
import Connect from './components/Connect';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Home from './components/Home/Home';
import MoodBoost from './components/MoodBoost';
import Register from './components/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [user, setUser] = useState(null);

  const setUserContext = (user) => {
     setUser(user);
  };

  return (
    <UserProvider value={{ setUser: setUserContext }}>
      <Router> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              
                <Dashboard />
              
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connect"
            element={
              <ProtectedRoute>
                <Connect />
              </ProtectedRoute>
            }
          />
          <Route path="/moodboost" element={
              <ProtectedRoute>
                <MoodBoost />
              </ProtectedRoute>
            }
          />
        </Routes>
        
      </Router>
    </UserProvider>
  )
}

export default App
