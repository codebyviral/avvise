/* eslint-disable no-unused-vars */

import React, { createContext, useState, useContext, Children } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appMarksData, setAppMarksData] = useState(null);

  return (
    <AppContext.Provider value={{ appMarksData, setAppMarksData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
