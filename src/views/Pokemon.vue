<template>
  <div class="pokemon">
    <Information
      :stats="info.stats"
      :abilities="info.abilities"
      :height="info.height"
      :weight="info.weight"
      :description="description"
      :types="info.types"
      :name="info.name"
      :id="info.order"
      :img="img"
    />
  </div>
</template>

<script>
import Information from "../components/Information.vue";

const json_property = (json_data, identifier, string_to_extract) => {
  var vm = [];
  for (let i = 0; i < json_data.length; i++) {
    const data = json_data[i][identifier][string_to_extract];
    vm = [...vm, data];
  }
  return vm;
};

export default {
  name: "Pokemon",
  components: { Information },
  data() {
    return {
      info: {},
      img: "",
      description: "",
    };
  },
  mounted() {
    const data = async () => {
      try {
        await fetch(
          `https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}/`
        )
          .then((response) => response.json())
          .then(async (response) => {
            const info_specie = await fetch(response.species.url);
            const data_specie = await info_specie.json();
            const datitos = data_specie.flavor_text_entries.filter((entry) => {
              if (entry["language"]["name"] == "en") {
                return entry["flavor_text"];
              }
            });

            this.description = datitos[0]["flavor_text"].replace(
              /(\r\n|\n|\r|\f)/gm,
              " "
            );

            return response;
          })
          .then((response) => {
            response.weight = response.weight / 10;
            response.height = response.height * 10;
            response.types = json_property(response.types, "type", "name");
            response.abilities = json_property(
              response.abilities,
              "ability",
              "name"
            );

            response.stats.map((e) => {
              e.base_stat > 100 ? (e.base_stat = 100) : null;
            });

            this.info = response;
            this.img = response.sprites.front_default;
          });
      } catch (error) {
        console.log(error);
      }
    };
    data();
  },
};
</script>
