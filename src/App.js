import React from "react";
import Layout from "./components/Layout/Layout";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import PlatformSelector from "./components/PlatformSelector/PlatformSelector";

function App(props) {
  const availablePlatforms = ["Sega Genesis", "Nintendo Entertainment System"];

  return (
    <div className="App">
      <Layout>
        <Navigation />
        <PlatformSelector platforms={availablePlatforms} />
      </Layout>
    </div>
  );
}

export default App;
