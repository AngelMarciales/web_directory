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
    <div class="col-start-1 col-span-8 gap">
      <div class="grid grid-cols-6 grid-rows-1 gap-4">
        <PrincipalButton
          buttonText="Eliminar"
          @click="deleteReview()"
          class="btn-cancel"
        />
        <PrincipalButton
          buttonText="Enviar"
          @click="submitReview()"
          class="col-start-5"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import api from "../../config/api";
import { useUserStore } from "../../stores/user";
import { useBusinessStore } from "../../stores/businessStore";

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
      useBusinessStore,
      reviewId: null,
      reviews: [],
      rating: 5,
      comment: "",
    };
  },
  mounted() {
    this.useUserStore = useUserStore();
    this.useBusinessStore = useBusinessStore();
    this.reviews = this.business?.reviews;
  },
  methods: {
    async comprobateReview() {
      try {
        const userId = parseInt(localStorage.getItem("userId"), 10);
        if (!userId) {
          return;
        }

        const userReview = this.business?.reviews.find(
          (review) => review.user.id === userId
        );

        if (userReview) {
          this.rating = userReview.review;
          this.comment = userReview.description;
          this.reviewId = userReview.id;
        }
      } catch (error) {
        console.error("Error al comprobar la reseña del usuario:", error);
      }
    },

    async submitReview() {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const userid = localStorage.getItem("userId");
      if (!role) {
        this.$emit("open-modal", "modal_review");
        return;
      } else if (role != "TOURIST") {
        alert(
          "Señor usuario usted no puede dejar reseñas con su cuenta actual."
        );
        return;
      }
      const reviewData = {
        review: this.rating,
        description: this.comment,
        userId: userid,
      };

      try {
        if (this.reviewId) {
          await api.put(
            `/api/businesses/${this.business.id}/reviews/${this.reviewId}`,
            reviewData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          window.location.reload();
        } else {
          await api.post(
            `/api/businesses/${this.business.id}/reviews`,
            reviewData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    },

    async deleteReview() {
      const token = localStorage.getItem("token");
      if (this.reviewId) {
        await api.delete(
            `/api/businesses/${this.business.id}/reviews/${this.reviewId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          window.location.reload();
      }else{
        alert("Señor usuario ud no tiene reseñas para eliminar");
      }
    },
  },
  watch: {
    business: {
      handler(newBusiness) {
        if (newBusiness?.reviews) {
          this.comprobateReview();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.main-content {
  padding: 10px;
}

.btn-cancel {
  background: var(--primary2);
}
</style>
