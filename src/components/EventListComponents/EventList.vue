<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script>
import EventCard from "./EventCard.vue";
import { useEventStore } from "../../stores/eventStore";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      useEventStore,
      events: [],
    };
  },
  mounted() {
    this.useEventStore = useEventStore();
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        await this.useEventStore.loadEvents();
        this.events = this.useEventStore.allEvents;
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    },
  },
};
</script>
