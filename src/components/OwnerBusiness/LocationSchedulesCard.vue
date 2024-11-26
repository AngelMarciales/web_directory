<template>
  <div class="grid grid-cols-8 grid-rows-1 gap-2">
    <div class="col-span-5 title3">Ubicación y Horarios de Atención</div>
  </div>
  <div
    class="grid grid-cols-12 grid-rows-1 gap-4 w-full h-full shadow-lg border-2 border-gray rounded-box"
  >
    <div class="col-span-6 row-span-1 relative">
      <div class="dropdown dropdown-left">
        <div tabindex="0" role="button" class="btn m-1">...</div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box absolute top-2 right-2 z-10 shadow"
        >
          <li>
            <a @click="openModal(`edit_location_${business.id}`)">Editar</a>
          </li>
        </ul>
      </div>
      <LocationCard :business="business" />
    </div>
    <div class="col-span-6 row-span-1 col-start-7">
      <div class="dropdown dropdown-left">
        <div tabindex="0" role="button" class="btn m-1">...</div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box absolute top-2 right-2 z-10 shadow"
        >
          <li>
            <a @click="openModal(`edit_schedules_${business.id}`)">Editar</a>
          </li>
        </ul>
      </div>
      <SchedulesCard :business="business" />
    </div>
  </div>

  <dialog :id="`edit_location_${business.id}`" class="modal">
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
              @click="updateLocation(`edit_location_${business.id}`)"
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

  <dialog :id="`edit_schedules_${business.id}`" class="modal">
    <div class="modal-box w-11/12 max-w-md">
      <h3 class="title4 font-bold">Editar Horarios</h3>
      <form method="dialog">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <div class="grid grid-cols-3 grid-rows-auto gap-4">
          <div>
            <div class="label">
              <span class="label-text">Dia</span>
            </div>
          </div>
          <div>
            <div class="label">
              <span class="label-text">Hora de apertura</span>
            </div>
          </div>
          <div>
            <div class="label">
              <span class="label-text">Hora de cierre</span>
            </div>
          </div>
          <div>
            <div class="label">
              <span class="label-text">Lunes: </span>
            </div>
          </div>
          <div>
            <select id="hora" v-model="mondayOpening">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="mondayClosing">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <div class="label">
              <span class="label-text">Martes: </span>
            </div>
          </div>
          <div>
            <select id="hora" v-model="tuesdayOpening">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="tuesdayClosing">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <div class="label">
              <span class="label-text">Miercoles: </span>
            </div>
          </div>
          <div>
            <select id="hora" v-model="wednesdayOpening">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="wednesdayClosing">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <div class="label">
              <span class="label-text">Jueves: </span>
            </div>
          </div>
          <div>
            <select id="hora" v-model="thursdayOpening">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="thursdayClosing">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <div class="label">
              <span class="label-text">Friday: </span>
            </div>
          </div>
          <div>
            <select id="hora" v-model="fridayOpening">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="fridayClosing">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <div class="label">
              <span class="label-text">Sabado: </span>
            </div>
          </div>
          <div>
            <select id="hora" v-model="saturdayOpening">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="saturdayClosing">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <div class="label">
              <span class="label-text">Domingo: </span>
            </div>
          </div>
          <div>
            <select id="hora" v-model="sundayOpening">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="sundayClosing">
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div class="col-span-3">
            <div class="grid grid-cols-6 grid-rows-auto gap-4">
              <div class="col-span-3 row-start-1">
                <PrincipalButton
                  @click="updateSchedules(`edit_schedules_${business.id}`)"
                  class="w-full"
                  buttonText="Aceptar"
                />
              </div>
              <div class="col-span-3 col-start-4 row-start-1">
                <Form method="dialog">
                  <PrincipalButton
                    class="btn-cancel w-full"
                    buttonText="Cancelar"
                  />
                </Form>
              </div>
            </div>
          </div>
        </div>
      </form>
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
      hours: this.generateHours(),
      mondayOpening: this.getOpeningTime("MONDAY") || "06:00",
      mondayClosing: this.getClosingTime("MONDAY") || "18:00",
      tuesdayOpening: this.getOpeningTime("TUESDAY") || "06:00",
      tuesdayClosing: this.getClosingTime("TUESDAY") || "18:00",
      wednesdayOpening: this.getOpeningTime("WEDNESDAY") || "06:00",
      wednesdayClosing: this.getClosingTime("WEDNESDAY") || "18:00",
      thursdayOpening: this.getOpeningTime("THURSDAY") || "06:00",
      thursdayClosing: this.getClosingTime("THURSDAY") || "18:00",
      fridayOpening: this.getOpeningTime("FRIDAY") || "06:00",
      fridayClosing: this.getClosingTime("FRIDAY") || "18:00",
      saturdayOpening: this.getOpeningTime("SATURDAY") || "06:00",
      saturdayClosing: this.getClosingTime("SATURDAY") || "18:00",
      sundayOpening: this.getOpeningTime("SUNDAY") || "06:00",
      sundayClosing: this.getClosingTime("SUNDAY") || "18:00",
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
        await this.useBusinessStore.updateLocation(this.business?.id, {
          latitude: this.latitude,
          longitude: this.longitude,
        });
        this.closeModal(id);
      } catch (error) {
        console.error("Error al actualizar la ubicación:", error);
      }
    },
    generateHours() {
      let horasArray = [];
      for (let i = 0; i < 24; i++) {
        // Agrega el cero a la izquierda si es una hora menor a 10
        let hora = i < 10 ? `0${i}:00` : `${i}:00`;
        horasArray.push(hora);
      }
      return horasArray;
    },
    async updateSchedules(id) {
      // Actualizar los horarios basados en los valores de los v-model
      const updatedBusinessHours = [
        {
          dayWeek: "MONDAY",
          openingTime: this.mondayOpening,
          closingTime: this.mondayClosing,
        },
        {
          dayWeek: "TUESDAY",
          openingTime: this.tuesdayOpening,
          closingTime: this.tuesdayClosing,
        },
        {
          dayWeek: "WEDNESDAY",
          openingTime: this.wednesdayOpening,
          closingTime: this.wednesdayClosing,
        },
        {
          dayWeek: "THURSDAY",
          openingTime: this.thursdayOpening,
          closingTime: this.thursdayClosing,
        },
        {
          dayWeek: "FRIDAY",
          openingTime: this.fridayOpening,
          closingTime: this.fridayClosing,
        },
        {
          dayWeek: "SATURDAY",
          openingTime: this.saturdayOpening,
          closingTime: this.saturdayClosing,
        },
        {
          dayWeek: "SUNDAY",
          openingTime: this.sundayOpening,
          closingTime: this.sundayClosing,
        },
      ];
      try {
        await this.useBusinessStore.updateHours(
          this.business?.id,
          updatedBusinessHours
        );
        this.closeModal(id);
        window.location.reload();
      } catch (error) {
        console.error("Error al actualizar la ubicación:", error);
      }
    },
    getOpeningTime(day) {
      const daySchedule = this.business?.businessHours?.find(
        (schedule) => schedule.dayWeek === day
      );
      return daySchedule?.openingTime.slice(0, 5);
    },
    getClosingTime(day) {
      const daySchedule = this.business?.businessHours?.find(
        (schedule) => schedule.dayWeek === day
      );
      return daySchedule?.closingTime.slice(0, 5);
    },
  },
};
</script>

<style scoped>
.btn-cancel {
  background: var(--primary2);
}
</style>
