<template>
  <div class="overflow-x-auto" v-if="displayedHours.length">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Día</th>
          <th>Hora de apertura</th>
          <th>Hora de cierre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hour, index) in displayedHours" :key="index">
          <td>{{ getDayName(index) }}</td>
          <td>{{ hour.openingTime || "N/A" }}</td>
          <td>{{ hour.closingTime || "N/A" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    business: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      displayedHours: [], // Para almacenar los horarios actuales
    };
  },
  watch: {
    // Watcher para reaccionar a cambios en business.businessHours
    "business.businessHours": {
      deep: true, // Observa cambios internos en el array
      immediate: true, // Ejecuta el watcher al inicializar el componente
      handler(newHours) {
        if (newHours && newHours.length) {
          this.displayedHours = newHours;
        } else {
          this.displayedHours = [];
        }
      },
    },
  },
  methods: {
    getDayName(index) {
      const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
      return days[index] || "Desconocido";
    },
  },
};
</script>