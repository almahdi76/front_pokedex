
import Pokemon from '../../models/pokemon';
import * as yup from "yup";
import { useEffect, useState } from "react";
import TypeService from "../../services/TypeService";
import { useTranslation } from 'react-i18next';
import PokemonType from '../../models/pokemonType';
import { useFormik } from 'formik';
import PokemonService from '../../services/PokemonService';
import { Box, Button, Card, CardContent, CardMedia, Checkbox, FormControlLabel, InputLabel, TextField, Typography } from '@mui/material';
import TypeChip from '../typeChip';

interface Props {
  pokemons: Pokemon[] ;
  handlePokemonChange: Function;
  handleCloseSave:Function
}
const SavePOkemon = ({pokemons, handlePokemonChange,handleCloseSave}:Props) => {
  const { t } = useTranslation();
 
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
      id: 0,
      name: "",
      picture: "",
      hp: 0,
      cp:0,
      types: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      let pok: Pokemon = {
        name: values.name,
        picture: values.picture,
        id:values.id,
        hp:values.hp,
        cp: values.cp,
        types: []
      };

      PokemonService.save(pok).then((pokemon) => {
        handlePokemonChange(pokemon);
        handleCloseSave();
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
        image=""
        alt=""
        sx={{ width: 200 }}
      />
      <CardContent sx={{ width: 500 }}>
        <form onSubmit={formik.handleSubmit}>


        <Box display={"flex"} className="edit">
            <InputLabel className="label">ID</InputLabel>
            <TextField
              placeholder="ID"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="id"
              value={formik.values.id}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.hp && formik.errors.id}
              sx={{ height: 1.1 }}
            />
          </Box>


          <Box display={"flex"} className="edit">
            <InputLabel className="label">Nom</InputLabel>
            <TextField
              placeholder="Name"
              type="string"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ height: 1.1 }}
            />
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
            <Button variant="outlined" onClick={() => handleCloseSave()}>
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

export default SavePOkemon
