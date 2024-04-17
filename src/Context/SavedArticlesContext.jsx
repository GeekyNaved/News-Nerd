import {createContext, useState} from "react";

export const SavedArticlesContext = createContext(null);

export const SavedArticlesProvider = ({children}) => {
  const [savedArticles, setSavedArticles] = useState([]);

  return (
    <SavedArticlesContext.Provider value={{savedArticles, setSavedArticles}}>
      {children}
    </SavedArticlesContext.Provider>
  );
};
