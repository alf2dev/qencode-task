import React, { createContext, useContext, useState } from "react";

const context = createContext();

export default function CredentialDataProvider({ children }) {
  const data = localStorage.getItem("cretentialData");
  const [cretentialData, setCretentialData] = useState(
    data ? JSON.parse(data) : {}
  );
  const setData = (data) => {
    localStorage.setItem("cretentialData", JSON.stringify(data));
    setCretentialData(data);
  };
  return (
    <context.Provider value={[cretentialData, setData]}>
      {children}
    </context.Provider>
  );
}

export const useCredentialData = () => useContext(context);
