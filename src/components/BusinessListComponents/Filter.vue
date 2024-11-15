<template>
  <div class="main-content shadow-lg border-2 border-gray rounded-box">
    <div>
      <h2 class="title3">Filtrar por:</h2>
      <h3 class="title4">Precio</h3>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">$</span>
          <input type="checkbox" v-model="filters.economico" class="checkbox" />
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">$$</span>
          <input type="checkbox" v-model="filters.moderado" class="checkbox" />
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">$$$</span>
          <input type="checkbox" v-model="filters.caro" class="checkbox" />
        </label>
      </div>
    </div>

    <h3 class="title4">Categorías más populares</h3>
    <div class="form-control" v-for="(category, index) in categories" :key="index">
      <label class="label cursor-pointer">
        <span class="label-text">{{ category.name }}</span>
        <input type="checkbox" v-model="category.checked" class="checkbox" />
      </label>
    </div>

    <h3 class="title4">Valoración</h3>
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">5 ☆☆☆☆☆</span>
        <input type="checkbox" v-model="filters.peluquerias" class="checkbox" />
      </label>
    </div>
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">Otros</span>
        <input type="checkbox" v-model="filters.otros" class="checkbox" />
      </label>
    </div>
  </div>
</template>

<script>
import api from '../../config/api';

export default {
  data() {
    return {
      filters: {
        economico: false,
        moderado: false,
        caro: false,
        peluquerias: false,
        otros: false,
      },
      categories: [
        { name: 'Restaurantes', checked: false },
        { name: 'Hoteles', checked: false },
        { name: 'Tiendas', checked: false },
        { name: 'Farmacias', checked: false },
        { name: 'Supermercados', checked: false },
      ],
    };
  },
  methods:{
    
  }
};
</script>

<style scoped>
.main-content {
  padding: 10px;
}
</style>
