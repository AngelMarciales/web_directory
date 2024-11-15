<template>
  <div class="space-y-4">
    <div class="grid grid-cols-12 grid-rows-1 gap-4">
      <div class="col-span-2 title3">Sitios turisticos</div>
      <div @click="goTouristSitesList" class="col-span-2 col-start-11 title3">
        <a class="link">Ver más...</a>
      </div>
    </div>

    <div class="carousel rounded-box overflow-hidden">
      <div class="carousel-item" v-for="site in sites" :key="site.id">
        <TouristSiteCardVue :site="site" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TouristSiteCardVue from './TouristSiteCard.vue';

export default {
  components: {
    TouristSiteCardVue,
  },
  name: "TouristSitesCard",
  props: {},
  data() {
    return {
      sites: [],
    };
  },
  mounted() {
    this.fetchSites();
  },
  methods: {
    async fetchSites() {
      try {
        const response = await axios.get('http://localhost:8080/api/tourist-places');
        this.sites = response.data;
      } catch (error) {
        console.error('Error al obtener sitios:', error);
      }
    },
    goTouristSitesList() {
      this.$router.push('/tourist-sites');
    },
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel-item {
  scroll-snap-align: start;
  flex: none;
  width: 100%;
  max-width: 400px;
  margin-right: 1rem;
}
</style>