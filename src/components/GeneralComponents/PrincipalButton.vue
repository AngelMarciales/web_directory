<template>
  <button
    class="btn w-40 py-2"
    :disabled="disabled"
    :class="additionalClasses"
    :aria-label="buttonText"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: 'PrincipalButton',
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    additionalClasses: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.btn {
  background-color: var(--secondary1);
  color: white;
}
</style>