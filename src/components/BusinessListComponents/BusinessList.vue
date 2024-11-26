<template>
  <div class="grid grid-cols-12 gap-2">
    <div
      class="col-span-12"
      v-if="filteredBusinessesReview.length === 0 && filteredRatings.length > 0"
    >
      <p>No se encontraron negocios con la calificación seleccionada.</p>
    </div>
    <div class="col-span-12">
      <BusinessCard
        v-for="business in businessesToShow"
        :key="business.id"
        :business="business"
      />
    </div>
  </div>
</template>

<script>
import BusinessCard from "./BusinessCard.vue";
import { useBusinessStore } from "../../stores/businessStore";

export default {
  data() {
    return {
      useBusinessStore,
      businessList: [],
      typeId: null,
    };
  },
  computed: {
    filteredBusinesses() {
      const store = useBusinessStore();
      return store.filteredBusinesses; // Lista de negocios filtrados
    },
    filteredBusinessesReview() {
      const store = useBusinessStore();
      return store.getfilteredBusinessesReview; // Lista de negocios filtrados por reseña
    },
    filteredRatings() {
      const store = useBusinessStore();
      return store.filteredRatings; // Lista de calificaciones seleccionadas
    },
    businessesToShow() {
      // Si hay un filtro de reseña seleccionado y no hay coincidencias, mostramos un mensaje
      if (this.filteredRatings.length > 0) {
        // Si hay un filtro de reseña y no hay resultados, mostramos un mensaje vacío
        if (this.filteredBusinessesReview.length === 0) {
          return []; // No se muestran negocios
        }
        return this.filteredBusinessesReview; // Mostramos los negocios con el filtro de reseña
      } else {
        return this.businessList; // Si no hay filtro de reseña, mostramos todos los negocios
      }
    },
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
    this.typeId = parseInt(this.$route.params.typeId, 10);
    this.fetchBusinessList();
  },
  methods: {
    async fetchBusinessList() {
      try {
        await this.useBusinessStore.getByType(this.typeId);
        this.businessList = this.useBusinessStore.businessesByType;
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    },
    async filterBusinesses() {
      await this.useBusinessStore.filterBusinessesByReview();
    },
  },
  components: {
    BusinessCard,
  },
  watch: {
    "useBusinessStore.filteredRatings": "filterBusinesses",
  },
};
</script>

<style scoped>
.BusinessCard {
  margin: 0;
}
</style>
