import { useEffect, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import SystemRoutes from "./routes";
import { store, persistor } from "./store";

import "./scss/styles.scss";
import "./scss/connect-font.css";

const App = () => {
  useEffect(() => {
    localStorage.setItem("Idiom", "pt-BR");
    const root = document.documentElement;

    root?.style.setProperty(
      "--cor-label",
      "black"
    );
    root?.style.setProperty(
      "--cor-menu-label",
      "#aea9c3"
    );
    root?.style.setProperty(
      "--cor-menu-principal",
      "#2c304d"
    );
    root?.style.setProperty(
      "--cor-menu-secundaria",
       "#2c304d"
    );
    root?.style.setProperty(
      "--cor-principal",
       "#2c304d"
    );
    root?.style.setProperty(
      "--cor-secundaria",
     "#2c304d"
    );
    root?.style.setProperty(
      "--cor-principal-background",
      "#2c304d50"
    );
    root?.style.setProperty(
      "--primary",
      "#2c304d"
    );
    root?.style.setProperty(
      "--secondary",
      "#2c304d"
    );
    root?.style.setProperty("--default-font-size", "11px");
  }, []);
  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback="loading">
          <ToastContainer style={{ fontSize: "var(--default-font-size)" }} />
          <SystemRoutes />
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;
