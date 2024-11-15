<template>
  <div class="space-y-4">
    <div class="grid grid-cols-12 grid-rows-1 gap-4">
      <div class="col-span-2 title3">Eventos</div>
      <div @click="goEventList" class="col-span-2 col-start-11 title3">
        <a class="link">Ver más...</a>
      </div>
    </div>

    <div class="carousel rounded-box overflow-hidden">
      <div class="carousel-item" v-for="event in events" :key="event.id">
        <EventCard :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import { useEventStore } from "../../stores/eventStore";
import EventCard from "./EventCard.vue";

export default {
  data() {
    return {
      events: [],
      useEventStore,
    };
  },
  mounted() {
    this.useEventStore = useEventStore();
    this.fetchEvents();
  },
  components: {
    EventCard,
  },
  name: "EventsCard",
  props: {},
  methods: {
    async fetchEvents() {
      try {
        await this.useEventStore.loadEvents()
        this.events = this.useEventStore.allEvents;
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    },
    goEventList() {
      this.$router.push('/events');
    },
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel-item {
  scroll-snap-align: start;
  flex: none;
  width: 100%;
  max-width: 400px;
  margin-right: 1rem;
}
</style>