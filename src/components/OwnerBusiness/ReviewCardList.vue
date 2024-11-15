<template>
  <div
    class="grid grid-cols-8 grid-rows-1 gap-2"
  >
    <div class="col-span-5 title3">Comentarios</div>
  </div>
  <div>
    <div
      class="shadow-lg border-2 border-gray rounded-box"
      v-for="review in business.reviews"
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
