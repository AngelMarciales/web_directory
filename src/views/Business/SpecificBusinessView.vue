<template>
  <main v-if="business">
    <PrincipalCard :key="business.id" :business="business" />
    <div class="main-content grid grid-cols-12 auto-rows-auto gap-4">
      <div class="col-span-2 row-span-1">
        <PrincipalButton @click="writeReview()" buttonText="Escribir reseña" />
        <dialog id="modal_review" class="modal" v-if="!isAuthenticated">
          <div class="modal-box">
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
                  <h3 class="title4 font-bold">
                    Bienvenido, registrate para continuar
                  </h3>
                </div>
                <div class="col-span-6 row-start-2">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Correo electronico</span>
                    </div>
                    <Field
                      v-model="email"
                      type="email"
                      name="email"
                      placeholder="Escriba su correo electronico"
                      class="input input-bordered w-full"
                    />
                    <ErrorMessage name="email"></ErrorMessage>
                  </label>
                </div>
                <div class="col-span-3 row-start-3">
                  <PrincipalButton
                    class="w-full"
                    buttonText="Registrarse"
                    @click="createUser()"
                  />
                </div>
                <div class="col-span-3 col-start-4 row-start-3">
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
      </div>
      <div class="col-span-8 col-start-1 row-span-1">
        <p class="text">{{ business.description }}</p>
      </div>
      <div class="col-span-8 row-span-1 col-start-1">
        <AditionalContentsCard :business="business" />
      </div>
      <div class="col-span-4 row-span-1 col-start-9">
        <ContactCard :business="business" />
      </div>
      <div class="col-span-8 row-span-1">
        <LocationSchedulesCard :business="business" />
      </div>
      <div class="col-span-8 row-span-1">
        <BusinessQualification :business="business" />
      </div>
      <div id="writeReview" class="col-span-8 row-span-1">
        <QualifityCard :business="business" @open-modal="openModal" />
      </div>
      <div class="col-span-8 row-span-1">
        <ReviewCardList :business="business" />
      </div>
    </div>
  </main>
</template>

<script>
import PrincipalCard from "../../components/BusinessSpecificComponents/PrincipalCard.vue";
import ContactCard from "../../components/BusinessSpecificComponents/ContactCard.vue";
import AditionalContentsCard from "../../components/BusinessSpecificComponents/AditionalContentsCard.vue";
import LocationSchedulesCard from "../../components/BusinessSpecificComponents/LocationSchedulesCard.vue";
import QualifityCard from "../../components/BusinessSpecificComponents/QualifityCard.vue";
import BusinessQualification from "../../components/BusinessSpecificComponents/BusinessQualification.vue";
import ReviewCardList from "../../components/BusinessSpecificComponents/ReviewCardList.vue";
import PrincipalButton from "../../components/GeneralComponents/PrincipalButton.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../plugins/schema.js";
import { useUserStore } from "../../stores/user.js";
import { useBusinessStore } from "../../stores/businessStore.js";

export default {
  components: {
    PrincipalCard,
    ContactCard,
    AditionalContentsCard,
    LocationSchedulesCard,
    QualifityCard,
    BusinessQualification,
    ReviewCardList,
    PrincipalButton,
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      email: "",
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
  mounted() {
    this.useUserStore = useUserStore();
    this.useBusinessStore = useBusinessStore();
    this.isAuthenticated = this.useUserStore.isAuthenticated;
    this.businessid = parseInt(this.$route.params.businessId, 10);
    this.fetchBusinesses();
  },

  methods: {
    async fetchBusinesses() {
      try {
        await this.useBusinessStore.getEnabled();
        this.businesses = this.useBusinessStore.allEnabled;
        this.getBusiness();
        
      } catch (error) {
        console.error("Error al obtener los negocios:", error);
      }
    },
    getBusiness() {
      for (let business of this.businesses) {
        if (business.id === this.businessid) {
          this.business = business;
          return;
        } else {
          console.log("Error al obtener el negocio");
        }
      }
    },
    writeReview() {
      if (this.useUserStore.isAuthenticated == true) {
        const section = document.getElementById("writeReview");
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        this.openModal("modal_review");
      }
    },
    createUser() {
      try {
        const data = {
          email: this.email,
        };
        const response = this.useUserStore.createUser(data);
        alert("Se le enviaron las credenciales de acceso a su correo electronico, inicia sesión");
        this.closeModal("modal_review");
        console.log(response.data);
      } catch (error) {}
    },
    openModal(id) {
      const modal = document.getElementById(id);
      console.log(modal);
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
.main-content {
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 50px;
  margin-bottom: 50px;
}

.btn-cancel {
  background: var(--primary2);
}
</style>
