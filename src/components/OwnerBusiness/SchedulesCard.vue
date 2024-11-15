<template>
  <div class="overflow-x-auto" v-if="business.businessHours && business.businessHours.length">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Dia</th>
          <th>Hora de apertura</th>
          <th>Hora de cierre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hour, index) in business.businessHours" :key="index">
          <td>{{ getDayName(index) }}</td>
          <td>{{ hour.openingTime || "N/A" }}</td>
          <td>{{ hour.closingTime || "N/A" }}</td>
        </tr>
      </tbody>
    </table>
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
  methods: {
  getDayName(index) {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    return days[index] || "Desconocido";
  },
},

}
</script>
