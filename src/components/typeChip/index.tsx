import { Box, Chip, Typography } from "@mui/material";
import PokemonType from "../../models/pokemonType";
import { useTranslation } from "react-i18next";
import { Circle } from "@mui/icons-material";

import "./style.css";
import { useEffect, useState } from "react";
import TypeService from "../../services/TypeService";

interface props {
  typeId: number;
}

const TypeChip = ({ typeId }: props) => {
  const { t } = useTranslation();

  const [types, setTypes] = useState<PokemonType[]>([]);

  useEffect(() => {
    TypeService.getTypes().then((value) => setTypes(value));
  }, []);

  const currentType: PokemonType | undefined = types.find(
    (type: PokemonType) => type.id === typeId
  );

  return (
    <Chip
      label={
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="5px"
        >
          <Circle sx={{ color: "#" + currentType?.color }} />
          <Typography variant="body2">{t("type." + typeId)}</Typography>{" "}
        </Box>
      }
      size="small"
      sx={{
        border: "2px solid #" + currentType?.color,
        backgroundColor: "#FFF",
      }}
    />
  );
};

export default TypeChip;
