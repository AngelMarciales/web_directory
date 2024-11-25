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
          @click="openModal('my_modal')"
          buttonText="Ver más..."
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
                @click="selectImage(image.id); openModal('delete_business_image')"
                class="col-span-1 thumbnail-image h-64 w-full object-contain"
                v-for="image in images"
                :key="image.id"
                :src="image.url"
              />
            </div>
            <br />
            <br />
            <div class="grid grid-cols-6 grid-rows-auto gap-4">
              <label>
                <input
                  @change="handleFileUpload"
                  type="file"
                  class="file-input file-input-bordered col-start-3"
                />
              </label>
              <PrincipalButton
                @click="submitForm()"
                class="col-start-6"
                buttonText="Agregar..."
              />
            </div>
          </div>
        </dialog>
      </div>
    </div>
  </div>

  <dialog id="delete_business_image" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="title4 font-bold">Borrar imagen</h3>
      <PrincipalButton
        @click="deleteImage()"
        class="w-full col-start-2 btn-cancel"
        buttonText="Borrar"
      />
    </div>
  </dialog>
</template>

<script>
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import { useBusinessStore } from "../../stores/businessStore";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  data() {
    return {
      useBusinessStore,
      reviewAverage: 0,
      selectedFile: null,
      selectedImage: null,
      images: [], // Lista de imágenes para el modal
    };
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
    this.useBusinessStore.getEnabled();
    this.getReviewAverage();
    this.fetchBusiness();
  },
  methods: {
    async fetchBusiness() {
      try {
        await this.useBusinessStore.getById(this.business?.id);
        this.images = this.useBusinessStore.businessesById.images;
      } catch (error) {
        console.log(error);
      }
    },
    async getReviewAverage() {
      try {
        await this.useBusinessStore.getAverageReview(this.business?.id);
        this.reviewAverage = this.useBusinessStore.AverageReview;
      } catch (error) {
        console.log(error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        console.log("Archivo seleccionado:", file.name);
      } else {
        console.log("No se seleccionó ningún archivo.");
      }
    },
    async submitForm() {
      if (!this.selectedFile) {
        alert("Por favor agregue un archivo");
        return;
      }
      const formData = new FormData();
      formData.append("image", this.selectedFile);

      try {
        await this.useBusinessStore.addImage(this.business?.id, formData);
        this.fetchBusiness(); // Actualizamos las imágenes sin cerrar el modal
      } catch (error) {
        alert("Error al subir archivo", error);
        console.log(error);
      }
    },
    selectImage(imageid) {
      this.selectedImage = imageid;
    },
    async deleteImage() {
      try {
        await this.useBusinessStore.removeImage(this.business.id, this.selectedImage);
        this.fetchBusiness(); // Actualizamos las imágenes sin cerrar el modal
        this.closeModal('delete_business_image');
      } catch (error) {
        console.error("Error al eliminar imagenes: ", error);
      }
    },
    openModal(id) {
      const modal = document.getElementById(id);
      if (modal) {
        modal.showModal(); // Abrimos el modal sin cerrarlo
      } else {
        console.error(`Modal con id ${id} no encontrado.`);
      }
    },

    closeModal(id) {
      const modal = document.getElementById(id);
      if (modal) {
        modal.close(); // Solo cerramos el modal de eliminar
      } else {
        console.error(`Modal con id ${id} no encontrado.`);
      }
    },
  },
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  components: {
    PrincipalButton,
    Form,
    Field,
    ErrorMessage,
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