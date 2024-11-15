<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12">
      <TouristicSiteCard v-for="site in sites" :key="site.id" :site="site" />
    </div>
  </div>
</template>

<script>
import TouristicSiteCard from "./TouristicSiteCard.vue";
import { useSiteStore } from "../../stores/siteStore";

export default {
  data() {
    return {
      useSiteStore,
      sites: [],
    };
  },
  mounted() {
    this.useSiteStore = useSiteStore();
    this.fetchSites();
  },
  methods: {
    async fetchSites() {
      try {
        await this.useSiteStore.loadSites();
        this.sites = this.useSiteStore.allSites;
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
