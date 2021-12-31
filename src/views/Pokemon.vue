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
import axios from "axios";

const json_property = (json_data, identifier, string_to_extract) => {
  var vm = [];
  for (let i = 0; i < json_data.length; i++) {
    const data = json_data[i][identifier][string_to_extract];
    vm = [...vm, data];
  }
  return vm;
};

const getDescription = (info_specie) => {
  const result = info_specie.data.flavor_text_entries.filter((entry) => {
    if (entry["language"]["name"] == "en") {
      return entry["flavor_text"];
    }
  });

  return result[0]["flavor_text"].replace(/(\r\n|\n|\r|\f)/gm, " ");
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
        await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}/`)
          .then((response) => response.data)
          .then(async (response) => {
            const info_specie = await axios(response.species.url);

            response.stats.map((e) => {
              e.base_stat > 100 ? (e.base_stat = 100) : null;
            });

            response.weight = response.weight / 10;
            response.height = response.height * 10;
            response.types = json_property(response.types, "type", "name");
            response.abilities = json_property(
              response.abilities,
              "ability",
              "name"
            );

            this.description = getDescription(info_specie);
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
