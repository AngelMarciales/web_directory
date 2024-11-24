<template>
  <div
    @click="goToBusiness(business.id)"
    class="card card-side bg-base-100 shadow-lg border-2 border-gray rounded-box gap-4"
  >
    <figure  class="w-64 h-64  flex-shrink-0">
      <img
        :src="
          business.images && business.images.length > 0
            ? business.images[0].url
            : 'https://i.ibb.co/nnc7CkR/default-image.jpg'
        "
        class="h-full w-full object-cover"
      />
    </figure>
    <div class="card-body p-2">
      <h2 class="card-title title3 text-base">{{ business.name }}</h2>
      <p class="title1" style="font-size: 1.25rem">
        {{ averageReview }} ☆
      </p>
      <div class="badge" v-for="(tag, index) in business.tags" :key="index">
        {{ tag }}
      </div>
      <p class="text text-sm">
        {{ business.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { useBusinessStore } from '../../stores/businessStore';

export default {
  name: "BusinessCard",
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  data(){
    return {
      useBusinessStore,
      averageReview: 0,
    }
  },
  mounted(){
    this.useBusinessStore = useBusinessStore();
    this.getAverageReview();
  },
  methods: {
    async getAverageReview() {
      try {
        console.log("Aqui esta el error")
        await this.useBusinessStore.getAverageReview(this.business?.id);
        this.averageReview = this.useBusinessStore.AverageReview;
      } catch (error) {
        console.error("Error al obtener el promedio de reseñas:", error);
      }
    },
    goToBusiness(businessid) {
      this.$router.push({
        name: "BusinessDetail",
        params: { businessId: businessid },
      });
    },
  },
};
</script>

<style scoped></style>
