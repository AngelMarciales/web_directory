<script setup>
import CategoryCard from "../components/HomeComponents/CategoriesCard.vue";
import EventsCard from "../components/HomeComponents/EventsCard.vue";
import TouristSitesCard from "../components/HomeComponents/TouristSitesCard.vue";
import Carousel from "../components/HomeComponents/Carousel.vue";
</script>

<template>
  <div class="col-span-12 row-start-1"><Carousel /></div>
  <div class="main-content grid grid-cols-12 gap-4">
    <div class="col-span-12"><CategoryCard /></div>
    <div class="col-span-12"><EventsCard /></div>
    <div class="col-span-12"><TouristSitesCard /></div>
  </div>
</template>

<style scoped>
.main-content {
  margin: 20px 80px;
}
</style>