<template>
  <div class="w-full sm:w-1/2 md:w-2/3 lg:w-80 mx-auto">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text title4">¡Cuentanos tu experiencia!</span>
      </div>
      <div class="grid grid-cols-8 auto-rows-auto gap-1">
        <textarea
          v-model="comment"
          type="text"
          placeholder="Escribe tu experiencia de visitar Jenesano"
          class="textarea textarea-bordered w-full max-w-xs col-span-8 h-16"
        >
        </textarea>
        <PrincipalButton
          class="col-start-3 row-start-2"
          buttonText="Enviar"
          @click="submitReview()"
        />
      </div>
    </label>
  </div>
  <div><br /></div>
  <footer
    class="footer bg-base-300 text-base-content p-10"
    style="background-color: var(--primary1)"
  >
    <nav>
      <h6 class="footer-title" style="color: var(--neutro4)">
        SECRETARÍA DE GOBIERNO /CAROLINA RIVERA DAZA
      </h6>
      <a class="label-text" style="color: var(--neutro4)"
        >Direccion: Carrera 4 No. 7-11</a
      >
      <a class="label-text" style="color: var(--neutro4)"
        >Horario de atención: Lun a Vier: De 8 am a 12.30 pm y 2 pm a 5. 30pm
      </a>
      <a class="label-text" style="color: var(--neutro4)"
        >Email: secretariageneral@jenesano-boyaca.gov.co</a
      >
      <a class="label-text" style="color: var(--neutro4)"
        >Teléfonos: 3103037854</a
      >
      <h6 class="footer-title" style="color: var(--neutro4)">
        SECRETARIA DE HACIENDA/ANAIR SUAREZ CABRERA
      </h6>
      <a class="label-text" style="color: var(--neutro4)"
        >Direccion: Carrera 4 No. 7-11</a
      >
      <a class="label-text" style="color: var(--neutro4)"
        >Horario de atención: Lun a Vier: De 8 am a 12.30 pm y 2 pm a 5. 30pm
      </a>
      <a class="label-text" style="color: var(--neutro4)"
        >Email: tesoreria@jenesano-boyaca.gov.co
      </a>
      <a class="label-text" style="color: var(--neutro4)"
        >Teléfonos: 313 8432012
      </a>
      <h6 class="footer-title" style="color: var(--neutro4)">
        SECRETARÍA DE INNOVACIÓN /YORLADY LOPEZ
      </h6>
      <a class="label-text" style="color: var(--neutro4)"
        >Direccion: Carrera 4 No. 7-11</a
      >
      <a class="label-text" style="color: var(--neutro4)"
        >Horario de atención: Lun a Vier: De 8 am a 12.30 pm y 2 pm a 5. 30pm
      </a>
      <a class="label-text" style="color: var(--neutro4)"
        >Email: desarrolloeconomicoysocial@jenesano-boyaca.gov.co
      </a>
      <a class="label-text" style="color: var(--neutro4)"
        >Teléfonos: 3138433281
      </a>
    </nav>
    <nav>
      <h6 class="footer-title" style="color: var(--neutro4)">Contacto</h6>
      <div class="grid grid-flow-col gap-4">
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
            ></path>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
            ></path>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            ></path>
          </svg>
        </a>
      </div>
    </nav>
    <aside>
      <img src="../../assets/VERTICAL.png" alt="Logo_foot" class="h-40 mr-1" />
    </aside>
  </footer>

  <dialog id="modal_review_2" class="modal">
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
</template>

<script>
import PrincipalButton from "../GeneralComponents/PrincipalButton.vue";
import { useReviewStore } from "../../stores/reviewStore";
import api from "../../config/api";
import { Form, Field, ErrorMessage } from "vee-validate";
import { schema } from "../../plugins/schema";

export default {
  components: {
    PrincipalButton,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      schema,
      email: "",
      useReviewStore,
      comment: "",
    };
  },
  mounted() {
    this.useReviewStore = useReviewStore();
  },
  methods: {
    async submitReview() {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const userid = localStorage.getItem("userId");
      if (!token) {
        this.openModal("modal_review_2");
        return;
      } else if (role != "TOURIST") {
        alert(
          "Señor usuario usted no puede dejar reseñas con su cuenta actual."
        );
        return;
      }
      const reviewData = {
        review: 0,
        description: this.comment,
        userId: userid,
      };
      try {
        await api.post(`/api/reviews`, reviewData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Gracias por dejarnos tu opinion");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    createUser() {
      try {
        const data = {
          email: this.email,
        };
        const response = this.useUserStore.createUser(data);
        alert(
          "Se le enviaron las credenciales de acceso a su correo electronico, inicia sesión"
        );
        this.closeModal("modal_review_2");
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
  },
};
</script>

<style scoped>
.btn-cancel {
  background: var(--primary2);
}
</style>
