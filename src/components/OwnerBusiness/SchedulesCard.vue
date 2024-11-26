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
          <td>{{ hour.day }}</td>
          <td>{{ hour.openingTime }}</td>
          <td>{{ hour.closingTime }}</td>
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
      displayedHours: [],
    };
  },
  watch: {
    "business.businessHours": {
      deep: true,
      immediate: true,
      handler(newHours) {
        this.updateDisplayedHours(newHours || []);
      },
    },
  },
  methods: {
    updateDisplayedHours(newHours) {
      // Mapeo de días en inglés a español
      const dayMap = {
        MONDAY: "Lunes",
        TUESDAY: "Martes",
        WEDNESDAY: "Miércoles",
        THURSDAY: "Jueves",
        FRIDAY: "Viernes",
        SATURDAY: "Sábado",
        SUNDAY: "Domingo",
      };

      // Filtrar días con horarios válidos
      this.displayedHours = newHours
        .filter((hour) => hour.openingTime && hour.closingTime) // Solo días con horarios válidos
        .map((hour) => ({
          day: dayMap[hour.dayWeek] || "Desconocido",
          openingTime: hour.openingTime,
          closingTime: hour.closingTime,
        }));
    },
  },
};
</script>