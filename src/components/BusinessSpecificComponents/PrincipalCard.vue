<template>
  <div class="card bg-base-100 image w-full shadow-xl">
    <figure>
      <img
        :src="
          business.images && business.images.length > 0
            ? business.images[0].url
            : 'https://i.ibb.co/nnc7CkR/default-image.jpg'
        "
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title title1">{{ business.name }}</h2>
      <p class="title2">{{ reviewAverage }} ☆☆☆☆☆</p>
      <div class="card-actions justify-end">
        <PrincipalButton
          onclick="my_modal.showModal()"
          buttonText="Ver mas.."
        />
        <dialog id="my_modal" class="modal">
          <div class="modal-box w-11/12 max-w-6xl">
            <form method="dialog">
              <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <div
              class="container grid grid-cols-1 gap-10 overflow-y-auto max-h-[60vh]"
            >
              <img
                class="col-span-1 thumbnail-image h-64 w-full object-contain"
                v-for="image in business.images"
                :key="image.id"
                :src="image.url"
              />
            </div>
          </div>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script>
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import { useBusinessStore } from "../../stores/businessStore";

export default {
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      useBusinessStore,
      reviewAverage: 0,
    };
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
    this.useBusinessStore.getEnabled();
    this.getReviewAverage();
  },
  methods: {
    async getReviewAverage() {
      try {
        await this.useBusinessStore.getAverageReview(this.business?.id);
        this.reviewAverage = this.useBusinessStore.AverageReview;
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    PrincipalButton,
  },
};
</script>

<style>
.container {
  display: flex;
  align-items: center;
}

.thumbnail-image {
  display: flex;
  border-radius: 5px;
  object-fit: contain;
  align-content: center;
}

.btn-cancel {
  background: var(--primary2);
}
</style>
