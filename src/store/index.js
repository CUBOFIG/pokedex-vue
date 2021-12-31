import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    pokemons: [],
    pokemonsDefinitive: [],
    count: 0,
  },
  mutations: {
    addpoke(state, payload) {
      state.count = state.count + payload;
    },

    addpokes(state, payload) {
      state.pokemonsDefinitive = [...state.pokemonsDefinitive, payload];
    },
  },
  actions: {
    async addPokemonActual(context) {
      const numero = this.state.count;
      try {
        const data = await axios
          .get(`https://pokeapi.co/api/v2/pokemon?limit=99&offset=${numero}00`)
          .then(function (response) {
            return response.data.results;
          });

        data.map(async (pokemon) => {
          await axios
            .get(pokemon.url)
            .then(function (response) {
              context.commit("addpokes", {
                description: response.data,
                name: pokemon.name,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } catch (error) {
        console.log(error);
      }
      context.commit("addpoke", 1);
    },
  },
});
