import "./styles/tailwind.css";
import { Header } from "./components/Header";
import { AllMovies } from "./pages/AllMovies";
import { Details } from "./pages/Details";
import { NotFound } from "./pages/NotFound";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [searchedWord, setSearchedWord] = useState("");

  function handleSearch(e) {
    setSearchedWord(e.target.value);
  }

  return (
    <div className="App">
      <Header handleSearch={handleSearch} />

      <Routes>
        <Route path="/" element={<AllMovies searchedWord={searchedWord} />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
