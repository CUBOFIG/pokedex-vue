<template>
  <b-container>
    <b-row>
      <b-col
        lg="4"
        md="6"
        sm="12"
        class="result"
        v-for="item in pokemons"
        :key="item"
      >
        <Card
          :name="item.name"
          :url="item.description.sprites.front_default"
          :order="item.description.id"
          class="Card"
        />
      </b-col>
    </b-row>
  </b-container>
  <InfiniteLoading @infinite="load" :comments="pokemons" />
</template>

<script>
import "v3-infinite-loading/lib/style.css";
import { computed } from "vue";
import { ref } from "vue";
import { useStore } from "vuex";
import Card from "../components/Card.vue";
import InfiniteLoading from "v3-infinite-loading";

export default {
  name: "Home",
  components: { InfiniteLoading, Card },
  setup() {
    const store = useStore();
    const pokemons = ref(computed(() => store.state.pokemonsDefinitive));

    const load = async ($state) => {
      try {
        if (pokemons.value.length == 1107) {
          $state.complete();
        } else {
          $state.loaded();
          store.dispatch("addPokemonActual");
        }
      } catch (error) {
        $state.error();
      }
    };
    return { load, pokemons };
  },
};
</script>
