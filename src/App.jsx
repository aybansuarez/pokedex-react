import { Routes, Route } from "react-router-dom";
import Pokemons from "./views/Pokemons";
import Home from "./views/Home";
import PokemonDetail from "./views/PokemonDetail";
import Regions from "./views/Regions";
import RegionPokemons from "./views/RegionPokemons";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<Pokemons />} />
        <Route path="/p/:name" element={<PokemonDetail />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/r/:name" element={<RegionPokemons />} />
      </Routes>
    </Layout>
  );
}

export default App;
