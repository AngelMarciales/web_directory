<template>
  <div class="main-content grid grid-cols-8 grid-rows-auto gap-3 shadow-lg border-2 border-gray rounded-box">
    <div class="col-span-8">
      <h2 class="title3">¿Qué tal te pareció el local?, califícalo:</h2>
    </div>
    <div class="col-span-8">
      <div class="rating flex">
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-red-500 h-8 w-8"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-red-500 h-8 w-8"
          checked="checked"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-red-500 h-8 w-8"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-red-500 h-8 w-8"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-red-500 h-8 w-8"
        />
      </div>
    </div>
    <div class="col-span-8">
      <h2 class="title3">Deja un comentario:</h2>
    </div>
    <div class="col-span-8">
      <textarea
        class="textarea textarea-bordered w-full h-32"
        placeholder="Escribe una reseña"
      ></textarea>
    </div>
    <div class="col-start-6 col-span-2">
      <PrincipalButton buttonText="Enviar"/>
    </div>
  </div>
</template>

<script>
import PrincipalButton from '../GeneralComponents/PrincipalButton.vue';

export default{
  components: {
    PrincipalButton
  },
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.main-content {
  padding: 10px;
}
</style>