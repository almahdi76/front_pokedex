import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import Pokemon from "../../models/pokemon";
import { Edit } from "@mui/icons-material";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import TypeChip from "../typeChip";

import "./style.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import PokemonDetail from "../pokemonDetail";
import PokemonEdit from "../pokemonEdit";
import PokemonService from "../../services/PokemonService";

interface Props {
  pokemon: Pokemon;
  handlePokemonChange: Function;
  handlePokemonDelete:Function
}

const PokemonCard = ({ pokemon, handlePokemonChange,handlePokemonDelete }: Props) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
 
  const handleDelete=()=>{
    PokemonService.delete(pokemon.id).then((ok)=>{
      if(ok){
        handlePokemonDelete(pokemon.id)
       
        
      }
    })
  }

 

  return (
    <>
      <Card className="pokemonCard" elevation={10}>
        <CardHeader
          title={"#" + pokemon.id.toString().padStart(4, "0")}
          action={<>
                    <IconButton aria-label="edit" onClick={handleOpenEdit}>
                      <Edit />
                    </IconButton>

                    <IconButton aria-label="delete"  onClick={handleDelete}>
                      <DeleteOutlineIcon/>
                      </IconButton>  
                </>
          }

       
        />
        <CardMedia
          component="img"
          image={pokemon.picture}
          alt={t("pokemon." + pokemon.id)}
          onClick={handleOpen}
        />
        <CardContent>
      
          <Typography variant="h3">{t("pokemon." + pokemon.id)}</Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            gap="10px"
            rowGap="5px"
            justifyContent="center"
          >
            {pokemon.types?.map((typeId: number) => (
              <TypeChip typeId={typeId} />
            ))}
          </Box>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={t("pokemon." + pokemon.id)}
        aria-describedby={t("pokemon." + pokemon.id)}
      
      >
        {/* c'est là que vous devez travailler */}
        <PokemonDetail pokemon={pokemon} />
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby={t("pokemon." + pokemon.id)}
        aria-describedby={t("pokemon." + pokemon.id)}
      >
        {/* c'est là que vous devez travailler */}
        <PokemonEdit
          pokemon={pokemon}
          handleCloseEdit={handleCloseEdit}
          handlePokemonChange={handlePokemonChange}
        />
      </Modal>
    </>
  );
            };

export default PokemonCard;
