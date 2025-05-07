import { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [savedForm, setSavedForm] = useState();

    return (
        <FormContext.Provider value={{ savedForm, setSavedForm}} >
            {children}
        </FormContext.Provider>
    )
}

export const useFormContext = () => useContext(FormContext);
