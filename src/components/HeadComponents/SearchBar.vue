<template>
  <div class="w-full sm:w-1/2 md:w-2/3 lg:w-80 mx-auto">
    <label class="input input-bordered flex items-center gap-2">
      <input
        type="text"
        class="w-full py-2 px-4"
        v-model="searchTerm"
        @input="updateSearchTerm"
        placeholder="Buscar"
      />
      <img
        src="/src/assets/serchIcon.svg"
        alt="Icono de búsqueda"
        class="h-6 w-6 opacity-70"
      />
    </label>
  </div>
</template>

<script>
import { useBusinessStore } from '../../stores/businessStore';

export default {
  computed: {
    searchTerm: {
      get() {
        const store = useBusinessStore();
        return store.searchTerm;
      },
      set(value) {
        const store = useBusinessStore();
        store.setSearchTerm(value);
      },
    },
  },
  methods: {
    updateSearchTerm() {
      // Se actualiza el término de búsqueda en el store
      const store = useBusinessStore();
      store.setSearchTerm(this.searchTerm);
    },
  },
  gotoBusiness(){
    
  }
};
</script>
