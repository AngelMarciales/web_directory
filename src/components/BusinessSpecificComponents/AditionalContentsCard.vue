<template>
  <div
    class="grid grid-cols-8 grid-rows-1 gap-2"
  >
    <div class="col-span-5 title3">Información Adicional</div>
  </div>
  <div class="carousel rounded-box w-full">
    <div
      class="carousel-item"
      v-for="businessContent in business.businessContents"
      :key="businessContent.id"
    >
      <AditionalContentCard :businessContent="businessContent" />
    </div>
  </div>
</template>

<script>
import AditionalContentCard from "./AditionalContentCard.vue";
export default {
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  components: {
    AditionalContentCard,
  },
};
</script>
