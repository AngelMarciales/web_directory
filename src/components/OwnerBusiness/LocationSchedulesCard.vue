<template>
  <div class="grid grid-cols-8 grid-rows-1 gap-2">
    <div class="col-span-5 title3">Ubicación y Horarios de Atención</div>
  </div>
  <div
    class="grid grid-cols-12 grid-rows-1 gap-4 w-full h-full shadow-lg border-2 border-gray rounded-box"
  >
    <div class="col-span-6 row-span-1 relative">
      <div class="dropdown dropdown-left ">
        <div tabindex="0" role="button" class="btn m-1">...</div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box absolute top-2 right-2 z-10 shadow"
        >
          <li><a @click="openModal(`edit_location_${id}`)">Editar</a></li>
        </ul>
      </div>
      <LocationCard :business="business" />
    </div>
    <div class="col-span-6 row-span-1 col-start-7">
      <SchedulesCard :business="business" />
    </div>
  </div>

  <dialog :id="`edit_location_${id}`" class="modal">
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
            <h3 class="title4 font-bold">Editar ubicación</h3>
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

          <div class="col-span-6 row-start-4">
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
          <div class="col-span-3 row-start-6">
            <PrincipalButton
              @click="updateLocation(`edit_location_${id}`)"
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
import LocationCard from "./LocationCard.vue";
import SchedulesCard from "./SchedulesCard.vue";
import { useBusinessStore } from "../../stores/businessStore";
import { schema } from "../../plugins/schema";
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  props: {
    business: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    }
  },
  components: {
    LocationCard,
    SchedulesCard,
    PrincipalButton,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      schema,
    };
  },
  computed: {
    useBusinessStore() {
      return useBusinessStore();
    },
    latitude: {
      get() {
        return this.business?.location?.latitude || 0;
      },
      set(value) {
        this.business.location.latitude = value;
      },
    },
    longitude: {
      get() {
        return this.business?.location?.longitude || 0;
      },
      set(value) {
        this.business.location.longitude = value;
      },
    },
  },
  methods: {
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
    async updateLocation(id) {
      try {
        await this.useBusinessStore.updateLocation(this.id, {
          latitude: this.latitude,
          longitude: this.longitude,
        });
        this.closeModal(id);
      } catch (error) {
        console.error("Error al actualizar la ubicación:", error);
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