import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Pokemon from "../../models/pokemon";
import { useTranslation } from "react-i18next";

import "./style.css";
import TypeChip from "../typeChip";
import PokemonType from "../../models/pokemonType";
import { useFormik } from "formik";

import * as yup from "yup";
import { useEffect, useState } from "react";
import TypeService from "../../services/TypeService";
import PokemonService from "../../services/PokemonService";

interface Props {
  pokemon: Pokemon;
  handleCloseEdit: Function;
  handlePokemonChange: Function;
}

const PokemonEdit = ({
  pokemon,
  handleCloseEdit,
  handlePokemonChange,
}: Props) => {
  const { t } = useTranslation();
  // const [open,setOpen]="false";
  // const bhandleClose =()=>{window.location.reload()}

  const [types, setTypes] = useState<PokemonType[]>([]);

  useEffect(() => {
    TypeService.getTypes().then((value) => setTypes(value));
  }, []);

  const schema = yup.object().shape({
    hp: yup
      .number()
      .required(t("error.required", { field: t("common.pokemonHp") }))
      .min(0, t("error.minValue", { value: 0 }))
      .max(500, t("error.maxValue", { value: 500 })),
    cp: yup
      .number()
      .required(t("error.required", { field: t("common.pokemonCp") }))
      .min(0, t("error.minValue", { value: 0 }))
      .max(5000, t("error.maxValue", { value: 5000 })),
    types: yup
      .array()
      .min(1, t("error.atLeast", { count: 1 }))
      .max(3, t("error.noMoreThan", { count: 3 })),
  });

  const formik = useFormik({
    initialValues: {
      id: pokemon.id,
      name: pokemon.name,
      picture: pokemon.picture,
      hp: pokemon.hp,
      cp: pokemon.cp,
      types: pokemon.types.map((id: number) => id.toString()),
    },
    validationSchema: schema,
    onSubmit: (values) => {
      let pok: Pokemon = {
        id: values.id,
        name: values.name,
        picture: values.picture,
        hp: values.hp,
        cp: values.cp,
        types: values.types.map((id: string) => +id),
      };

      PokemonService.save(pok).then((pokemon) => {
        handlePokemonChange(pokemon);
        handleCloseEdit();
      });
    },
  });

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
      <CardContent sx={{ width: 500 }}>
        <form onSubmit={formik.handleSubmit}>
          <Box display={"flex"} className="edit">
            <InputLabel className="label">{t("common.pokemonId")}</InputLabel>
            <Typography variant="body1">
              {"#" + pokemon.id.toString().padStart(4, "0")}
            </Typography>
          </Box>
          <Box display={"flex"} className="edit">
            <InputLabel className="label">{t("common.pokemonName")}</InputLabel>
            <Typography variant="body1">
              {t("pokemon." + pokemon.id)}
            </Typography>
          </Box>
          <Box display={"flex"} className="edit">
            <InputLabel className="label">{t("common.pokemonCp")}</InputLabel>
            <TextField
              placeholder={t("common.pokemonCp")}
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="cp"
              value={formik.values.cp}
              error={formik.touched.cp && Boolean(formik.errors.cp)}
              helperText={formik.touched.cp && formik.errors.cp}
              sx={{ height: 1.1 }}
            />
          </Box>
          <Box display={"flex"} className="edit">
            <InputLabel className="label">{t("common.pokemonHp")}</InputLabel>
            <TextField
              placeholder={t("common.pokemonHp")}
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="hp"
              value={formik.values.hp}
              error={formik.touched.hp && Boolean(formik.errors.hp)}
              helperText={formik.touched.hp && formik.errors.hp}
              sx={{ height: 1.1 }}
            />
          </Box>
          <Box display={"flex"} className="edit">
            <InputLabel className="label">
              {t("common.pokemonTypes")}
            </InputLabel>
            <Box>
              <Typography color="red" variant="caption">
                {formik.touched.types && formik.errors.types}
              </Typography>
              <Box display="flex" gap="10px" width="26em" flexWrap="wrap">
                {types.map((type: PokemonType) => (
                  <Box width="8em">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.types.includes(
                            type.id.toString()
                          )}
                        />
                      }
                      label={<TypeChip typeId={type.id} />}
                      name="types"
                      value={type.id}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box display="flex" gap={2} justifyContent="right">
            <Button variant="outlined" onClick={() => handleCloseEdit()}>
              {t("common.cancel")}
            </Button>
            <Button variant="contained" type="submit">
              {t("common.save")}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default PokemonEdit;
