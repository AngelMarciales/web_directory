<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script>
import EventCard from "./EventCard.vue";
import axios from "axios";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get('http://localhost:8080/api/events/current');
        this.events = response.data;
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    },
  },
};
</script>
