<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12">
      <BusinessCard
        v-for="business in businessList"
        :key="business.id"
        :business="business"
      />
    </div>
  </div>
</template>

<script>
import BusinessCard from "./BusinessCard.vue";
import { useBusinessStore } from "../../stores/businessStore";

export default {
  data() {
    return {
      useBusinessStore,
      businessList: [],
      typeId: null,
    };
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
    this.typeId = parseInt(this.$route.params.typeId, 10);
    this.fetchBusinessList();
  },
  methods: {
    async fetchBusinessList() {
      try {
        await this.useBusinessStore.getByType(this.typeId);
        this.businessList = this.useBusinessStore.businessesByType;
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    },
  },
  components: {
    BusinessCard,
  },
};
</script>

<style scoped>
.BusinessCard {
  margin: 0;
}
</style>
