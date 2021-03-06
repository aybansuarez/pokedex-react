import { Routes, Route } from "react-router-dom";
import NationalPokemons from "./views/NationalPokemons";
import PokemonDetail from "./views/PokemonDetail";
import Pokedexes from "./views/Pokedexes";
import RegionalPokemons from "./views/RegionalPokemons";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Pokedexes />} />
        <Route path="/pokedex/national" element={<NationalPokemons />} />
        <Route path="/pokedex/:name" element={<RegionalPokemons />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
