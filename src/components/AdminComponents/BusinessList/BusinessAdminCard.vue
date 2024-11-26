<template>
  <div class="card card-side bg-base-100 shadow-lg border-2 border-gray gap-8">
    <figure>
      <img
        :src="
          business.images && business.images.length > 0
            ? business.images[0].url
            : 'https://i.ibb.co/nnc7CkR/default-image.jpg'
        "
        class="h-64 w-64 object-cover"
      />
    </figure>
    <div class="card-body p-2">
      <h2 class="card-title title3 text-base">{{ business.name }}</h2>
      <p class="text">
        Representante legal: <br />
        {{ business.legalRepresentative }}
      </p>
      <p class="text">
        Número de teléfono: <br />
        {{ business.phoneNumber }}
      </p>
      <p class="text">Tipo de negocio: {{ business.typeBusiness.name }}</p>
      <p class="text text-sm">Estado: {{ business.status }}</p>
    </div>

    <div class="dropdown dropdown-left">
      <div tabindex="0" role="button" class="btn m-1">...</div>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 rounded-box z-[1] absolute right-2 top-2 shadow"
      >
        <li><a @click="changeStatus('ENABLED')">Habilitar</a></li>
        <li><a @click="changeStatus('DISABLED')">Deshabilitar</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useBusinessStore } from "../../../stores/businessStore";

export default {
  name: "BusinessCard",
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      useBusinessStore,
    };
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
    this.fetchBusinesses();
  },
  methods: {
    async fetchBusinesses() {
      try {
        await this.useBusinessStore.getEnabled();
        await this.useBusinessStore.getDisabled();
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    },
    // Función para cambiar el estado (habilitar o deshabilitar)
    changeStatus(status) {
      const data = {
        name: this.business.name,
        rut: this.business.rut,
        commercialRegistration: this.business.commercialRegistration,
        registrationDate: this.business.registrationDate,
        legalRepresentative: this.business.legalRepresentative,
        address: this.business.address,
        phoneNumber: this.business.phoneNumber,
        website: this.business.website,
        description: this.business.description,
        status,
        typeBusinessId: this.business.typeBusiness.id,
        email: this.business.user.email,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token de autorización no encontrado");
        return;
      }
      try {
        this.useBusinessStore.updateBusiness(this.business.id, data);
        this.$emit("statusChanged");
        //window.location.reload();
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    },
  },
};
</script>

<style scoped></style>
