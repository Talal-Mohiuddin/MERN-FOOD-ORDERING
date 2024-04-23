import React from "react";
import { Navbar, Footer } from "./components/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cart, Home, Placeorder } from "./pages/index";

const App = () => {
  return (
    <>
      <div className="w-[80%] m-auto">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/placeorder" element={<Placeorder />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
};

export default App;
