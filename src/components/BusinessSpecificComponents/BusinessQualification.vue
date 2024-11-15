<template>
  <div
    class="main-content grid grid-cols-8 grid-rows-6 gap-4 shadow-lg border-2 border-gray rounded-box"
  >
    <div class="col-span-4">
      <h2 class="title3">Calificación del restaurante:</h2>
    </div>
    <div class="col-span-3 col-start-6">
      <h2 class="title3">{{ reviewAverage }} ☆☆☆☆☆</h2>
    </div>

    <div class="col-span-2 row-start-2">
      <h2 class="title3">5 estrellas:</h2>
    </div>
    <div class="col-span-6 col-start-3 row-start-2">
      <div class="relative">
        <div
          class="bg-red-500 h-4 rounded-full"
          :style="{ width: '57.5%' }"
        ></div>
        <!-- Reemplaza 80% con el porcentaje real -->
        <span class="absolute left-0 text-xs text-white">100%</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useBusinessStore } from "../../stores/businessStore";

export default {
  data() {
    return {
      useBusinessStore,
      reviewAverage: null,
    };
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
    this.useBusinessStore.getEnabled();
    this.getReviewAverage();
  },
  methods: {
    async getReviewAverage() {
      try {
        await this.useBusinessStore.getAverageReview(this.business.id);
        this.useBusinessStore.getEnabled();

        this.reviewAverage = this.useBusinessStore.AverageReview;

        console.log(this.reviewAverage);
      } catch (error) {
        console.log(error);
      }
    },
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
</style>
