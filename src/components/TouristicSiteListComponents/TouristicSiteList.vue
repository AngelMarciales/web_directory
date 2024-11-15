<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12">
      <TouristicSiteCard v-for="site in sites" :key="site.id" :site="site" />
    </div>
  </div>
</template>

<script>
import TouristicSiteCard from "./TouristicSiteCard.vue";
import axios from "axios";


export default {
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
  },
  components: {
    TouristicSiteCard,
  },
};
</script>
