import React, { useState } from "react";
import { Navbar, Footer, Loginpop } from "./components/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cart, Home, Placeorder } from "./pages/index";

const App = () => {
  const [showLogin, setshowLogin] = useState(false);
  return (
    <>
      {showLogin && <Loginpop setshowLogin={setshowLogin} />}
      <div className="w-[80%] m-auto">
        <BrowserRouter>
          <Navbar setshowLogin={setshowLogin} />
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
