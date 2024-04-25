import React, { useState } from "react";
import { Navbar, Footer, Loginpop } from "./components/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cart, Home, Myorders, Placeorder, Verify } from "./pages/index";
import { useStore } from "./context/storeContext";
import { useEffect } from "react";

const App = () => {
  const [showLogin, setshowLogin] = useState(false);
  const { user, setuser } = useStore();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setuser(JSON.parse(user));
    }
  }, []);

  return (
    <>
      {showLogin && <Loginpop setshowLogin={setshowLogin} />}
      <div className="w-[80%] m-auto">
        <BrowserRouter>
          <Navbar setshowLogin={setshowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Placeorder />} />
            <Route path='/verify' element={<Verify />} />
            <Route path="/myorders" element={<Myorders />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
};

export default App;
