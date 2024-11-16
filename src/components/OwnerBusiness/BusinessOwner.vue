<template>
  <main v-if="business">
    <PrincipalCard :key="business.id" :business="business" />
    <div class="main-content grid grid-cols-12 auto-rows-auto gap-10">
      <div class="col-span-8 col-start-1 row-span-1">
        <div class="dropdown dropdown-left">
          <div tabindex="0" role="button" class="btn m-1">...</div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-[1] absolute right-2 top-2 shadow"
          >
            <li>
              <a @click="openModal(`edit_description_${business.id}`)"
                >Editar</a
              >
            </li>
          </ul>
        </div>
        <p class="text">{{ business.description }}</p>
      </div>
      <div class="col-span-8 row-span-1 col-start-1">
        <AditionalContentsCard :business="business" />
      </div>
      <div class="col-span-4 row-span-1 col-start-9">
        <ContactCard :business="business" />
      </div>
      <div class="col-span-8 row-span-1">
        <LocationSchedulesCard :business="business" :id="businessid" />
      </div>
      <div class="col-span-8 row-span-1">
        <BusinessQualification :business="business" />
      </div>
      <div class="col-span-8 row-span-1">
        <ReviewCardList :business="business" />
      </div>
    </div>
  </main>

  <dialog :id="`edit_description_${business.id}`" class="modal">
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
            <h3 class="title4 font-bold">Editar descripción</h3>
          </div>

          <div class="col-span-6 row-start-3">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Descripción: </span>
              </div>
              <Field
                v-model="description"
                name="name"
                type="text"
                class="input input-bordered w-full"
                placeholder="Escriba la descrpción de su negocio"
                as="textarea"
              />
              <ErrorMessage name="name"></ErrorMessage>
            </label>
          </div>

          <div class="col-span-3 row-start-6">
            <PrincipalButton
              @click="updateDescription(`edit_description_${business.id}`)"
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
import PrincipalCard from "./PrincipalCard.vue";
import ContactCard from "./ContactCard.vue";
import AditionalContentsCard from "./AditionalContentsCard.vue";
import LocationSchedulesCard from "./LocationSchedulesCard.vue";
import BusinessQualification from "./BusinessQualification.vue";
import ReviewCardList from "./ReviewCardList.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../plugins/schema.js";
import { useUserStore } from "../../stores/user.js";
import { useBusinessStore } from "../../stores/businessStore.js";
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";

export default {
  components: {
    PrincipalCard,
    ContactCard,
    AditionalContentsCard,
    LocationSchedulesCard,
    BusinessQualification,
    ReviewCardList,
    Field,
    Form,
    ErrorMessage,
    PrincipalButton,
  },
  data() {
    return {
      useUserStore,
      useBusinessStore,
      isAuthenticated: false,
      schema,
      businesses: [],
      business: {},
      businessid: null,
      currentIndex: 0,
    };
  },
  computed: {
    description: {
      get() {
        return this.business?.description || "";
      },
      set(value) {
        this.business.description = value;
      },
    },
  },
  mounted() {
    this.useUserStore = useUserStore();
    this.useBusinessStore = useBusinessStore();
    this.isAuthenticated = this.useUserStore.isAuthenticated;
    this.businessid = parseInt(this.$route.params.businessOwner, 10);
    this.useBusinessStore.getEnabled();
    this.fetchBusinesses();
  },

  methods: {
    async fetchBusinesses() {
      try {
        await this.useBusinessStore.getEnabled();
        this.businesses = this.useBusinessStore.allEnabled;
        console.log(this.businesses);
        this.getBusiness();
      } catch (error) {
        console.error("Error al obtener los negocios:", error);
      }
    },
    getBusiness() {
      for (let business of this.businesses) {
        console.log(this.businesses);
        console.log(this.businessid);
        if (business.id === this.businessid) {
          this.business = business;
          return;
        } else {
          console.log("Error al obtener el negocio");
        }
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
    async updateDescription(id) {
      try {
        const newBusiness = {
          name: this.business?.name,
          rut: this.business.rut,
          commercialRegistration: this.business.commercialRegistration,
          registrationDate: this.business.registrationDate,
          legalRepresentative: this.business.legalRepresentative,
          address: this.business.address,
          phoneNumber: this.business.phoneNumber,
          website: this.business.website,
          description: this.description,
          status: this.business.status,
          typeBusinessId: this.business.typeBusiness.id,
          email: null,
        };
        await this.useBusinessStore.updateBusiness(this.business.id, newBusiness);
        this.closeModal(id);
      } catch (error) {
        console.error("Error al actualizar la descripción:", error);
      }
    },
  },
};
</script>

<style scoped>
.main-content {
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
