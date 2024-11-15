<script setup>
import Filter from "../../components/BusinessListComponents/Filter.vue";
import BusinessList from "../../components/BusinessListComponents/BusinessList.vue";
</script>

<template>
  <main>
    <div class="grid grid-cols-12 gap-10"> 
      <div class="col-span-3"><Filter /></div>
      <div class="col-span-9 col-start-4"><BusinessList /></div>
    </div>
  </main>
</template>

<style scoped>
main {
  margin: 20px 80px;
}
</style>
