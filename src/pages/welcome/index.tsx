import { Box, MenuItem, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import "./style.css";

const Welcome = () => {
  const { t } = useTranslation();

  let aToZ: string[] = [];

  let i: number;
  for (i = 0; i < 26; i++) {
    aToZ.push(String.fromCharCode(65 + i));
  }

  return (
    <Box>
      <Typography variant="h2">{t("common.welcome")}</Typography>

      <Typography variant="body1" textAlign="left">
        {t("common.pokedexDescription")}
      </Typography>

      <Box role="menubar" display="flex" justifyContent="center">
        <MenuItem>
          <NavLink to="/pokedex">Vers le pokedex</NavLink>
        </MenuItem>
        {aToZ.map((c: string) => (
          <MenuItem>
            <NavLink to={`/pokedex/${c}`}>{c}</NavLink>
          </MenuItem>
        ))}
      </Box>

      <img src="/assets/images/Sacha.png" alt="sacha" className="welcome" />
    </Box>
  );
};

export default Welcome;
