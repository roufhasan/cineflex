import { createContext, useState } from "react";

export const ResetPageContext = createContext(null);

const ResetPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const resetCurrentPage = () => {
    setCurrentPage(1);
  };

  const currenPageInfo = {
    currentPage,
    setCurrentPage,
    resetCurrentPage,
  };

  return (
    <ResetPageContext.Provider value={currenPageInfo}>
      {children}
    </ResetPageContext.Provider>
  );
};

export default ResetPageProvider;
