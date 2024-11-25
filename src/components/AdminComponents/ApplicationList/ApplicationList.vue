<template>
  <div>
    <SearchBar />
    <div class="grid grid-cols-6 grid-rows-2 gap-4">
      <div class="row-span-2 col-span-4 title3">Listas de solicitudes</div>
    </div>

    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-12">
        <ApplicationCard
          v-for="business in businessList"
          :key="business.id"
          :business="business"
        />
      </div>
    </div>

    <div class="join mt-4">
      <button
        class="join-item btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        «
      </button>
      <button class="join-item btn">
        Page {{ currentPage }} de {{ totalPages }}
      </button>
      <button
        class="join-item btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        »
      </button>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import ApplicationCard from "./ApplicationCard.vue";
import { useBusinessStore } from "../../../stores/businessStore";

export default {
  data() {
    return {
      useBusinessStore,
      businessList: [], // Lista completa de negocios
      currentPage: 1, // Página actual
      itemsPerPage: 10, // Negocios por página
      showEnabled: true, // Controlar si mostrar habilitados
      showDisabled: true, // Controlar si mostrar deshabilitados
    };
  },
  computed: {
    // Computed property para filtrar la lista de negocios según los checkboxes
    // Computed property para calcular los negocios a mostrar en la página actual
    paginatedBusinessList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.businessList.slice(startIndex, endIndex);
    },
    // Computed property para calcular el número total de páginas
    totalPages() {
      return Math.ceil(this.businessList.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
    this.fetchBusinessList();
  },
  methods: {
    // Método para cargar los negocios
    async fetchBusinessList() {
      try {
        this.useBusinessStore.getNonValidate();
        this.businessList = this.useBusinessStore.allNonValidated;
      } catch (error) {
        console.error("Error al obtener negocios:", error);
      }
    },
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return; // Prevenir ir a páginas fuera de rango
      this.currentPage = page;
    },
  },
  components: {
    ApplicationCard,
    SearchBar,
  },
};
</script>

<style scoped>
.join {
  display: flex;
  justify-content: center;
  align-items: center;
}

.join-item {
  margin: 0 5px;
}
</style>
