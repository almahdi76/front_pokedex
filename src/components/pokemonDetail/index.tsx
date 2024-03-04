import {
  Box,
  Card,
  CardContent,
  CardMedia,
  InputLabel,
  Typography,
} from "@mui/material";
import Pokemon from "../../models/pokemon";
import { useTranslation } from "react-i18next";

import "./style.css";
import TypeChip from "../typeChip";

interface Props {
  pokemon: Pokemon;
}

const PokemonDetail = ({ pokemon }: Props) => {
  const { t } = useTranslation();

  return (
    <Card
      className="pokemonDetail"
      sx={{ display: "flex", alignItems: "center", gap: "20" }}
    >
      <CardMedia
        component="img"
        image={pokemon.picture}
        alt={t("pokemon." + pokemon.id)}
        sx={{ width: 200 }}
      />
      <CardContent>
        <Box display={"flex"} className="info">
          <InputLabel className="label">{t("common.pokemonId")}</InputLabel>
          <Typography variant="body1">
            {"#" + pokemon.id.toString().padStart(4, "0")}
          </Typography>
        </Box>
        <Box display={"flex"} className="info">
          <InputLabel className="label">{t("common.pokemonName")}</InputLabel>
          <Typography variant="body1">{t("pokemon." + pokemon.id)}</Typography>
        </Box>
        <Box display={"flex"} className="info">
          <InputLabel className="label">{t("common.pokemonCp")}</InputLabel>
          <Typography variant="body1">{pokemon.cp}</Typography>
        </Box>
        <Box display={"flex"} className="info">
          <InputLabel className="label">{t("common.pokemonHp")}</InputLabel>
          <Typography variant="body1">{pokemon.hp}</Typography>
        </Box>
        <Box display={"flex"} className="info">
          <InputLabel className="label">{t("common.pokemonTypes")}</InputLabel>
          <Box
            display="flex"
            flexWrap="wrap"
            gap="10px"
            rowGap="5px"
            justifyContent="left"
          >
            {pokemon.types.map((typeId: number) => (
              <TypeChip typeId={typeId} />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonDetail;
