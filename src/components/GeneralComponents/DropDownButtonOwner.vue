<template>
    <div ref="dropdown" class="dropdown relative inline-block">
      <div
        tabindex="0"
        @click="toggleDropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="isOpen"
        class="btn m-1 btn-terciary w-12 h-12 rounded-full "
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
        <li><a class="dropdown-item" role="menuitem" tabindex="0">Cambiar contraseña</a></li>
        <li><a class="dropdown-item" role="menuitem" tabindex="0">Ver negocio</a></li>
        <li><a class="dropdown-item" role="menuitem" tabindex="0">Cerrar sesión</a></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
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
  