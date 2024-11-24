<template>
  <div class="grid grid-cols-12 gap-2 p-2 items-center shadow-lg">
    <div @click="goToHome" class="col-span-2 col-start-1 cursor-pointer">
      <img src="/src/assets/Logo.png" alt="Logo" class="h-12 mr-4" />
    </div>

    <div class="col-span-4 col-start-3">
      <SearchBar />
    </div>

    <div
      class="title5 text-center col-start-7 col-span-2"
      style="font-weight: bold"
    >
      ¡Haz parte de la red de comercio de Jenesano!
    </div>

    <div class="col-span-2 col-start-9">
      <div class="flex space-x-4">
        <div>
          <PrincipalButton
            onclick="my_modal_3.showModal()"
            buttonText="Registrar negocio"
          />
        </div>

        <dialog id="my_modal_3" class="modal">
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
                  <h3 class="title3 font-bold">
                    Solicitud para agregar nuevo negocio
                  </h3>
                </div>
                <div class="col-span-6 row-start-2">
                  <p class="text">
                    Por favor, complete los siguientes campos para registrar su
                    local en nuestra aplicación. Estos datos serán revisados y
                    verificados por parte de los administradores. Asegúrese de
                    que la información esté actualizada y sea precisa:
                  </p>
                </div>
                <div class="col-span-6 row-start-3">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text title5"
                        >Nombre del negocio (Obligatorio):
                      </span>
                    </div>
                    <Field
                      name="businessName"
                      type="text"
                      v-model="business.name"
                      placeholder="Escribe el nombre de tu negocio"
                      class="input input-bordered w-full"
                    />
                    <ErrorMessage name="businessName"></ErrorMessage>
                  </label>
                </div>
                <div class="col-span-3 row-start-4">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text title5"
                        >Representante legal (Obligatorio):
                      </span>
                    </div>
                    <Field
                      name="name"
                      v-model="business.legalRepresentative"
                      type="text"
                      placeholder="Escribe el nombre completo del representante legal"
                      class="input input-bordered w-full"
                      required
                    />
                    <ErrorMessage name="name"></ErrorMessage>
                  </label>
                </div>
                <div class="col-span-3 col-start-4 row-start-4">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text title5"
                        >Correo electronico (Obligatorio):</span
                      >
                    </div>
                    <Field
                      name="email"
                      v-model="business.email"
                      type="text"
                      placeholder="Escribe un correo electronico"
                      class="input input-bordered w-full"
                      required
                    />
                    <ErrorMessage name="email"></ErrorMessage>
                  </label>
                </div>
                <div class="col-span-6 row-start-5">
                  <span class="label-text title5"
                    >Categotia de negocio: (Obligatorio):</span
                  >
                  <select
                    class="select select-bordered w-full"
                    v-model="business.typeBusinessId"
                  >
                    <option disabled selected value="">
                      ¿Qué categoría de negocio es?
                    </option>
                    <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>

                <div class="col-span-6 row-start-6">
                  <div class="grid grid-cols-6 grid-rows-auto gap-4">
                    <div class="col-span-6">
                      <div class="label">
                        <span class="label-text title5"
                          >Registro unico tributario (RUT) (Obligatorio):</span
                        >
                      </div>
                    </div>
                    <div class="col-span-4 row-start-2">
                      <div class="grid grid-cols-12 grid-rows-auto gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon-color rounded-md col-span-1"
                          height="40px"
                          width="80px"
                          viewBox="0 -960 960 960"
                        >
                          <path
                            fill="currentColor"
                            d="M452-202h60v-201l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"
                          />
                        </svg>
                        <p class="title5 col-span-11 col-start-3">
                          Tamaño Max. Recomendado 3 Mb
                        </p>
                        <ErrorMessage
                          class="row-start-2 col-span-11 col-start-3"
                          name="file"
                        ></ErrorMessage>
                      </div>
                    </div>
                    <div class="col-start-5 row-start-2">
                      <label>
                        <Field
                          @change="handleFileUpload"
                          name="file"
                          type="file"
                          class="file-input file-input-bordered w-full max-w-xs"
                        />
                      </label>
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
                      v-model="business.commercialRegistration"
                      type="text"
                      placeholder="Escribe el numero de la matricula mercantil"
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
                      v-model="business.registrationDate"
                      type="date"
                      placeholder="Escribe la fecha de expedición de la matricula mercantil"
                      class="input input-bordered w-full"
                    />
                  </label>
                </div>
                <div class="col-span-6 row-start-8">
                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text"
                        >Al continuar, usted autoriza el tratamiento de sus
                        datos personales conforme a lo establecido en la Ley
                        1581 de 2012 de Colombia. La información proporcionada
                        será utilizada exclusivamente para la gestión de su
                        cuenta y el funcionamiento de la aplicación. Además,
                        usted acepta recibir correos electrónicos relacionados
                        con su cuenta, como el envío de credenciales,
                        notificaciones importantes y actualizaciones relevantes.
                        Por favor, confirme su aceptación para el manejo de sus
                        datos y el envío de correos electrónicos bajo estos
                        términos.</span
                      >
                      <Field
                        v-model="check"
                        name="check"
                        type="checkbox"
                        checked="checked"
                        class="checkbox"
                      />
                      <ErrorMessage name="check"></ErrorMessage>
                    </label>
                  </div>
                </div>
                <div class="col-span-3 row-start-9">
                  <PrincipalButton
                    @click="sendRequest()"
                    class="w-full"
                    buttonText="Enviar solicitud"
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

        <div><DropDownButton /></div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import DropDownButton from "../GeneralComponents/DropDownButtonAdmin.vue";
import { useBusinessStore } from "../../stores/businessStore.js";
import { useTypeStore } from "../../stores/typeStore.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../plugins/schema.js";

export default {
  data() {
    return {
      useBusinessStore,
      useTypeStore,
      schema,
      selectedFile: null,
      check: true,
      categories: [],
      business: {
        name: "",
        rut: null,
        commercialRegistration: "",
        registrationDate: "",
        legalRepresentative: "",
        typeBusinessId: 1,
        email: "",
        status: "ENABLED",
      },
    };
  },
  components: {
    SearchBar,
    PrincipalButton,
    DropDownButton,
    Form,
    Field,
    ErrorMessage,
  },
  mounted() {
    this.useBusinessStore = useBusinessStore();
    this.useTypeStore = useTypeStore();
    this.fetchCategoryList();
  },

  methods: {
    goToHome() {
      this.$router.push({ name: "Home" });
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        console.log("Archivo seleccionado:", file.name); // Depuración
      } else {
        alert("Seleccione un archivo");
        console.log("No se seleccionó ningún archivo.");
      }
    },

    async sendRequest() {
      try {
        if (!this.selectedFile) {
          alert("Por favor seleccione un archivo");
          return;
        }
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        const response = await this.useBusinessStore.addFile(formData);
        if (this.check) {
          alert("Por favor acepte los terminos y condiciones");
          return;
        }
        this.business.rut = response;
        await this.useBusinessStore.addBusiness(this.business);
        const modal = document.getElementById("my_modal_3");
        modal.close();
      } catch (error) {
        alert("Error al enviar solicitud:\n Revise el valor de los campos");
      }
    },

    async fetchCategoryList() {
      try {
        await this.useTypeStore.getTypes();
        this.categories = this.useTypeStore.allTypes;
      } catch (error) {
        console.error("Error al obtener categorías:");
      }
    },
  },
};
</script>

<style scoped>
.icon-color {
  color: var(--primary1);
}

.btn-cancel {
  background: var(--primary2);
}
</style>
