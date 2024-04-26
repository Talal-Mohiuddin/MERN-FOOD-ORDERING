import React, { createContext, useContext, useState } from "react";


const StoreContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  return (
    <StoreContext.Provider
      value={{
        user,
        setuser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  return useContext(StoreContext);
};

export { ContextProvider, useStore };
