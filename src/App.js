import React from "react";
import Covid from "./component/Covid";
import { CovidProvider } from "./context/Covid19ApiContext";

function App() {
  return (
    <CovidProvider>
      <Covid />
    </CovidProvider>
  );
}

export default App;
