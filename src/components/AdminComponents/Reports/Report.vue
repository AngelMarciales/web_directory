<template>
  <div class="grid grid-cols-12 grid-rows-1 gap-4">
    <div class="title3">Visitas:</div>
    <div class="col-start-11">
      <PrincipalButton @click="generateReport()" buttonText="Generar Reporte" />
    </div>
  </div>

  <div class="grid grid-cols-4 grid-rows-auto gap-4 border-2">
    <div class="col-span-2 title4">Negocios</div>
    <div class="col-start-2 row-start-2 title4" style="font-size: 1.1rem;">Total de visitas a negocios:</div>
    <div class="col-start-2 row-start-3 title4" style="font-size: 1.1rem;">
      Total de visitas a negocios del ultimo mes:
    </div>
    <div class="col-start-2 row-start-4 title4" style="font-size: 1.1rem;">
      Total de visitas a negocios del ultimo año:
    </div>
    <div class="col-start-2 row-start-5 title4" style="font-size: 1.1rem;">Categoria mas buscada:</div>
    <div class="col-span-2 col-start-3 row-start-2">
      {{ report.totalBusinessVisits }}
    </div>
    <div class="col-span-2 col-start-3 row-start-3">
      {{ report.lastMonthBusinessVisits }}
    </div>
    <div class="col-span-2 col-start-3 row-start-4">
      {{ report.lastYearBusinessVisits }}
    </div>
    <div class="col-span-2 col-start-3 row-start-5">
      {{ report.mostPopularTypeBusiness }}
    </div>
  </div>
  <br />
  <div class="grid grid-cols-4 grid-rows-4 gap-4 border-2">
    <div class="col-span-2 title4">Eventos</div>
    <div class="col-start-2 row-start-2 title4" style="font-size: 1.1rem;">
      Total de visitas a sección de eventos:
    </div>
    <div class="col-start-2 row-start-3 title4" style="font-size: 1.1rem;">
      Total de visitas a sección de ventos del ultimo mes:
    </div>
    <div class="col-start-2 row-start-4 title4" style="font-size: 1.1rem;">
      Total de visitas a sección de ventos del ultimo año:
    </div>
    <div class="col-span-2 col-start-3 row-start-2">
      {{ report.totalEventVisits }}
    </div>
    <div class="col-span-2 col-start-3 row-start-3">
      {{ report.lastMonthEventVisits }}
    </div>
    <div class="col-span-2 col-start-3 row-start-4">
      {{ report.lastYearEventVisits }}
    </div>
  </div>
  <br />
  <div class="grid grid-cols-4 grid-rows-4 gap-4 border-2">
    <div class="col-span-2 title4">Sitios Turisticos</div>
    <div class="col-start-2 row-start-2 title4" style="font-size: 1.1rem;">
      Total de visitas a sección de sitios turisticos:
    </div>
    <div class="col-start-2 row-start-3 title4" style="font-size: 1.1rem;">
      Total de visitas a sección de sitios turisticos del ultimo mes:
    </div>
    <div class="col-start-2 row-start-4 title4" style="font-size: 1.1rem;">
      Total de visitas a sección de sitios turisticos del ultimo año:
    </div>
    <div class="col-span-2 col-start-3 row-start-2">
      {{ report.totalTouristPlaceVisits }}
    </div>
    <div class="col-span-2 col-start-3 row-start-3">
      {{ report.lastMonthTouristPlaceVisits }}
    </div>
    <div class="col-span-2 col-start-3 row-start-4">
      {{ report.lastYearTouristPlaceVisits }}
    </div>
  </div>
</template>

<script>
import PrincipalButton from "../../GeneralComponents/PrincipalButton.vue";
import api from "../../../config/api";

export default {
  components: {
    PrincipalButton,
  },
  data() {
    return {
      pdf: "",
      report: {
        totalBusinessVisits: 0,
        lastMonthBusinessVisits: 0,
        lastYearBusinessVisits: 0,
        mostPopularTypeBusiness: "",
        totalEventVisits: 0,
        lastMonthEventVisits: 0,
        lastYearEventVisits: 0,
        totalTouristPlaceVisits: 0,
        lastMonthTouristPlaceVisits: 0,
        lastYearTouristPlaceVisits: 0,
      },
    };
  },
  mounted() {
    this.getReport();
  },
  methods: {
    async getReport() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token de autorización no encontrado");
          return; // Detén la ejecución si no hay token
        }
        const response = await api.get("/api/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.report = response.data;
      } catch (error) {
        console.error("Error al obtener el reporte:", error);
      }
    },
    async generateReport() {
      try {
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
          console.error("Token de autorización no encontrado");
          return; // Detén la ejecución si no hay token
        }
        const response = await api.get(`/api/reports/pdf`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.pdf = response.data;
        window.open(response.data, '_blank');
        console.log(this.pdf)
      } catch (error) {
        console.error("Error al obtener el reporte:", error);
      }
    },
  },
};
</script>
