<template>
  <div class="space-y-4">
    <div class="grid grid-cols-12 grid-rows-1 gap-4">
      <div class="col-span-2 title3">Eventos</div>
      <div class="col-span-2 col-start-12 title3">
        <button onclick="add_event.showModal()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="120px"
            heigth="120px"
            fill="#00000"
          >
            <path
              d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="carousel rounded-box overflow-hidden">
      <div class="carousel-item" v-for="event in events" :key="event.id">
        <EventCard
          :event="event"
        />
      </div>
    </div>
  </div>

  <dialog id="add_event" class="modal">
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

          <div class="col-span-3 row-start-6">
            <PrincipalButton
              @click="addEvent()"
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
import { useEventStore } from "../../../stores/eventStore.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../../plugins/schema.js";
import EventCard from "./EventCard.vue";
import PrincipalButton from "../../GeneralComponents/PrincipalButton.vue";

export default {
  components: {
    EventCard,
    Form,
    Field,
    ErrorMessage,
    PrincipalButton,
  },
  data() {
    return {
      useEventStore,
      schema,
      name: "",
      description: "",
      date: "",
      token: null,
    };
  },
  mounted() {
    this.useEventStore = useEventStore();
    this.fetchEvents();
  },
  computed: {
    events() {
      return this.useEventStore.allEvents; // Usar el estado del store para los eventos
    },
  },
  methods: {
    // Función para cargar los eventos desde el store
    async fetchEvents() {
      try {
        await this.useEventStore.loadEvents(); // Asegurarse de que los eventos se cargan
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    },
    // Función para agregar un evento
    async addEvent() {
      const updatedData = {
        name: this.name,
        description: this.description,
        date: this.date,
      };
      try {
        await this.useEventStore.addEvent(updatedData); // Llamada para agregar el evento
        document.getElementById("add_event").close(); // Cerrar el modal
        this.fetchEvents(); // Recargar la lista de eventos
      } catch (error) {
        console.error("Error al crear evento:", error);
      }
    },
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel-item {
  scroll-snap-align: start;
  flex: none;
  width: 100%;
  max-width: 400px;
  margin-right: 1rem;
}

.btn-cancel {
  background: var(--primary2);
}
</style>
