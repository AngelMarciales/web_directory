<template>
  <div class="border-2">
    <div class="dropdown dropdown-left">
      <div tabindex="0" role="button" class="btn m-1">...</div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 rounded-box z-[1] absolute right-2 top-2 shadow"
      >
        <li><a @click="openModal(`edit_site_${id}`)">Editar</a></li>
        <li><a @click="openModal(`delete_site_${id}`)">Eliminar</a></li>
      </ul>
    </div>
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

  <dialog :id="`edit_site_${id}`" class="modal">
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
            <h3 class="title4 font-bold">Editar sitio</h3>
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
                placeholder="Escriba el nombre del sitio"
                class="input input-bordered w-full"
              />
              <ErrorMessage name="name"></ErrorMessage>
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

          <div class="col-span-6 row-start-3">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Latitud: </span>
              </div>
              <Field
                v-model="latitude"
                name="latitude"
                type="text"
                class="input input-bordered w-full"
                placeholder="Escriba la latitud"
              />
              <ErrorMessage name="latitude"></ErrorMessage>
            </label>
          </div>

          <div class="col-span-6 row-start-3">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Longitud: </span>
              </div>
              <Field
                v-model="longitude"
                name="longitude"
                type="text"
                class="input input-bordered w-full"
                placeholder="Escriba la longitud"
              />
              <ErrorMessage name="longitude"></ErrorMessage>
            </label>
          </div>

          <div class="col-span-6 row-start-5">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Imagenes: </span>
              </div>
              <PrincipalButton
                @click="openModal(`edit_site_image_${id}`)"
                class=""
                buttonText="Ver imagenes"
              />
            </label>
          </div>

          <div class="col-span-3 row-start-6">
            <PrincipalButton
              @click="updateSite(`edit_site_${id}`)"
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

  <dialog :id="`edit_site_image_${id}`" class="modal">
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
              selectImage(image.id);
              openModal(`delete_site_image_${id}`);
            "
            class="col-span-2 thumbnail-image h-64 w-96"
            v-for="image in site.images"
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
            @click="submitForm(`edit_site_image_${id}`)"
            class="col-start-6"
            buttonText="Agregar..."
          />
        </div>
      </Form>
    </div>
  </dialog>

  <dialog :id="`delete_site_image_${id}`" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="title4 font-bold">Borrar imagen</h3>
      <PrincipalButton
        @click="deleteImage(`delete_site_image_${id}`)"
        class="w-full col-start-2 btn-cancel"
        buttonText="Borrar"
      />
    </div>
  </dialog>

  <dialog :id="`delete_site_${id}`" class="modal">
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
          @click="deleteSite(`delete_site_${id}`)"
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

  <DefaultModal :message="message" />
</template>

<script>
import PrincipalButton from "../../GeneralComponents/PrincipalButton.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../../plugins/schema.js";
import { useSiteStore } from "../../../stores/siteStore.js";
import DefaultModal from "../../GeneralComponents/DefaultModal.vue";

export default {
  data() {
    return {
      schema,
      useSiteStore,
      id: this.site?.id,
      name: this.site?.name || "",
      description: this.site?.description || "",
      latitude: this.site?.location.latitude || 0,
      longitude: this.site?.location.longitude || 0,
      images: this.site.images,
      selectedFile: null,
      selectedImage: null,
      token: null,
      message: "",
    };
  },
  mounted() {
    this.useSiteStore = useSiteStore();
    this.fetchSites();
  },
  components: {
    PrincipalButton,
    Form,
    Field,
    ErrorMessage,
    DefaultModal,
  },
  props: {
    site: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async fetchSites() {
      try {
        await this.useSiteStore.loadSites(); // Asegurarse de que los eventos se cargan
      } catch (error) {
        console.error("Error al obtener sitios:", error);
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

    async updateSite(id) {
      const updatedData = {
        name: this.name,
        description: this.description
      };

      const updateLocation = {
        latitude: this.latitude,
        longitude: this.longitude
      };

      try {
        this.useSiteStore.updateSite(this.site.id, updatedData, updateLocation);
        this.closeModal(id);
      } catch (error) {
        this.message = "Error al actualizar el evento:";
        this.openModal("defaultmodal");
        console.error("Error al actualizar el evento:", error.data);
      }
    },

    async deleteSite(id) {
      try {
        this.useSiteStore.deleteSite(this.site.id);
        this.closeModal(id);
      } catch (error) {
        this.message = "Error al eliminar el sitio:" + error.data;
        this.openModal("defaultmodal");
        console.error("Error al eliminar el sitio:", error);
      }
    },

    handleFileUpload(site) {
      const file = site.target.files[0];
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

      const formData = new FormData();
      formData.append("image", this.selectedFile);

      try {
        this.useSiteStore.addImageToSite(this.site.id, formData);
        this.fetchSites();
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
        this.useSiteStore.removeImageFromSite(
          this.site.id,
          this.selectedImage
        );
        this.fetchSites();
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

<style scoped>
.btn-cancel {
  background: var(--primary2);
}
</style>
