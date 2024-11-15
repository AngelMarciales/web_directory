<template>
  <div @click="goToSiteDetail(site.id)" class="h-full">
    <div class="card bg-base-100 w-full max-w-96 h-full flex flex-col">
      <figure class="px-10 pt-10 flex-1">
        <img
          :src="
            site.images && site.images.length > 0
              ? site.images[0].url
              : 'https://i.ibb.co/nnc7CkR/default-image.jpg'
          "
          class="rounded-xl w-full h-full max-h-64 object-cover"
        />
      </figure>
      <div class="card-body flex-1 flex flex-col justify-between">
        <h2 class="font-bold text-sm title3 h-16 overflow-hidden">
          {{ site.name }}
        </h2>
        <p class="text text-sm h-24 overflow-hidden">
          {{ site.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    site: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToSiteDetail(siteid) {
      this.$router.push(`/tourist-sites/tourist-site-detail/${siteid}`);
    },
  },
};
</script>

<style scoped></style>
