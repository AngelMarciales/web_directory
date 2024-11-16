<template>
  <div class="grid grid-cols-8 grid-rows-1 gap-2">
    <div class="col-span-5 title3">Comentarios</div>
  </div>
  <div>
    <div
      class="shadow-lg border-2 border-gray rounded-box"
      v-for="review in reviews"
      :key="review.id"
    >
      <ReviewCard :review="review" />
    </div>
  </div>
</template>

<script>
import ReviewCard from "./ReviewCard.vue";

export default {
  components: {
    ReviewCard,
  },
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      reviews: [], // Estado local para las reseñas
    };
  },
  mounted() {
    this.syncReviews(); // Inicializamos las reseñas
  },
  watch: {
    // Observamos cambios en business.reviews
    "business.reviews": {
      handler(newReviews) {
        this.reviews = newReviews; // Actualizamos el estado local
      },
      deep: true, // Observar cambios profundos en el array de reseñas
    },
  },
  methods: {
    syncReviews() {
      this.reviews = this.business.reviews || [];
    },
  },
};
</script>

<style scoped>
.main-content {
  padding: 10px 10px;
}

.review-card {
  margin-bottom: 16px; 
}
</style>
