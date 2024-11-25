<template>
  <div class="grid grid-cols-12 grid-rows-1 gap-4">
    <div class="col-span-2 title3">Información adicional</div>
    <div class="col-span-2 col-start-12 title3">
      <button onclick="add_content.showModal()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="120px"
          heigth="120px"
          fill="#00000"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
    </div>
  </div>
  <div class="carousel rounded-box w-full">
    <div
      class="carousel-item"
      v-for="businessContent in business.businessContents"
      :key="businessContent.id"
    >
      <AditionalContentCard
        :businessContent="businessContent"
        :businessId="business.id"
      />
    </div>
  </div>

  <dialog id="add_content" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <Form :validation-schema="schema" method="dialog">
        <Form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </Form>
        <div class="grid grid-cols-6 grid-rows-auto gap-4">
          <div class="col-span-6">
            <h3 class="title4 font-bold">Agregar Contenido Adicional</h3>
          </div>
          <div class="col-span-6 row-start-2">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Nombre: </span>
              </div>
              <Field
                v-model="name"
                name="name"
                type="text"
                placeholder="Escriba el nombre del evento"
                class="input input-bordered w-full"
              />
              <ErrorMessage name="name"></ErrorMessage>
            </label>
          </div>
          <div class="col-span-6 row-start-3">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Descripción: </span>
              </div>
              <textarea
                v-model="description"
                type="text"
                class="textarea textarea-bordered w-full"
                placeholder="Escriba  la descripción del contenido"
              />
            </label>
          </div>

          <div class="col-span-6 row-start-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Price: </span>
              </div>
              <Field
                v-model="price"
                name="number"
                class="input input-bordered w-full"
                placeholder="Escriba el precio del contendo adicional, si aplica"
              />
              <ErrorMessage name="number"></ErrorMessage>
            </label>
          </div>

          <div class="row-start-5 w-full">
            <label>
              <input
                @change="handleFileUpload"
                type="file"
                class="file-input file-input-bordered"
              />
            </label>
          </div>

          <div class="col-span-3 row-start-6">
            <PrincipalButton
              @click="addContent()"
              class="w-full"
              buttonText="Aceptar"
            />
          </div>
          <div class="col-span-3 col-start-4 row-start-6">
            <Form method="dialog">
              <PrincipalButton
                class="btn-cancel w-full"
                buttonText="Cancelar"
              />
            </Form>
          </div>
        </div>
      </Form>
    </div>
  </dialog>
</template>

<script>
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import AditionalContentCard from "./AditionalContentCard.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../plugins/schema";
import { useBusinessStore } from "../../stores/businessStore";
import api from "../../config/api";

export default {
  data() {
    return {
      schema,
      useBusinessStore,
      name: "",
      description: "",
      price: 0,
      image: "https://i.ibb.co/nnc7CkR/default-image.jpg",
      selectedFile: null,
    };
  },
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
  },
  components: {
    AditionalContentCard,
    Form,
    Field,
    ErrorMessage,
    PrincipalButton,
  },
  methods: {
    async addContent() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token de autorización no encontrado");
        return null;
      }
      if (this.selectedFile != null) {
        const formData = new FormData();
        formData.append("image", this.selectedFile);
        const response = await api.post("/api/images/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.image = response.data;
      }
      const updatedData = {
        name: this.name,
        description: this.description,
        price: this.price,
        imageUrl: this.image,
      };
      try {
        await this.useBusinessStore.addContent(this.business.id, updatedData);
        document.getElementById("add_content").close();
        this.useBusinessStore.getEnabled();
        window.location.reload();
      } catch (error) {
        console.error("Error al crear contenido adicional:", error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        console.log("Archivo seleccionado:", file.name); // Depuración
      } else {
        console.log("No se seleccionó ningún archivo.");
      }
    },

    openModal(id) {
      const modal = document.getElementById(id);
      if (modal) {
        modal.showModal();
      } else {
        console.error(`Modal con id ${id} no encontrado.`);
      }
    },

    closeModal(id) {
      const modal = document.getElementById(id);
      if (modal) {
        modal.close();
      } else {
        console.error(`Modal con id ${id} no encontrado.`);
      }
    },
  },
};
</script>

<style scoped>
.btn-cancel {
  background: var(--primary2);
}
</style>
