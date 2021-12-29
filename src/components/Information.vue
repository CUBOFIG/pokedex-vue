<template>
  <div class="information">
    <b-container class="information-container">
      <b-row>
        <b-col cols="12" md="6">
          <div class="skills-section">
            <div class="poke-container">
              <div class="pokeball">
                <img v-if="img" :src="img" />
                <img v-if="!img" src="../img/pokemon.png" />
              </div>
            </div>

            <div class="skills">
              <p>#{{ id }}</p>
              <h4 class="title-name">{{ name }}</h4>

              <div class="types">
                <div class="type" v-for="(item, index) in types" :key="index">
                  <p :class="item">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </b-col>

        <b-col cols="12" md="6">
          <div class="general-information">
            <div class="description">
              <h4>Bio.</h4>
              <div>{{ description }}</div>
            </div>

            <div class="info">
              <p>
                Weight: <span>{{ weight }} k.</span>
              </p>
              <p>
                Height: <span>{{ height }} cm.</span>
              </p>
            </div>

            <div class="abilities">
              <h4>Moves</h4>
              <div class="abilitie">
                <p v-for="(item, index) in abilities" :key="index">
                  {{ item }}
                </p>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>

      <div class="stats-pokemon">
        <div v-for="(stat, index) in stats" :key="index">
          <p>
            {{ stat.stat.name }}
          </p>
          <ProgressBar :value="stat.base_stat" :barClass="stat.stat.name" />
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import ProgressBar from "./Progress-bar.vue";

export default {
  name: "Information",
  props: [
    "abilities",
    "description",
    "height",
    "id",
    "img",
    "name",
    "stats",
    "types",
    "weight",
  ],
  components: { ProgressBar },
};
</script>
