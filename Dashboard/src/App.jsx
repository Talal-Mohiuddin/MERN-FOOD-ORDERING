import React from "react";
import { Navbar, Sidebar } from "./components/index";
import { Routes, Route } from "react-router-dom";
import { Addproduct, List, Orders } from "./pages/index";

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route index path="/list" element={<List />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
