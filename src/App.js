import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import SignInPage from "./Components/SignInPage";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<SignInPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
