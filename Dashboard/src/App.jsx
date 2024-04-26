import React from "react";
import { Navbar, Sidebar } from "./components/index";
import { Routes, Route } from "react-router-dom";
import { Addproduct, List, Orders, Login } from "./pages/index";
import { useStore } from "./context/storeContext";
import { useEffect } from "react";

const App = () => {
  const { user, setuser } = useStore();

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      setuser(JSON.parse(storedUser));
    }
  }, [setuser]);

  return (
    <div>
      {user && <Navbar />}
      <hr />
      <div className="flex">
        {user && <Sidebar />}
        <Routes>
          {!user ? (
            <>
              <Route index path="/dashboard" element={<Login />} />
              <Route path="*" element={<Login />} />
            </>
          ) : (
            <>
              <Route index path="/list" element={<List />} />
              <Route path="/addproduct" element={<Addproduct />} />
              <Route path="/orders" element={<Orders />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
