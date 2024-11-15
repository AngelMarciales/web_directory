<template>
  <div class="w-full h-full">
    <iframe
    v-if="business.location"
      class="w-full h-full"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      :src="`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=${business.location.latitude},%20${business.location.longitude}+(${business.name})&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`"
    ></iframe>
  </div>
</template>

<script>
export default{
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
}
</script>
