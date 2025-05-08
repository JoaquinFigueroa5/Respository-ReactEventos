import { createContext, useState, useContext, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [savedForm, setSavedForm] = useState(() => {
    const saved = localStorage.getItem("savedForm");
    return saved ? JSON.parse(saved) : undefined;
  });

  useEffect(() => {
    if (savedForm !== undefined) {
      localStorage.setItem("savedForm", JSON.stringify(savedForm));
    }
  }, [savedForm]);

  return (
    <FormContext.Provider value={{ savedForm, setSavedForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
