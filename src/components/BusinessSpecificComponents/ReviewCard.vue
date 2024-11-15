<template>
  <div class="h-full">
    <div class="bg-base-100 w-full h-full flex flex-col">
      <div class="card-body flex-1 flex flex-col justify-between p-4">
        <h2 class="font-bold text-sm title3 h-8 overflow-hidden">
          {{ review.user.username }}
        </h2>
        <h2 class="text-sm title5 overflow-hidden">{{ review.creationDate }}</h2>
        <h2 class="text-sm title5 overflow-hidden">{{ review.review }} ☆</h2>
        <p class="text text-sm max-h-24 overflow-hidden">
          {{ review.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
