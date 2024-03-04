import { Add, ArrowDownward, ArrowUpward, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import "./style.css";
import { ChangeEvent, useState } from "react";
import SavePOkemon from "../pokemonSave";
import Pokemon from "../../models/pokemon";

interface Props {
  searchText: string | undefined;
  searchUpdate: Function;
  sortBy: string;
  sortByUpdate: Function;
  sortDirection: number;
  sortDirectionUpdate: Function;
  handlePokemonChange:Function;
  pokemons: Pokemon[];
}

const PokemonSearch = ({
  searchText,
  searchUpdate,
  sortBy,
  sortByUpdate,
  sortDirection,
  sortDirectionUpdate,
  pokemons,handlePokemonChange
}: Props) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [openSave, setOpenSave] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSave = () => {
    setOpenSave(true);
  };
  const handleCloseSave = () => {
    setOpenSave(false);
  };

  return (<>
       <Modal
        open={openSave}
        onClose={handleCloseSave}
       
      >
        {/* c'est là que vous devez travailler */}
        <SavePOkemon
           pokemons={pokemons}
           handleCloseSave={handleCloseSave}
           handlePokemonChange={handlePokemonChange}
          // pokemon={Pokemon} 
        />
      </Modal>
    <Box
      className="pokemonSearch"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <TextField
        className="search"
        placeholder={t("common.searchPlaceholder")}
        type="search"
        value={searchText}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          searchUpdate(e.target.value)
        }
      />

      <InputLabel sx={{ marginLeft: "1em", marginRight: "0.5em" }}>
        {t("common.sortBy")}
      </InputLabel>
      <Box id="orderBy">
        <TextField
          select
          value={sortBy}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            sortByUpdate(e.target.value)
          }
          sx={{ width: "7em", textAlign: "left" }}
          label={t("common.sortBy")}
          InputLabelProps={{ shrink: false }}
        >
          <MenuItem value="id">{t("common.pokemonId")}</MenuItem>
          <MenuItem value="name">{t("common.pokemonName")}</MenuItem>
          <MenuItem value="CP">{t("common.pokemonCp")}</MenuItem>
        </TextField>
      </Box>
      <IconButton aria-label="edit" onClick={handleOpenSave} >
                      <Add />
                    </IconButton>
      <IconButton
        onClick={() => {
          sortDirectionUpdate(-sortDirection);
        }}
        title={t("common.changeSortOrder")}
      >
        {sortDirection === 1 ? <ArrowUpward /> : <ArrowDownward />}
      </IconButton>

    </Box>
    </>
  );
};

export default PokemonSearch;
