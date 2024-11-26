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
              <option value="">Sin horario</option>
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="mondayClosing">
              <option value="">Sin horario</option>
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
              <option value="">Sin horario</option>
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="tuesdayClosing">
              <option value="">Sin horario</option>
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
              <option value="">Sin horario</option>
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="wednesdayClosing">
              <option value="">Sin horario</option>
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
              <option value="">Sin horario</option>
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="thursdayClosing">
              <option value="">Sin horario</option>
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
              <option value="">Sin horario</option>
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="fridayClosing">
              <option value="">Sin horario</option>
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
              <option value="">Sin horario</option>
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="saturdayClosing">
              <option value="">Sin horario</option>
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
              <option value="">Sin horario</option>
              <option v-for="hora in hours" :key="hora" :value="hora">
                {{ hora }}
              </option>
            </select>
          </div>
          <div>
            <select id="hora" v-model="sundayClosing">
              <option value="">Sin horario</option>
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
      mondayOpening: this.getOpeningTime("MONDAY"),
      mondayClosing: this.getClosingTime("MONDAY"),
      tuesdayOpening: this.getOpeningTime("TUESDAY"),
      tuesdayClosing: this.getClosingTime("TUESDAY"),
      wednesdayOpening: this.getOpeningTime("WEDNESDAY"),
      wednesdayClosing: this.getClosingTime("WEDNESDAY"),
      thursdayOpening: this.getOpeningTime("THURSDAY"),
      thursdayClosing: this.getClosingTime("THURSDAY"),
      fridayOpening: this.getOpeningTime("FRIDAY"),
      fridayClosing: this.getClosingTime("FRIDAY"),
      saturdayOpening: this.getOpeningTime("SATURDAY"),
      saturdayClosing: this.getClosingTime("SATURDAY"),
      sundayOpening: this.getOpeningTime("SUNDAY"),
      sundayClosing: this.getClosingTime("SUNDAY"),
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
      // Crea los horarios únicamente si openingTime y closingTime son válidos
      const days = [
        {
          day: "MONDAY",
          opening: this.mondayOpening,
          closing: this.mondayClosing,
        },
        {
          day: "TUESDAY",
          opening: this.tuesdayOpening,
          closing: this.tuesdayClosing,
        },
        {
          day: "WEDNESDAY",
          opening: this.wednesdayOpening,
          closing: this.wednesdayClosing,
        },
        {
          day: "THURSDAY",
          opening: this.thursdayOpening,
          closing: this.thursdayClosing,
        },
        {
          day: "FRIDAY",
          opening: this.fridayOpening,
          closing: this.fridayClosing,
        },
        {
          day: "SATURDAY",
          opening: this.saturdayOpening,
          closing: this.saturdayClosing,
        },
        {
          day: "SUNDAY",
          opening: this.sundayOpening,
          closing: this.sundayClosing,
        },
      ];

      const updatedBusinessHours = days
        .filter(({ opening, closing }) => opening && closing) // Excluir horarios nulos o vacíos
        .map(({ day, opening, closing }) => ({
          dayWeek: day,
          openingTime: opening,
          closingTime: closing,
        }));

      try {
        await this.useBusinessStore.updateHours(
          this.business?.id,
          updatedBusinessHours
        );
        this.closeModal(id);
        window.location.reload();
      } catch (error) {
        console.error("Error al actualizar los horarios:", error);
      }
    },

    getOpeningTime(day) {
      const daySchedule = this.business?.businessHours?.find(
        (schedule) => schedule.dayWeek === day
      );
      return daySchedule?.openingTime
        ? daySchedule.openingTime.slice(0, 5)
        : null;
    },
    getClosingTime(day) {
      const daySchedule = this.business?.businessHours?.find(
        (schedule) => schedule.dayWeek === day
      );
      return daySchedule?.closingTime
        ? daySchedule.closingTime.slice(0, 5)
        : null;
    },
  },
  watch: {
    business: {
      immediate: true, // Ejecutar al inicializar el componente
      handler(newBusiness) {
        if (newBusiness && newBusiness.businessHours) {
          this.mondayOpening = this.getOpeningTime("MONDAY");
          this.mondayClosing = this.getClosingTime("MONDAY");
          this.tuesdayOpening = this.getOpeningTime("TUESDAY");
          this.tuesdayClosing = this.getClosingTime("TUESDAY");
          this.wednesdayOpening = this.getOpeningTime("WEDNESDAY");
          this.wednesdayClosing = this.getClosingTime("WEDNESDAY");
          this.thursdayOpening = this.getOpeningTime("THURSDAY");
          this.thursdayClosing = this.getClosingTime("THURSDAY");
          this.fridayOpening = this.getOpeningTime("FRIDAY");
          this.fridayClosing = this.getClosingTime("FRIDAY");
          this.saturdayOpening = this.getOpeningTime("SATURDAY");
          this.saturdayClosing = this.getClosingTime("SATURDAY");
          this.sundayOpening = this.getOpeningTime("SUNDAY");
          this.sundayClosing = this.getClosingTime("SUNDAY");
        }
      },
    },
  },
};
</script>

<style scoped>
.btn-cancel {
  background: var(--primary2);
}
</style>
