<template>
  <div class="p-10">
    <h2 class="title4 mb-10">{{ event.date }}</h2>
    <h1 class="title1 mb-10">{{ event.name }}</h1>
    <div class="carousel w-full">
      <div class="carousel-main w-full">
        <img
          v-if="images.length"
          :src="images[currentIndex].url"
          class="main-image"
        />
      </div>
    </div>
    <div class="thumbnails mb-10">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="thumbnail"
        :class="{ active: currentIndex === index }"
        @click="setCurrentImage(index)"
      >
        <img :src="image.url" class="thumbnail-image" />
      </div>
    </div>
    <p class="text mb-10">
      {{ event.description }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      events: [],
      images: [],
      event: {},
      eventid: null,
      currentIndex: 0,
    };
  },
  mounted() {
    this.eventid = parseInt(this.$route.params.eventid, 10);
    this.fetchEvents();
  },

  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/events/current"
        );
        this.events = response.data;
        this.getEvent();
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    },
    getEvent() {
      for (let site of this.events) {
        if (site.id === this.eventid) {
          this.event = site;
          this.images = site.images || [];
        } else {
          console.log("Error al obtener imagenes");
        }
      }
    },
    setCurrentImage(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.carousel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  overflow: hidden; 
  margin-bottom: 20px; 
}

.main-image {
  max-height: 100%;
  width: auto; 
  object-fit: contain; 
}

.thumbnails {
  display: flex;
  justify-content: center; 
  align-items: center; 
  flex-wrap: wrap;
}

.thumbnail {
  cursor: pointer;
  transition: transform 0.3s;
  margin: 5px; 
}

.thumbnail:hover {
  transform: scale(1.1); 
}

.thumbnail.active {
  border: 2px solid blue; 
}

.thumbnail-image {
  width: 100px; 
  height: 200px; 
  border-radius: 5px; 
  object-fit: contain; 
}
</style>
