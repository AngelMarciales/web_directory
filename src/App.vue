<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from './stores/user';
import HeadAdmin from "./components/HeadComponents/HeadAdmin.vue";
import HeadOwner from "./components/HeadComponents/HeadOwner.vue";
import HeadVisitor from "./components/HeadComponents/HeadVisitor.vue";
import Foot from "./components/FootComponents/Foot.vue";
import Head from "./components/HeadComponents/Head.vue";

const userStore = useUserStore();

function getHeaderComponent() {
  if (userStore.isAdmin) return HeadAdmin;
  if (userStore.isOwner) return HeadOwner;
  if (userStore.isVisitor) return HeadVisitor;
  else return Head;
}
</script>

<template>
  <header class="main-content">
    <component :is="getHeaderComponent()" />
  </header>
  
  <main>
    <RouterView />
  </main>
  
  <footer class="main-content" >
    <Foot />
  </footer>
</template>

<style scoped>
.main-content {
  margin: 20px 80px;
}
</style>
