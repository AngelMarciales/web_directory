<template>
  <header class="main-content">
    <AdminHead/>
  </header>
    <main>
      <RouterView />
    </main>
  </template>
  
  <script setup>
  import { RouterView } from "vue-router";
  import AdminHead from "../../components/AdminComponents/AdminHead.vue";
  </script>
  
  <style scoped>
  .main-content {
    margin: 20px 120px;
    background: var(--primary1);
  }
  </style>