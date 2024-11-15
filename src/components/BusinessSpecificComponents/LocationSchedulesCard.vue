<template>
  <div
    class="grid grid-cols-8 grid-rows-1 gap-2"
  >
    <div class="col-span-5 title3">Ubicación y Horarios de Atención</div>
  </div>
<div class="grid grid-cols-12 grid-rows-1 gap-4 w-full h-full shadow-lg border-2 border-gray rounded-box">
    <div class="col-span-6 row-span-1"><LocationCard :business="business"/></div>
    <div class="col-span-6 row-span-1 col-start-7"><SchedulesCard :business="business"/></div>
</div>
</template>

<script>
import LocationCard from './LocationCard.vue';
import SchedulesCard from './SchedulesCard.vue';
export default {
  components: {
    LocationCard,
    SchedulesCard
  },
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
};
</script>