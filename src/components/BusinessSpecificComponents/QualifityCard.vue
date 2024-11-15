<template>
  <div
    class="main-content grid grid-cols-8 grid-rows-auto gap-3 shadow-lg border-2 border-gray rounded-box"
  >
    <div class="col-span-8">
      <h2 class="title3">¿Qué tal te pareció el local?, califícalo:</h2>
    </div>
    <div class="col-span-8">
      <div class="rating flex">
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-red-500 h-8 w-8"
          :value="1"
          v-model="rating"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-red-500 h-8 w-8"
          :value="2"
          v-model="rating"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-red-500 h-8 w-8"
          :value="3"
          v-model="rating"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-red-500 h-8 w-8"
          :value="4"
          v-model="rating"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-red-500 h-8 w-8"
          :value="5"
          v-model="rating"
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
        v-model="comment"
      ></textarea>
    </div>
    <div class="col-start-6 col-span-2">
      <PrincipalButton buttonText="Enviar" @click="submitReview()" />
    </div>
  </div>
</template>

<script>
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import api from "../../config/api";
import { useUserStore } from "../../stores/user";

export default {
  components: {
    PrincipalButton,
  },
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      useUserStore,
      rating: 5, // Para guardar la calificación seleccionada
      comment: "", // Para guardar el comentario
    };
  },
  mounted(){
    this.useUserStore = useUserStore();
  },
  methods: {
    async submitReview() {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userId");
      if (!token){
        console.error("Señor  usuario usted no puede dejar reseñas con su cuenta actual. ");
        return;
      }
      console.log(this.rating)
      const reviewData = {
        review: this.rating,
        description: this.comment,
        userId: userid, // Ejemplo de incluir el ID del negocio
      };
      try {
        await api.post(`/api/businesses/${this.business.id}/reviews`, reviewData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.main-content {
  padding: 10px;
}
</style>
