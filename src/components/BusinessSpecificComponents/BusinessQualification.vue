<template>
  <div
    class="main-content grid grid-cols-8 grid-rows-2 gap-4 shadow-lg border-2 border-gray rounded-box"
  >
    <div class="col-span-4">
      <h2 class="title3">Calificación del restaurante:</h2>
    </div>
    <div class="col-span-3 col-start-6">
      <h2 class="title3">{{ reviewAverage }} ☆☆☆☆☆</h2>
    </div>

    <div class="col-span-2 row-start-2">
      <h2 class="title3">{{ reviewAverage }} estrellas:</h2>
    </div>
    <div class="col-span-6 col-start-3 row-start-2 ">
      <div class="relative rounded-full  border-2">
        <div
          class="bg-red-500 h-4 rounded-full "
          :style="{ width: (reviewAverage / 5) * 100 + '%' }"
        ></div>
        <span class="absolute left-0 text-xs text-white"
          >{{ (reviewAverage / 5) * 100 }}%</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useBusinessStore } from "../../stores/businessStore";

export default {
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      useBusinessStore,
      reviewAverage: 0,
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
        await this.useBusinessStore.getAverageReview(this.business?.id);
        this.reviewAverage = this.useBusinessStore.AverageReview;
      } catch (error) {
        console.log(error);
      }
    },
  },
 
};
</script>

<style scoped>
.main-content {
  padding: 10px 10px;
}
</style>
