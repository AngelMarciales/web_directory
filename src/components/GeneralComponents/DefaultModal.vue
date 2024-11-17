<template>
  <dialog id="defaultmodal" v-if="message" class="modal">
    <div class="modal-box">
      <h1 class="title3">¡Aviso!</h1>
      <p class="py-4">
        {{ message }}
      </p>
      <div class="modal-action">
        <form method="dialog">
          <PrincipalButton buttonText="Aceptar" @click="close" />
        </form>
      </div>
    </div>
  </dialog>
</template>

<script>
import PrincipalButton from "./PrincipalButton.vue";

export default {
  components: {
    PrincipalButton,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.btn-cancel {
  background: var(--primary2);
}
</style>