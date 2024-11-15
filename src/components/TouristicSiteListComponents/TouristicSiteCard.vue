<template>
  <div
    @click="goToTouristicSite(site.id)"
    class="card card-side bg-base-100 shadow-lg border-2 border-gray rounded-lg hover:shadow-xl transition-shadow duration-200 p-10"
  >
    <div
      class="bg-base-100 w-full max-w-96 min-w-96 max-h-80 h-full flex flex-col border-2 border-gray"
    >
      <figure>
        <img
          :src="
            site.images && site.images.length > 0
              ? site.images[0].url
              : 'https://i.ibb.co/nnc7CkR/default-image.jpg'
          "
          class="h-full w-full object-cover"
        />
      </figure>
    </div>

    <div class="card-body p-10">
      <h2 class="card-title title3">{{ site.name }}</h2>
      <p class="text text-sm text-gray-700 h-24 overflow-hidden">
        {{ site.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TouristicSiteCard",
  props: {
    site: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToTouristicSite(siteid) {
      this.$router.push({
        name: "TouristSiteDetail",
        params: { siteid: siteid },
      });
    },
  },
};
</script>

<style scoped></style>
