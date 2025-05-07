import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { FormProvider } from "./context/FormContext";
import Loading from "./components/Loading";

function App() {
  const LandingPage = lazy(() => import("./components/LandingPage"));
  const Auth = lazy(() => import("./components/Auth"));
  return (
    <>
      <ChakraProvider>
        <FormProvider>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/dashboard" element={<LandingPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </FormProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
