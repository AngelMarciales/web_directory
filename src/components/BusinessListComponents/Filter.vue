<template>
  <div class="main-content shadow-lg border-2 border-gray rounded-box">
    <div>
      <h2 class="title3">Filtrar por:</h2>
      <h3 class="title4">Valoración</h3>
      <div class="form-control" v-for="rating in [5.0, 4.0, 3.0, 2.0, 1.0]" :key="rating">
        <label class="label cursor-pointer">
          <span class="label-text">{{ rating }} ☆</span>
          <input
            type="checkbox"
            :value="rating"
            v-model="selectedRatings"
            class="checkbox"
            @change="updateFilters"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { useBusinessStore } from "../../stores/businessStore";

export default {
  data() {
    return {
      selectedRatings: [], 
      
    };
  },
  methods: {
    updateFilters() {
      const store = useBusinessStore();
      store.updateRatingsFilter(this.selectedRatings); // Enviamos los filtros seleccionados al store
    },
  },
};
</script>