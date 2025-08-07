import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/CarBook/Home/Home";
import Login from "./components/CarBook/LoginPage/Login";
import Register from "./components/CarBook/LoginPage/Register ";
import CarList from "./components/CarBook/CarList/CarList";
import CarDetails from "./components/CarBook/CarList/CarDetails";
import Booking from "./components/CarBook/Booking/Booking";
import Profile from "./components/CarBook/Profile/Profile";
import AdminDashboard from "./components/CarBook/Admin/AdminDashboard";
import Navbar from "./components/CarBook/NavBar/Navbar";
import Footer from "./components/CarBook/Footer/Footer";
import Payment from "./components/CarBook/Booking/Payment";
import Confirmation from "./components/CarBook/Booking/Confirmation";
import CarD from "./components/CarBook/NavBar/CarD";
import Special from "./components/CarBook/Home/Special";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/special-offers" element={<Special />} />
        <Route path="/cars1" element={< CarD/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/payment" element={<  Payment/>} />
        <Route path="/booking-confirmation" element={<Confirmation />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

