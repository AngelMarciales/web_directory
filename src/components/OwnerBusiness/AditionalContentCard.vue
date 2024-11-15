<template>
  <div class="shadow-lg border-2 border-gray rounded-box h-full">
    <div class="dropdown dropdown-left">
      <div tabindex="0" role="button" class="btn m-1">...</div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 rounded-box z-[1] absolute right-2 top-2 shadow"
      >
        <li><a @click="openModal(`edit_event_${id}`)">Editar</a></li>
        <li><a @click="openModal(`delete_event_${id}`)">Eliminar</a></li>
      </ul>
    </div>
    <div class="card bg-base-100 w-full max-w-96 h-full flex flex-col">
      <figure class="px-10 pt-10 flex-1">
        <img
          :src="
            businessContent.image
              ? businessContent.image.url
              : 'https://i.ibb.co/nnc7CkR/default-image.jpg'
          "
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

  <dialog :id="`edit_event_${id}`" class="modal">
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
            <h3 class="title4 font-bold">Editar información adicional</h3>
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
                <span class="label-text">Precio: </span>
              </div>
              <Field
                v-model="price"
                name="number"
                type="text"
                class="input input-bordered w-full"
                placeholder="number "
              />
              <ErrorMessage name="createdOn"></ErrorMessage>
            </label>
          </div>

          <div class="col-span-6 row-start-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Descripción: </span>
              </div>
              <Field
                v-model="description"
                name="mixed"
                class="textarea textarea-bordered w-full"
                placeholder="Escriba una descripción"
                as="textarea"
              />
              <ErrorMessage name="mixed"></ErrorMessage>
            </label>
          </div>

          <div class="col-span-6 row-start-5">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Imagenes: </span>
              </div>
              <PrincipalButton
                @click="openModal(`edit_event_image_${id}`)"
                class=""
                buttonText="Ver imagenes"
              />
            </label>
          </div>

          <div class="col-span-3 row-start-6">
            <PrincipalButton
              @click="updateBusinessContent(`edit_event_${id}`)"
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

  <dialog :id="`edit_event_image_${id}`" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <Form :validation-schema="schema" method="dialog">
        <Form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </Form>
        <div class="container h-full grid grid-cols-6 grid-rows-auto gap-10">
          <img
            @click="
              selectImage(businessContent.image.id);
              openModal(`delete_event_image_${id}`);
            "
            class="col-span-2 thumbnail-image h-64 w-96"
            :src="businessContent.image.url"
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
            @click="submitForm(`edit_event_image_${id}`)"
            class="col-start-6"
            buttonText="Agregar..."
          />
        </div>
      </Form>
    </div>
  </dialog>

  <dialog :id="`delete_event_image_${id}`" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="title4 font-bold">Borrar imagen</h3>
      <PrincipalButton
        @click="deleteImage(`delete_event_image_${id}`)"
        class="w-full col-start-2 btn-cancel"
        buttonText="Borrar"
      />
    </div>
  </dialog>

  <dialog :id="`delete_event_${id}`" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">¿Desea continuar?</h3>
      <p class="py-4">Despues de borrar no se puede recuperar el elemento</p>
      <div class="grid grid-cols-2 grid-rows-auto">
        <PrincipalButton
          @click="deleteEvent(`delete_event_${id}`)"
          class="w-full"
          buttonText="Eliminar"
        />
        <form method="dialog">
          <PrincipalButton
            class="w-full col-start-2 btn-cancel"
            buttonText="Cancelar"
          />
        </form>
      </div>
    </div>
  </dialog>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../plugins/schema.js";
import { useBusinessStore } from "../../stores/businessStore.js";
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import api from "../../config/api.js";

export default {
  data() {
    return {
      schema,
      useBusinessStore,
      id: this.businessContent?.id,
      name: this.businessContent?.name || "",
      description: this.businessContent?.description || "",
      price: this.businessContent?.price || "",
      image: this.businessContent.image,
      imageUrl: "",
      selectedFile: null,
      selectedImage: null,
      token: null,
      message: "",
    };
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
  },
  components: {
    Form,
    Field,
    ErrorMessage,
    PrincipalButton,
  },
  props: {
    businessContent: {
      type: Object,
      required: true,
    },
    businessId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async fetchBusinessContent() {
      try {
        await this.useBusinessStore.getEnabled(); // Asegurarse de que los eventos se cargan
      } catch (error) {
        console.error("Error al obtener eventos:", error);
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

    async updateBusinessContent(id) {
      const updatedData = {
        name: this.name,
        description: this.description,
        price: this.price,
        imageurl: this.imageUrl,
      };

      try {
        this.useBusinessStore.updateContent(
          this.businessId,
          updatedData,
          this.businessContent.id
        );
        this.closeModal(id);
      } catch (error) {
        this.message = "Error al actualizar el evento:";
        this.openModal("defaultmodal");
        console.error("Error al actualizar el evento:", error.data);
      }
    },

    async deleteContent(id) {
      try {
        this.useBusinessStore.deleteContent(
          this.businessId,
          this.businessContent.id
        );
        this.closeModal(id);
      } catch (error) {
        this.message = "Error al eliminar el evento:" + error.data;
        this.openModal("defaultmodal");
        console.error("Error al eliminar el evento:", error);
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

    // Método para enviar la petición POST
    async submitForm(id) {
      if (!this.selectedFile) {
        this.message = "Por favor selecciona un archivo.";
        this.openModal("defaultmodal");
        return;
      }
      if (!token) {
        console.error("Token de autorización no encontrado");
        return null;
      }
      try {
        const formData = new FormData();
        formData.append("image", this.selectedFile);
        const token = localStorage.getItem("token");
        const response = await api.post("/api/images/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        this.imageUrl = response.data.url;
        console.log(response.data.url);
        this.businessContent.image.url = this.imageUrl;
        this.fetchBusinessContent();
        this.fetchBusinessContent();
        this.closeModal(id);
      } catch (error) {
        this.message = "Error al subir el archivo: " + error.data;
        this.openModal("defaultmodal");
        console.error("Error al subir el archivo:", error.data || error);
      }
    },

    selectImage(imageid) {
      this.selectedImage = imageid;
    },
    async deleteImage(id) {
      try {
        this.imageUrl = "";
        this.businessContent.image.url = this.imageUrl;
        this.fetchBusinessContent();
        this.closeModal(id);
        this.selectedFile = null;
      } catch (error) {
        this.message = "Error al eliminar imagenes: " + error.data;
        this.openModal("defaultmodal");
        console.error("Error al eliminar imagenes: ", error.data);
      }
    },
  },
};
</script>
