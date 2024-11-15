<script setup>
import EventList from '../../components/AdminComponents/Events_Sites/EventList.vue';
import SiteList from '../../components/AdminComponents/Events_Sites/SiteList.vue';
</script>

<template>
  <main>
    <EventList/>
    <br>
    <br>
    <SiteList/>
    <br>
    <br>
  </main>
</template>

<style scoped>
main {
  margin: 20px 80px;
}
</style>
