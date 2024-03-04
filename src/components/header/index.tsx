import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import "./style.css";
import { Logout } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";

interface Props {
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
}

const Header = ({ isAuthenticated, setIsAuthenticated }: Props) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: string
  ) => {
    i18n.changeLanguage(newLanguage);
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: "auto" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin="0 1em"
      >
        <NavLink to="/">
          <Box display="flex" alignItems="center">
            <img
              src="/assets/images/pokeball.png"
              alt=""
              style={{ width: "2.5em" }}
            />
            <Typography variant="h1">{t("common.pokedex")}</Typography>
          </Box>
        </NavLink>
        <Box display="flex" alignItems="center" className="menu">
          <Box>
            <ToggleButtonGroup
              value={i18n.language}
              exclusive
              size="small"
              onChange={toggleLanguage}
            >
              <ToggleButton value="fr">
                <Typography
                  fontSize="small"
                  sx={{ width: "20px", height: "20px" }}
                >
                  FR
                </Typography>
              </ToggleButton>
              <ToggleButton value="en">
                <Typography
                  fontSize="small"
                  sx={{ width: "20px", height: "20px" }}
                >
                  EN
                </Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {isAuthenticated && (
            <>
              <Box>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    AuthenticationService.logout();
                  }}
                  title="logout"
                >
                  <Logout />
                </IconButton>
              </Box>
              <Box>
                <Avatar />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
