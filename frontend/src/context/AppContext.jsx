/* eslint-disable no-unused-vars */

import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [noOfQues, setNoOfQues] = useState("");
  const [appMarksData, setAppMarksData] = useState(null);
  const [appQuestions, setAppQuestions] = useState([]);

  return (
    <AppContext.Provider
      value={{
        appMarksData,
        setAppMarksData,
        appQuestions,
        setAppQuestions,
        noOfQues,
        setNoOfQues,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
