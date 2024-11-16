<template>
  <div class="main-content shadow-lg border-2 border-gray rounded-box">
    <div>
      <h2 class="title3">Filtrar por:</h2>
      <h3 class="title4">Valoración</h3>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">5 ☆☆☆☆☆</span>
          <input type="checkbox" v-model="filters.cinco_estrellas" class="checkbox" />
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">4 ☆☆☆☆</span>
          <input type="checkbox" v-model="filters.cuatro_estrellas" class="checkbox" />
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">3 ☆☆☆</span>
          <input type="checkbox" v-model="filters.tres_estrellas_estrellas" class="checkbox" />
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">2 ☆☆</span>
          <input type="checkbox" v-model="filters.dos_estrellas" class="checkbox" />
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">1 ☆</span>
          <input type="checkbox" v-model="filters.uno_estrella" class="checkbox" />
        </label>
      </div>
    </div>

  </div>
</template>

<script>
import api from '../../config/api';

export default {
  data() {
    return {
      filters: {
        cinco_estrellas: false,
        cuatro_estrellas: false,
        tres_estrellas: false,
        dos_estrellas: false,
        uno_estrella: false,
      },
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
