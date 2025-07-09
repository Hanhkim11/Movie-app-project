import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/User/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/User/RegisterPage";
import LoginPage from "./pages/User/LoginPage";
import DetailMoviePage from "./pages/User/DetailPage/DetailMoviePage";
import UserLayout from "./pages/User/UserLayout";
import BookingTickets from "./pages/User/BookingTickets/BookingTickets";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="detail-movie/:id" element={<DetailMoviePage />} />
          <Route
            path="booking-tickets/:maLichChieu"
            element={<BookingTickets />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
