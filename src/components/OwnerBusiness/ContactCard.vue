<template>
  <div class="card bg-base-100 w-96 shadow-xl">
    <div class="dropdown dropdown-left">
      <div tabindex="0" role="button" class="btn m-1">...</div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 rounded-box z-[1] absolute right-2 top-2 shadow"
      >
        <li><a @click="openModal(`edit_contact_${business.id}`)">Editar</a></li>
      </ul>
    </div>
    <div class="card-body">
      <h2 class="card-title">Contacto</h2>
      <p>{{ business.phoneNumber }}</p>
      <p>_________________________________________________</p>

      <h2 class="card-title">Dirección</h2>
      <p>{{ business.address }}</p>
      <p>_________________________________________________</p>
      <h2 class="card-title">Dirección</h2>
      <a class="link">{{ business.website }}</a>
    </div>
  </div>

  <dialog :id="`edit_contact_${business.id}`" class="modal">
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
            <h3 class="title3 font-bold">Editar información de contacto</h3>
          </div>
          <div class="col-span-6 row-start-3">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text title5">Numero de telefono: </span>
              </div>
              <Field
                name="phone"
                type="text"
                v-model="phoneNumber"
                placeholder="Escribe el numero de contacto de tu negocio"
                class="input input-bordered w-full"
              />
              <ErrorMessage name="phone"></ErrorMessage>
            </label>
          </div>
          <div class="col-span-3 row-start-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text title5">Dirección: </span>
              </div>
              <Field
                name="address"
                v-model="address"
                type="text"
                placeholder="Escribe la dirección de tu negocio"
                class="input input-bordered w-full"
                required
              />
              <ErrorMessage name="address"></ErrorMessage>
            </label>
          </div>
          <div class="col-span-3 col-start-4 row-start-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text title5">Pagina Web:</span>
              </div>
              <Field
                name="website"
                v-model="website"
                type="text"
                placeholder="Escribe la dirección web de tu sitio"
                class="input input-bordered w-full"
                required
              />
              <ErrorMessage name="website"></ErrorMessage>
            </label>
          </div>

          <div class="col-span-3 row-start-9">
            <PrincipalButton
              @click="updateContact(`edit_contact_${business.id}`)"
              class="w-full"
              buttonText="Editar"
            />
          </div>
          <div class="col-span-3 col-start-4 row-start-9">
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
import { Form, Field, ErrorMessage } from "vee-validate";
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import { schema } from "../../plugins/schema";
import { useBusinessStore } from "../../stores/businessStore";

export default {
  data() {
    return {
      schema,
      useBusinessStore,
    };
  },
  computed: {
    address: {
      get() {
        return this.business?.address || "";
      },
      set(value) {
        this.business.address = value;
      },
    },
    phoneNumber: {
      get() {
        return this.business?.phoneNumber || 0;
      },
      set(value) {
        this.business.phoneNumber = value;
      },
    },
    website: {
      get() {
        return this.business?.website || "";
      },
      set(value) {
        this.business.website = value;
      },
    },
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
    this.fetchBusiness();
  },
  components: {
    PrincipalButton,
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async fetchBusiness() {
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

    async updateContact(id) {
      console.log(this.business.id);
      const newBusiness = {
        name: this.business?.name,
        rut: this.business.rut,
        commercialRegistration: this.business.commercialRegistration,
        registrationDate: this.business.registrationDate,
        legalRepresentative: this.business.legalRepresentative,
        address: this.address,
        phoneNumber: this.phoneNumber,
        website: this.website,
        description: this.business.description,
        status: this.business.status,
        typeBusinessId: this.business.typeBusiness.id,
        email: null,
      };
      try {
        this.useBusinessStore.updateBusiness(this.business.id, newBusiness);
        this.closeModal(id);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
