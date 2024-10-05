/* eslint-disable no-unused-vars */

import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [noOfQues, setNoOfQues] = useState(0);
  const [appMarksData, setAppMarksData] = useState(null);
  const [appQuestions, setAppQuestions] = useState([]);
  const [resultDisplay, setResultDisplay] = useState({});
  const [historyId, setHistoryId] = useState(null);
  const [markingType, setMarkingType] = useState("noNegative");
  return (
    <AppContext.Provider
      value={{
        appMarksData,
        setAppMarksData,
        appQuestions,
        setAppQuestions,
        noOfQues,
        setNoOfQues,
        resultDisplay,
        setResultDisplay,
        markingType,
        setMarkingType,
        historyId,
        setHistoryId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
