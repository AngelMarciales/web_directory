import { defineStore } from "pinia";
import api from "../config/api"; // Reutilizamos la configuración de Axios

export const useReviewStore = defineStore("reviewStore", {
  state: () => ({
    businessReviews: [], // Lista de reseñas de negocio
    websiteReviews: [],
    review: {},
  }),

  actions: {
    // Obtener el token de localStorage
    getToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn(
          "No se encontró el token de autorización en el almacenamiento local."
        );
        return null;
      }
      return token;
    },

    // Cargar las reseñas desde el servidor
    async getReviews() {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        const response = await api.get("/api/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.businessReviews = response.data;
      } catch (error) {
        console.error(
          "No se pudieron cargar las reseñas. Verifique la conexión al servidor.",
          error
        );
      }
    },

    async getWebsite() {
      const token = this.getToken();
      if (!token) return;
      try {
        const response = await api.get("/api/reviews/website", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.websiteReviews = response.data;
      } catch (error) {
        console.error(
          "No se pudieron cargar las reseñas. Verifique la conexión al servidor.",
          error
        );
      }
    },

    async getReviewsById(businessId) {
      const token = this.getToken();
      if (!token) return;
      try {
        const response = await api.get(`/api/reviews/${businessId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.info("La reseña se obtuvo correctamente.");
        this.review = response.data;
      } catch (error) {
        console.error("Ocurrió un error al intentar obtener la reseña.", error);
      }
    },

    // Agregar una nueva reseña
    async addReview(newReview) {
      const token = this.getToken();
      if (!token) return; 
      try {
        await api.post("/api/reviews", newReview, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await this.getTypes();
        alert("La reseña se agregó correctamente.");
      } catch (error) {
        alert("Ocurrió un error al intentar agregar la reseña.", error.response.data);
      }
    },

    // Actualizar una reseña existente
    async updateReview(reviewId, updatedReview) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        await api.put(`/api/reviews/${reviewId}`, updatedReview, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await this.getTypes();
        alert("La reseña se actualizó correctamente.");
      } catch (error) {
        alert("Ocurrió un error al intentar actualizar reseña.", error.response.data);
      }
    },

    // Eliminar un sitio
    async deleteReview(reviewId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        await api.delete(`/api/businesses/types/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await this.getTypes();
        alert("La reseña se eliminó correctamente.");
      } catch (error) {
        console.error(
          "No se pudo eliminar la reseña. Verifique la conexión o permisos.",
          error
        );
      }
    },
  },

  getters: {
    // Obtener todos los sitios
    allBusinessReviews(state) {
      return state.businessReviews;
    },

    allWebsiteReviews(state) {
      return state.businessReviews;
    },

    getById(state) {
      return state.review;
    },

    // Obtener un sitio por su ID
    getReviewById(state) {
      return (siteId) =>
        state.businessReviews.find((site) => site.id === siteId);
    },
  },
});
