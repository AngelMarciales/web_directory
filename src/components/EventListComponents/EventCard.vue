<template>
  <div
    @click="goToEvent(event.id)"
    class="card card-side bg-base-100 shadow-lg border-2 border-gray rounded-lg hover:shadow-xl transition-shadow duration-200 p-10"
  >
    <div
      class="bg-base-100 w-full max-w-96 max-h-80 h-full flex flex-col border-2 border-gray"
    >
      <figure>
        <img
          :src="
            event.images && event.images.length > 0
              ? event.images[0].url
              : 'https://i.ibb.co/nnc7CkR/default-image.jpg'
          "
          class="h-full w-full object-cover"
        />
      </figure>
    </div>

    <div class="card-body p-10">
      <h2 class="card-title title3">{{ event.name }}</h2>
      <p class="title4 text-gray-600">
        {{ event.date }}
      </p>
      <p class="text text-sm text-gray-700 h-24 overflow-hidden">
        {{ event.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToEvent(eventid) {
      this.$router.push({ name: "EventDetail", params: { eventid: eventid } });
    },
  },
};
</script>

<style scoped></style>
