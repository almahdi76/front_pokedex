import { Box, Slide, Typography } from "@mui/material";
import Pokemon from "../../models/pokemon";
import PokemonCard from "../pokemonCard";
import { useTranslation } from "react-i18next";
import "./style.css";

interface Props {
  pokemons: Pokemon[] | undefined;
  handlePokemonChange: Function;
  handlePokemonDelete:Function
}

const PokemonList = ({ pokemons, handlePokemonChange,handlePokemonDelete }: Props) => {
  // zone pour faire des trucs
  const { t } = useTranslation();

  // Ici on construit l'interface
  return (
    <Box className="pokemonList">
      <Typography variant="h2">
        {t("common.xPokemons", { count: pokemons?.length })}
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap="20px"
        justifyContent="space-around"
        id="list"
      >
        {pokemons?.slice(0, 5).map((pokemon: Pokemon, index: number) => (
          <Slide
            in={true}
            timeout={(index + 1) * 20}
            style={{ transformOrigin: "0 0 0" }}
            key={"zoom" + pokemon.id}
          >
            <article>
              <PokemonCard
                pokemon={pokemon}
                handlePokemonChange={handlePokemonChange} 
                handlePokemonDelete={handlePokemonDelete}
                 />
            </article>
          </Slide>
        ))}
      </Box>
    </Box>
  );
};

export default PokemonList;
