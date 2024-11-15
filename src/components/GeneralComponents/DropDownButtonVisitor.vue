<template>
  <div ref="dropdown" class="dropdown relative inline-block">
    <div
      tabindex="0"
      @click="toggleDropdown"
      role="button"
      aria-haspopup="true"
      aria-expanded="isOpen"
      class="btn m-1 btn-terciary w-12 h-12 rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="200 -1300 1200 1200"
        width="30px"
        height="30px"
        fill="#e8eaed"
      >
        <path
          d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
        />
      </svg>
    </div>
    <ul
      v-if="isOpen"
      class="dropdown-content rounded-lg z-10 shadow-lg mt-1"
      role="menu"
    >
      <li>
        <a
          class="dropdown-item"
          role="menuitem"
          tabindex="0"
          onclick="reset_password_modal_visitor.showModal()"
          >Cambiar contraseña</a
        >
      </li>
      <li>
        <a class="dropdown-item" role="menuitem" tabindex="0" @click="logout()"
          >Cerrar sesión</a
        >
      </li>
    </ul>
  </div>

  <dialog id="reset_password_modal_visitor" class="modal">
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
                <span class="label-text">Antigua contraseña: </span>
              </div>
              <Field
                v-model="oldpassword"
                name="password"
                type="text"
                placeholder="Escriba su antigua contraseña"
                class="input input-bordered w-full"
              />
              <ErrorMessage name="password"></ErrorMessage>
            </label>
          </div>
          <div class="col-span-6 row-start-3">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Nueva Contraseña</span>
              </div>
              <Field
                v-model="newpassword"
                name="confirm_password"
                type="text"
                class="input input-bordered w-full"
                placeholder="Escriba su nueva contraseña"
              />
              <ErrorMessage name="confirm_password"></ErrorMessage>
            </label>
          </div>
          <div class="col-span-3 row-start-4">
            <PrincipalButton
              @click="updatePassword()"
              class="w-full"
              buttonText="Cambiar Contraseña"
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
</template>

<script>
import { schema } from "../../plugins/schema";
import api from "../../config/api";
import { Form, Field, ErrorMessage } from "vee-validate";
import PrincipalButton from "./PrincipalButton.vue";
import { useUserStore } from "../../stores/user";

export default {
  data() {
    return {
      schema,
      useUserStore,
      isOpen: false,
      oldpassword: "",
      newpassword: "",
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
    PrincipalButton,
  },
  methods: {
    closeModal(id) {
      const modal = document.getElementById(id);
      if (modal) {
        modal.close();
      } else {
        console.error(`Modal con id ${id} no encontrado.`);
      }
    },
    async updatePassword() {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userId");
      if (!token) {
        console.error("Token de autorización no encontrado");
        return;
      }
      try {
        const data = {
          oldPassword: this.oldpassword,
          newPassword: this.newpassword,
        };
        api.put(`/api/users/${userid}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.closeModal("reset_password_modal_visitor");
      } catch (error) {
        console.error(error);
      }
    },
    logout() {
      const userStore = useUserStore();
      userStore.logout();
      this.$router.push({ name: "Home" });
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    handleClickOutside(event) {
      if (this.isOpen && !this.$refs.dropdown.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.btn-terciary {
  background-color: #ec0d0d;
  color: #000000;
  transition: background-color 0.3s ease;
  display: inline-block;
}

.btn-terciary:hover {
  background-color: #c2c2c2;
}

.dropdown-content {
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  min-width: 160px;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
}

.dropdown-item {
  color: #000000;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
  border-radius: 0.5rem;
  display: block;
}

.dropdown-item:hover {
  background-color: #c2c2c2;
  color: #000000;
}

.btn-cancel {
  background: var(--primary2);
}
</style>
