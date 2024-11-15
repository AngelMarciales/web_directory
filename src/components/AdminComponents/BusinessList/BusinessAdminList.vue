<template>
  <div>
    <SearchBar />

    <div class="grid grid-cols-6 grid-rows-2 gap-4">
      <div class="row-span-2 col-span-4 title3">Listas de Negocios</div>
      <div class="col-start-6">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Habilitados</span>
            <input type="checkbox" v-model="showEnabled" class="checkbox" />
          </label>
        </div>
      </div>
      <div class="col-start-6 row-start-2">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Deshabilitados</span>
            <input type="checkbox" v-model="showDisabled" class="checkbox" />
          </label>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-2">
      <div class="col-span-12">
        <BusinessAdminCard
          v-for="business in filteredBusinessList"
          :key="business.id"
          :business="business"
          @statusChanged="fetchBusinessList"
        />
      </div>
    </div>

    <!-- Controles de paginación -->
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
import BusinessAdminCard from "./BusinessAdminCard.vue";
import { useBusinessStore } from "../../../stores/businessStore";

export default {
  data() {
    return {
      businessList: [],
      currentPage: 1, // Página actual
      itemsPerPage: 10, // Negocios por página
      showEnabled: true, // Controlar si mostrar habilitados
      showDisabled: true, // Controlar si mostrar deshabilitados
      useBusinessStore,
    };
  },
  computed: {
    // Computed property para filtrar la lista de negocios según los checkboxes
    filteredBusinessList() {
      return this.businessList.filter((business) => {
        const isEnabled = business.status === "ENABLED";
        const isDisabled = business.status === "DISABLED";
        return (
          (this.showEnabled && isEnabled) || (this.showDisabled && isDisabled)
        );
      });
    },
    // Computed property para calcular los negocios a mostrar en la página actual
    paginatedBusinessList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredBusinessList.slice(startIndex, endIndex);
    },
    // Computed property para calcular el número total de páginas
    totalPages() {
      return Math.ceil(this.filteredBusinessList.length / this.itemsPerPage);
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
        await this.useBusinessStore.getEnabled();
        await this.useBusinessStore.getDisabled();
        this.businessList = this.useBusinessStore.allEnabled.concat(
          this.useBusinessStore.allDisabled
        );
      } catch (error) {
        console.error("Error al obtener negocios:", error);
      }
    },
    // Método para cambiar a la página seleccionada
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return; // Prevenir ir a páginas fuera de rango
      this.currentPage = page;
    },
  },
  components: {
    BusinessAdminCard,
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
