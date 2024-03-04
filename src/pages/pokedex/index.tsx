import PokemonList from "../../components/pokemonList";
import PokemonSearch from "../../components/pokemonSearch";
import { useEffect, useState } from "react";
import Pokemon from "../../models/pokemon";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PokemonService from "../../services/PokemonService";

const Pokedex = () => {
  const { t } = useTranslation();

  const params = useParams();

  const [pokemonOrigin, setPokemonOrigin] = useState<Pokemon[]>([]);
  const [pokemonL, setPokemonL] = useState<Pokemon[]>([]);

  const [searchText, setSearchText] = useState<string | undefined>(
    params.filter
  );
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<number>(1);

  /* met à jour la liste des pokemons avec un pokemon modifié */
  const handlePokemonDelete=(id:number)=>{
     
    setPokemonOrigin(pokemonOrigin.filter((item:Pokemon) => item.id !== id))
  }

  const handlePokemonChange = (pok: Pokemon) => {
    let result: Pokemon[];

    // méthode a : supprime le pokemon à modifier puis le rajoute à la fn de la liste
    // étape 1 : suppression du pokemon de la liste
    result = pokemonOrigin.filter((p: Pokemon) => p.id !== pok.id);
    // étape 2 : ajout de la version modifiée du pokemon à la fin de la liste
    result.push(pok);

    /*
    // méthode b : on recherche la position du pokemon à modifier puis on le remplace par la nouvelle version
    // étape 1 : initialisation de result avec tous les pokemons
    result = pokemonOrigin;
    // étape 2 : recherche de l'emplacement du pokemon à modifier
    const idx: number = result.findIndex((p: Pokemon) => p.id === pok.id);
    //étape 3 : remplacement du pokemon à la position trouvée par sa nouvelle version
    result.splice(idx, 1, pok);
    */

    setPokemonOrigin(result);
  };

  // effet qui se déclenche si un des élément parmis [sortBy, searchText, sortDirection, t] est modifié
  useEffect(() => {
    // on repart de la liste complète des pokémons et on la fitre en fonction de searchText

    if (searchText !== undefined && searchText !== "") {
      PokemonService.getStartWith(searchText.toLowerCase()).then((value) =>
        setPokemonOrigin(value)
      );
    } else {
      PokemonService.getAll().then((value) => setPokemonOrigin(value));
    }
  }, [searchText]);

  useEffect(() => {
    // la liste filtrée est ensuite triée
    let tempSorted: Pokemon[] = pokemonOrigin.sort((a: Pokemon, b: Pokemon) => {
      let valA: number | string = a.id;
      let valB: number | string = b.id;

      if (sortBy === "name") {
        valA = t("pokemon." + a.id);
        valB = t("pokemon." + b.id);
      } else if (sortBy === "CP") {
        valA = a.cp;
        valB = b.cp;
      }

      return valA > valB ? sortDirection : -sortDirection;
    });

    // le résultat obtenu est mis dans pokemonL qui est la liste des pokémons affichés
    setPokemonL(tempSorted);
  }, [sortBy, sortDirection, pokemonOrigin, t]);

  return (
    <>
      <PokemonSearch
        searchText={searchText}
        searchUpdate={setSearchText}
        sortBy={sortBy}
        sortByUpdate={setSortBy}
        sortDirection={sortDirection}
        sortDirectionUpdate={setSortDirection}
        handlePokemonChange={handlePokemonChange}
       //pokemon={pokemonL}
        pokemons={pokemonL}
      />
      <PokemonList
        pokemons={pokemonL}
        handlePokemonChange={handlePokemonChange}
        handlePokemonDelete={handlePokemonDelete}
      />
    </>
  );
};

export default Pokedex;
