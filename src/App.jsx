import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { FormProvider } from "./context/FormContext";
import { EventsProvider } from "./context/EventsContext";
import Loading from "./components/Loading";

function App() {
  const LandingPage = lazy(() => import("./components/LandingPage"));
  const Auth = lazy(() => import("./components/Auth"));
  const TrabajosView = lazy(() => import("./components/TrabajosView"));
  const EventsList = lazy(() => import("./components/EventList"));
  const PersonalView = lazy(() => import("./components/PersonalView"));
  const ReunionView = lazy(() => import("./components/ReunionView"));

  return (
    <>
      <ChakraProvider>
        <EventsProvider>
          <FormProvider>
            <BrowserRouter>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Auth />} />
                  <Route path="/dashboard" element={<LandingPage />} />
                  <Route path="/events" element={ <EventsList/> }/>
                  <Route path="/trabajo" element={ <TrabajosView/> } />
                  <Route path="/personales" element={ <PersonalView/> } />
                  <Route path="/reuniones" element={ <ReunionView/> } />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </FormProvider>
        </EventsProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
