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
      <PageReviewCard :review="review" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PageReviewCard from "./PageReviewCard.vue";

export default {
  components: {
    PageReviewCard,
  },
  data() {
    return {
      reviews: [],
    };
  },
  mounted() {
    this.getReviews();
  },
  methods: {
    async getReviews() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token de autorización no encontrado");
          return; // Detén la ejecución si no hay token
        }
        const response = await axios.get(
          "http://localhost:8080/api/reviews/website",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.reviews = response.data;
      } catch (error) {
        console.error("Error al obtener el reporte:", error);
      }
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
