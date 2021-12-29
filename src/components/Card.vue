<template>
  <div class="Card">
    <div class="img-container">
      <img v-if="url" :src="url" />
      <img v-if="!url" src="../img/pokemon.png" />
    </div>

    <div class="data-container">
      <h5>{{ name }}</h5>

      <router-link
        :to="{
          name: 'Pokemon',
          params: {
            id: order,
          },
        }"
      >
        <b-button variant="outline-primary" class="button">
          More information
        </b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["data", "description", "name", "order", "types", "url"],
};
</script>
