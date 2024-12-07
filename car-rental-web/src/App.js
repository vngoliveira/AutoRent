import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AuthGuard from './components/AuthGuard';
import Reservation from './pages/Reservation';
import Layout from './components/Layout';
import { UserProvider } from "./UserContext";
import Reservations from './pages/Reservations';
import EditProfile from './pages/EditProfile';
import ReservationDetails from './pages/ReservationDetails';

const App = () => {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/reservation/:carId"
          element={
            <AuthGuard>
              <Reservation />
            </AuthGuard>
          }
        />
        <Route
          path="/reservations/"
          element={
            <AuthGuard>
              <Reservations />
            </AuthGuard>
          }
        />
        <Route
          path="/reservation-details/:reservationId"
          element={
            <AuthGuard>
              <ReservationDetails />
            </AuthGuard>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <AuthGuard>
              <EditProfile />
            </AuthGuard>
          }
        />
        </Route>
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
