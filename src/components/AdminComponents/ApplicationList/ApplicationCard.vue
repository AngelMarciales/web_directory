<template>
  <div class="card card-side bg-base-100 shadow-lg border-2 border-gray gap-8">
    <div class="card-body p-2" @click="showModal">
      <h2 class="card-title title3 text-base">{{ business.name }}</h2>
      <p class="text">
        Representante legal:
        {{ business.legalRepresentative }}
      </p>
      <p class="text">
        Tipo de negocio:
        {{ business.typeBusiness.name }}
      </p>
    </div>

    <!-- Modal -->
    <dialog id="application_admin_modal" class="modal">
      <div class="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            @click="closeModal"
          >
            ✕
          </button>

          <!-- Contenido del modal -->
          <div class="grid grid-cols-6 grid-rows-auto gap-4">
            <div class="col-span-6">
              <h3 class="title3 font-bold">Solicitud de nuevo negocio</h3>
            </div>
            <div class="col-span-6 row-start-3">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text title5">Nombre del negocio: </span>
                </div>
                <input
                  type="text"
                  :value="business.name"
                  readonly
                  class="input input-bordered w-full"
                />
              </label>
            </div>
            <div class="col-span-3 row-start-4">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text title5">Representante legal: </span>
                </div>
                <input
                  type="text"
                  :value="business.legalRepresentative"
                  readonly
                  class="input input-bordered w-full"
                />
              </label>
            </div>
            <div class="col-span-3 col-start-4 row-start-4">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text title5"
                    >Correo electronico (Obligatorio):</span
                  >
                </div>
                <input
                  type="text"
                  :value="business.user.email"
                  readonly
                  class="input input-bordered w-full"
                />
              </label>
            </div>
            <div class="col-span-6 row-start-5">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text title5">Categoria de negocio</span>
                </div>
                <input
                  type="text"
                  :value="business.typeBusiness.name"
                  readonly
                  class="input input-bordered w-full"
                />
              </label>
            </div>

            <div class="col-span-6 row-start-6">
              <div class="grid grid-cols-6 grid-rows-auto gap-4">
                <div class="col-span-6">
                  <div class="label">
                    <span class="label-text title5"
                      >Registro unico tributario (RUT):</span
                    >
                    <a
                      v-if="business.rut"
                      :href="business.rut"
                      target="_blank"
                      class="text-blue-600 underline"
                    >
                      Ver RUT
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-3 row-start-7">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text title5"
                    >Numero de matricula mercantil (Si aplica):</span
                  >
                </div>
                <input
                  type="text"
                  :value="business.commercialRegistration"
                  readonly
                  class="input input-bordered w-full"
                />
              </label>
            </div>
            <div class="col-span-3 col-start-4 row-start-7">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text title5"
                    >Fecha matricula mercantil (Si aplica):</span
                  >
                </div>
                <input
                  type="text"
                  :value="business.registrationDate"
                  readonly
                  class="input input-bordered w-full"
                />
              </label>
            </div>
            <div class="col-span-3 row-start-9">
              <PrincipalButton
                @click="sendRequest()"
                class="w-full"
                buttonText="Aceptar solicitud"
              />
            </div>
            <div class="col-span-3 col-start-4 row-start-9">
              <form method="dialog">
                <PrincipalButton
                  @click="deleteBusiness()"
                  class="btn-cancel w-full"
                  buttonText="Rechazar Solicitud"
                />
              </form>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script>
import { useBusinessStore } from "../../../stores/businessStore";
import PrincipalButton from "../../GeneralComponents/PrincipalButton.vue";

export default {
  components: {
    PrincipalButton,
  },
  data() {
    return {
      useBusinessStore,
      message: "AAA",
    };
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
  },
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showModal() {
      const modal = document.getElementById("application_admin_modal");
      modal.showModal(); // Mostrar el modal
    },
    closeModal() {
      const modal = document.getElementById("application_admin_modal");
      modal.close(); // Cerrar el modal
    },
    sendRequest() {
      try {
        this.useBusinessStore.validateBusiness(this.business.id);
        alert("Negocio validado con éxito");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBusiness() {
      try {
        this.useBusinessStore.deleteBusiness(this.business.id);
        alert("Solicitud Rechazada");
        window.location.reload();
      } catch (error) {
        console.log(error);
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
