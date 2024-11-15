<template>
  <div class="p-10">
    <h1 class="title1 mb-10">{{ site.name }}</h1>
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
      {{ site.description }}
    </p>
    <iframe
      v-if="site.location"
      class="w-full h-96"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      :src="`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=${site.location.latitude},%20${site.location.longitude}+(${site.name})&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`"
    ></iframe>
  </div>
</template>

<script>
import { useSiteStore } from '../../stores/siteStore';

export default {
  data() {
    return {
      useSiteStore,
      sites: [],
      images: [],
      site: {},
      siteid: null,
      currentIndex: 0,
    };
  },
  mounted() {
    this.useSiteStore = useSiteStore();
    this.siteid = parseInt(this.$route.params.siteid, 10);
    this.fetchSites();
  },

  methods: {
    async fetchSites() {
      try {
        await this.useSiteStore.loadSites()
        this.sites = this.useSiteStore.allSites;
        this.getSite();
      } catch (error) {
        console.error("Error al obtener sitios:", error);
      }
    },
    getSite() {
      for (let site of this.sites) {
        if (site.id === this.siteid) {
          this.site = site;
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
