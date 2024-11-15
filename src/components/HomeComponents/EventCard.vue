<template>
  <div @click="goToEventDetail(event.id)">
    <div class="card bg-base-100 w-full max-w-96 h-full flex flex-col">
      <figure class="px-10 pt-10 flex-1">
        <img
        :src="
          event.images && event.images.length > 0
            ? event.images[0].url
            : 'https://i.ibb.co/nnc7CkR/default-image.jpg'
        "
          class="rounded-xl w-full h-full max-h-64 object-cover"
        />
      </figure>
      <div class="card-body flex-1 flex flex-col justify-between">
        <h2 class="text-sm title5 overflow-hidden">{{ event.date }}</h2>
        <h2 class="font-bold text-sm title3 h-16 overflow-hidden">
          {{ event.name }}
        </h2>
        <p class="text text-sm h-24 overflow-hidden">
          {{ event.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToEventDetail(eventid) {
      this.$router.push(`/events/event-detail/${eventid}`);
    },
  },
};
</script>

<style scoped></style>
