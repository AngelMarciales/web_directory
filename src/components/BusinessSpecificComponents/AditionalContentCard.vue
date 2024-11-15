<template>
  <div class="shadow-lg border-2 border-gray rounded-box h-full">
    <div class="card bg-base-100 w-full max-w-96 h-full  flex flex-col">
      <figure class="px-10 pt-10 flex-1">
        <img
          :src="businessContent.image.url"
          class="rounded-xl w-full h-full max-w-96 object-cover"
        />
      </figure>
      <div class="card-body flex-1 flex flex-col justify-between">
        <h2
          style="font-weight: bold"
          class="text-sm title3 h-16 overflow-hidden"
        >
          {{ businessContent.name }}
        </h2>
        <h2
          style="font-weight: bold"
          class="text-sm title4 max-h-12 overflow-hidden"
        >
          {{ businessContent.price }}
        </h2>
        <p class="text text-sm max-h-24 overflow-hidden">
          {{ businessContent.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    businessContent: {
      type: Object,
      required: true,
    },
  },
};
</script>