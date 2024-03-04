import Pokemon from "../models/pokemon";
import AuthenticationService from "./AuthenticationService";

class PokemonService {
  static async delete(id: number | undefined): Promise<boolean> {
    return fetch(`http://localhost:8080/pokemon/${id}`, {
      method: "DELETE",
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((ok) => ok.status === 200)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  static async getAll(): Promise<Pokemon[]> {
    return fetch("http://localhost:8080/pokemon/", {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((pokemons) => pokemons.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  static async getStartWith(filter: string): Promise<Pokemon[]> {
    return fetch(`http://localhost:8080/pokemon/search?name=${filter}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((pokemons) => pokemons.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  static async getOne(id: string | undefined): Promise<Pokemon> {
    return fetch(`http://localhost:8080/pokemon/${id}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((pokemon) => pokemon.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  static async save(newPokemon: Pokemon): Promise<Pokemon> {
    return fetch(`http://localhost:8080/pokemon/`, {
      method: "POST",
      body: JSON.stringify(newPokemon),
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((pokemon) => pokemon.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default PokemonService;
