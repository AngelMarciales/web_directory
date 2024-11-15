<template>
    <div class="card bg-base-100 w-96 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Contacto</h2>
    <p>{{business.phoneNumber}}</p>
    <p>_________________________________________________</p>

    <h2 class="card-title">Dirección</h2>
    <p>{{business.address}}</p>
    <p>_________________________________________________</p>
    <h2 class="card-title">Dirección</h2>
    <a class="link ">{{ business.website }}</a>
  </div>
</div>
</template>

<script>
export default{
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
}
</script>