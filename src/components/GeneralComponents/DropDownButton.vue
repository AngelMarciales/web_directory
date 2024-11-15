<template>
  <button
    onclick="login.showModal()"
    class="btn m-1 btn-terciary w-40 py-4 rounded-lg shadow-md dropdown-toggle"
  >
    Ingresar
  </button>
  <dialog id="login" class="modal">
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
              @click="login()"
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
            />
          </div>
          <div class="col-span-3 col-start-4 row-start-3">
            <Form>
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
    };
  },
  mounted() {
    this.useUserStore = useUserStore();
    this.username = "";
    this.password = "";
  },
  methods: {
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
