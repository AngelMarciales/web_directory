<template>
  <div class="border-2">
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
            event.images && event.images.length > 0
              ? event.images[0].url
              : 'https://i.ibb.co/nnc7CkR/default-image.jpg'
          "
          class="rounded-xl w-full h-full max-h-64 object-cover"
        />
      </figure>
      <div class="card-body flex-1 flex flex-col justify-between">
        <h2 class="text-sm title5 overflow-hidden">{{ event.date }}</h2>
        <h2 class="font-bold text-sm title3 h-16 overflow-hidden">
          {{ event.name }}
        </h2>
        <p class="text text-sm h-24 overflow-hidden">
          {{ event.description }}
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
            <h3 class="title4 font-bold">Editar evento</h3>
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
                <span class="label-text">Fecha: </span>
              </div>
              <Field
                v-model="date"
                name="createdOn"
                type="date"
                class="input input-bordered w-full"
                placeholder="Escriba "
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
              @click="updateEvent(`edit_event_${id}`)"
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
              selectImage(image.id);
              openModal(`delete_event_image_${id}`);
            "
            class="col-span-2 thumbnail-image h-64 w-96"
            v-for="image in event.images"
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

  <DefaultModal :message="message" />
</template>

<script>
import PrincipalButton from "../../GeneralComponents/PrincipalButton.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../../plugins/schema.js";
import { useEventStore } from "../../../stores/eventStore.js";
import DefaultModal from "../../GeneralComponents/DefaultModal.vue";

export default {
  data() {
    return {
      schema,
      useEventStore,
      id: this.event?.id,
      name: this.event?.name || "",
      description: this.event?.description || "",
      date: this.event?.date || "",
      images: this.event.images,
      selectedFile: null,
      selectedImage: null,
      token: null,
      message: "",
    };
  },
  mounted() {
    this.useEventStore = useEventStore();
    this.fetchEvents();
  },
  components: {
    PrincipalButton,
    Form,
    Field,
    ErrorMessage,
    DefaultModal,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async fetchEvents() {
      try {
        await this.useEventStore.loadEvents(); // Asegurarse de que los eventos se cargan
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

    async updateEvent(id) {
      const updatedData = {
        name: this.name,
        description: this.description,
        date: this.date,
      };

      try {
        this.useEventStore.updateEvent(this.event.id, updatedData);
        this.closeModal(id);
      } catch (error) {
        this.message = "Error al actualizar el evento:";
        this.openModal("defaultmodal");
        console.error("Error al actualizar el evento:", error.data);
      }
    },

    async deleteEvent(id) {
      try {
        this.useEventStore.deleteEvent(this.event.id);
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

      const formData = new FormData();
      formData.append("image", this.selectedFile);

      try {
        this.useEventStore.addImageToEvent(this.event.id, formData);
        this.fetchEvents();
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
        this.useEventStore.removeImageFromEvent(
          this.event.id,
          this.selectedImage
        );
        this.fetchEvents();
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
