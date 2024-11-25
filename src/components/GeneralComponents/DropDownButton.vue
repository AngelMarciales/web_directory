<template>
  <button
    onclick="loginForm.showModal()"
    class="btn m-1 btn-terciary w-40 py-4 rounded-lg shadow-md dropdown-toggle"
  >
    Ingresar
  </button>
  <dialog id="loginForm" class="modal">
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
              Bienvenido, ingresa los datos para continuar
            </h3>
          </div>
          <div class="col-span-6 row-start-2">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Usuario</span>
              </div>
              <Field
                v-model="username"
                name="name"
                type="text"
                placeholder="Escriba su usuario"
                class="input input-bordered w-full"
              />
              <ErrorMessage name="name"></ErrorMessage>
            </label>
          </div>
          <div class="col-span-6 row-start-3">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Contraseña</span>
                <a
                  class="link link-hover"
                  onclick="password_recovey_modal.showModal()"
                  >¿Ha olvidado la contraseña?</a
                >
              </div>
              <Field
                v-model="password"
                name="password"
                type="password"
                class="input input-bordered w-full"
                placeholder="Escriba su contraseña"
              />
              <ErrorMessage name="password"></ErrorMessage>
            </label>
          </div>
          <div class="col-span-3 row-start-4">
            <PrincipalButton
              @click="submitForm()"
              class="w-full"
              buttonText="Iniciar Sesión"
              onclick="modal_login.showModal()"
            />
          </div>
          <div class="col-span-3 col-start-4 row-start-4">
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

  <dialog id="modal_login" class="modal" v-if="message != ''">
    <div class="modal-box">
      <h1 class="title3">¡Aviso!</h1>
      <p class="py-4">
        {{ message }}
      </p>
      <div class="modal-action">
        <Form method="dialog">
          <PrincipalButton buttonText="Aceptar" />
        </Form>
      </div>
    </div>
  </dialog>

  <dialog id="password_recovey_modal" class="modal">
    <div class="modal-box">
      <Form :validation-schema="schema" method="dialog">
        <Form>
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </Form>
        <div class="grid grid-cols-6 grid-rows-auto gap-4">
          <div class="col-span-6">
            <h3 class="title4 font-bold">
              Bienvenido, ingresa los datos para continuar
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
              buttonText="Solicitar nueva contraseña"
              @click="resetPassword()"
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
</template>

<script>
import axios from "axios";
import PrincipalButton from "./PrincipalButton.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../plugins/schema.js";
import { useUserStore } from "../../stores/user.js";
import api from "../../config/api.js";

export default {
  components: {
    PrincipalButton,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      message: "",
      schema,
      useUserStore,
      username: null,
      password: null,
      email: null,
    };
  },
  mounted() {
    this.useUserStore = useUserStore();
    this.username = "";
    this.password = "";
    this.email = "";
  },
  methods: {
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
    async resetPassword() {
      try {
        const data = {
          email: this.email,
        };
        await api.put("/api/users/reset-password", data);
        alert("La nueva contraseña fue enviada a su correo");
        this.closeModal("password_recovey_modal");
      } catch (error) {
        console.error(error);
      }
    },
    async submitForm() {
      const formIsValid = true; //await this.$refs.loginForm.validate(); // Valida el formulario
      if (formIsValid) {
        this.login();
      } else {
        this.message = "Formulario inválido";
        console.log("Formulario inválido");
      }
    },
    async login() {
      try {
        const user = {
          username: this.username,
          password: this.password,
        };
        this.useUserStore.login(user);
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        this.message = "Error al iniciar sesión:" + error.response;
      }
    },
    handleClick() {
      if (message.value !== "") {
        modal_login.showModal();
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
