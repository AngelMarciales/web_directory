<template>
  <main class="main-content">
    <PrincipalButton
      v-for="(button, index) in buttons"
      :key="index"
      class="btn-buttons"
      :class="{ selected: selectedButton === index }"
      @click="selectButton(index, button.action)"
      :buttonText="button.text"
    />
  </main>

  <dialog id="create_manager" class="modal">
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
            <h3 class="title4 font-bold">Crear nuevo administrador</h3>
          </div>
          <div class="col-span-6 row-start-2">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Usuario:</span>
              </div>
              <Field
                v-model="username"
                name="name"
                type="text"
                placeholder="Escriba el usuario"
                class="input input-bordered w-full"
              />
              <ErrorMessage name="name"></ErrorMessage>
            </label>
          </div>
          <div class="col-span-6 row-start-3">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Contraseña:</span>
              </div>
              <Field
                v-model="password"
                name="password"
                type="text"
                class="input input-bordered w-full"
                placeholder="Escriba una contraseña"
              />
              <ErrorMessage name="password"></ErrorMessage>
            </label>
          </div>
          <div class="col-span-6 row-start-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Correo electronico:</span>
              </div>
              <Field
                v-model="email"
                name="email"
                type="text"
                class="input input-bordered w-full"
                placeholder="Escriba su contraseña"
              />
              <ErrorMessage name="email"></ErrorMessage>
            </label>
          </div>
          <div class="col-span-3 row-start-5">
            <PrincipalButton
              @click="createUser()"
              class="w-full"
              buttonText="Crear Usuario"
            />
          </div>
          <div class="col-span-3 col-start-4 row-start-5">
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

  <DefaultModal ref="defaultmodal" :message="message" />
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../plugins/schema.js";
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import DefaultModal from "../GeneralComponents/DefaultModal.vue";
import api from "../../config/api.js";

export default {
  components: {
    PrincipalButton,
    Form,
    Field,
    ErrorMessage,
    DefaultModal,
  },
  mounted() {
    this.buttons = [
      { text: "Lista de negocios inscritos", action: "goToBusinessList" },
      { text: "Eventos, sitios turísticos", action: "goToEvents" },
      {
        text: "Solicitudes de nuevos negocios",
        action: "goToBusinessApplications",
      },
      {
        text: "Crear un nuevo administrador",
        action: onclick="openModalCreate",
      },

      { text: "Generación de Reportes", action: "goToReports" },
    ];
  },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      schema,
      selectedButton: null, // Almacena el índice del botón seleccionado
      buttons: null,
      message: "",
    };
  },
  methods: {
    selectButton(index, action) {
      this.selectedButton = index; // Marca el botón como seleccionado
      if (action && this[action]) {
        this[action](); // Llama a la acción si está definida
      }
    },
    goToBusinessList() {
      this.$router.push({ name: "BusinessListAdmin" });
    },
    goToEvents() {
      this.$router.push({ name: "EventTouristSiteList" });
    },
    goToBusinessApplications() {
      this.$router.push({ name: "BusinessApplications" });
    },
    goToReports() {
      this.$router.push({ name: "Reports" });
    },
    openModalCreate() {
      this.openModal("create_manager");
    },
    async createUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token de autorización no encontrado");
          this.message = "Debe volver a iniciar sesión";
          this.openModal("defaultmodal");
          return; // Detén la ejecución si no hay token
        }
        const newUser = {
          username: this.username,
          password: this.password,
          email: this.email,
        };
        const response = await api.post(
          "/api/users/manager",
          newUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.message = "Usuario creado con exito ";
        this.openModal("defaultmodal");
      } catch (error) {
        this.message = "Ha ocurrido un error: " + error.response;
        this.openModal("defaultmodal");
      }
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
  },
  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.close();
    } else {
      console.error(`Modal con id ${id} no encontrado.`);
    }
  },
};
</script>

<style scoped>
.main-content {
  margin: 20px 80px;
  background: var(--primary1);
}

.btn-buttons {
  background-color: var(--primary1);
  color: #ffffff;
  transition: background-color 0.3s ease;
  display: inline-block;
  cursor: pointer;
  border: none; /* Elimina el borde */
  border-radius: 0; /* Elimina los bordes redondeados */
  padding: 10px 20px; /* Ajusta el relleno para mantener la apariencia */
  text-align: center; /* Centra el texto */
}

.btn-buttons:hover {
  background-color: var(--secondary1);
}

/* Estilo para el botón seleccionado */
.btn-buttons.selected {
  background-color: var(--secondary1); /* Cambia por el color deseado */
}

.btn-cancel {
  background: var(--primary2);
}
</style>
