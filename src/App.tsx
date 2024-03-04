import { useState } from "react";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./pages/login";
import Pokedex from "./pages/pokedex";
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome";
import AuthenticationService from "./services/AuthenticationService";

const App = () => {
  // Zone pour faire plein de trucs
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthenticationService.isAuthenticated()
  );

  // Ici on construit l'interface
  return (
    <div className="App">
      <Header
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      <main>
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:filter" element={<Pokedex />} />
          </Routes>
        ) : (
          <Login setIsAuthenticated={setIsAuthenticated} />
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
