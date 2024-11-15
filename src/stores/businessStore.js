import { defineStore } from "pinia";
import api from "../config/api";

export const useBusinessStore = defineStore("businessStore", {
  state: () => ({
    searchTerm: '', 
    businessEnabled: [],
    businessDisabled: [],
    businessNonValidate: [],
    businessById: [],
    businessByType: [],
    businessByReview: [],
    businessAverageReview: 0,
  }),

  actions: {

    setSearchTerm(term) {
      this.searchTerm = term;
    },
    // Obtener el token de localStorage
    getToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token de autorización no encontrado");
        return null;
      }
      return token;
    },
    async getEnabled() {
      try {
        const response = await api.get("/api/businesses/enabled");
        this.businessEnabled = response.data;
      } catch (error) {
        console.error("Error al cargar los negocios:", error);
      }
    },

    async getDisabled() {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.get("/api/businesses/disabled", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.businessDisabled = response.data;
      } catch (error) {
        console.error("Error al cargar los negocios:", error);
      }
    },

    async getNonValidate() {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.get("/api/businesses/non-validated", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.businessNonValidate = response.data;
      } catch (error) {
        console.error("Error al cargar los negocios:", error);
      }
    },

    async getByUserId(userId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.get(`/api/businesses/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.businessById = response.data;

      } catch (error) {
        console.error("Error al cargar los negocios:", error);
      }
    },

    async getByType(typeId) {
      try {
        const response = await api.get(`/api/businesses/type/${typeId}`);
        this.businessByType = response.data;
      } catch (error) {
        console.error("Error al cargar los negocios:", error);
      }
    },

    async getByReview(count) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.get(`/api/businesses/review/${count}`);
        this.businessByReview = response.data;
      } catch (error) {
        console.error("Error al cargar los negocios:", error);
      }
    },

    async getAverageReview(businessId) {
      try {
        const response = await api.get(
          `/api/businesses/${businessId}/average-review`
        );
        this.businessAverageReview = response.data;
      } catch (error) {
        console.error("Error al cargar los negocios:", error);
      }
    },

    // Agregar un nuevo evento
    async addBusiness(newBusiness) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.post("/api/businesses", newBusiness);
        this.getEnabled();
        console.log("Negocio agregado con éxito");
      } catch (error) {
        console.error("Error al agregar el negocio:", error);
      }
    },

    // Actualizar un evento existente
    async updateBusiness(businessId, updatedBusiness) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.put(`api/businesses/${businessId}`, updatedBusiness, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getEnabled();
        console.log("Negocio actualizado con éxito");
      } catch (error) {
        console.error("Error al actualizar el negocio:", error);
      }
    },

    // Eliminar un evento
    async deleteBusiness(businessId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.delete(`/api/businesses/${businessId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getEnabled();
        console.log("Negocio eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el negocio:", error);
      }
    },

    async validateBusiness(businessId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.put(
          `/api/businesses/${businessId}/validate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getEnabled();
        console.log("Negocio validado con éxito");
      } catch (error) {
        console.error("Error al validar el negocio:", error);
      }
    },

    async updateLocation(businessId, updatedLocation) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.post(
          `/api/businesses/${businessId}/location`,
          updatedLocation,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getEnabled();
        console.log("Ubicación del negocio actualizada con éxito");
      } catch (error) {
        console.error("Error al actualizar la ubicación del negocio:", error);
      }
    },

    async updateHours(businessId, updatedHours) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.put(`/api/businesses/${businessId}/hours`, updatedHours, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getEnabled();
        console.log("Horario del negocio actualizado con éxito");
      } catch (error) {
        console.error("Error al actualizar el horario del negocio:", error);
      }
    },

    // Agregar una imagen a un evento específico
    async addImageToEvent(businessId, formData) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.post("/api/images/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const addImageResponse = await api.post(
          `/api/businesses/${businessId}/images`,
          {
            url: response.data,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Actualiza manualmente el evento en el store sin hacer una nueva carga
        const business = this.businessEnabled.find(
          (business) => business.id === businessId
        );
        if (business) {
          business.images.push({ url: response.data });
        }
        this.getEnabled();
      } catch (error) {
        console.error("Error al subir el archivo:", error.response || error);
      }
    },

    // Eliminar una imagen de un evento
    async removeImageFromEvent(businessId, selectedImage) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.delete(
          `/api/businesses/${businessId}/images/${selectedImage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getEnabled();
      } catch (error) {
        console.error("Error al eliminar imágenes del negocio:", error);
      }
    },

    async addContent(businessId, newContent) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.post(
          `/api/businesses/${businessId}/contents`,
          newContent,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getEnabled();
        console.log("Contenido agregado con éxito al negocio");
      } catch (error) {
        console.error("Error al agregar contenido al negocio:", error);
      }
    },

    // Actualizar un evento existente
    async updateContent(businessId, updatedContent, contentId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.put(
          `/api/businesses/${businessId}/contents/${contentId}`,
          updatedContent,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getEnabled();
        console.log("Contenido actualizado con éxito en el negocio");
      } catch (error) {
        console.error("Error al actualizar el contenido del negocio:", error);
      }
    },

    // Eliminar un evento
    async deleteContent(businessId, contentId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.delete(
          `/api/businesses/${businessId}/contents/${contentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getEnabled();
        console.log("Contenido eliminado con éxito del negocio");
      } catch (error) {
        console.error("Error al eliminar el contenido del negocio:", error);
      }
    },

    async addReview(businessId, newReview) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.post(
          `/api/businesses/${businessId}/reviews`,
          newReview,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getEnabled();
        console.log("Reseña agregada con éxito");
      } catch (error) {
        console.error("Error al agregar la reseña:", error);
      }
    },

    // Actualizar un evento existente
    async updateReview(businessId, updatedReview, reviewId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.put(
          `/api/businesses/${businessId}/reviews/${reviewId}`,
          updatedReview,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getEnabled();
        console.log("Reseña actualizada con éxito");
      } catch (error) {
        console.error("Error al actualizar la reseña:", error);
      }
    },

    // Eliminar un evento
    async deleteBusiness(businessId, reviewId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.delete(`/api/businesses/${businessId}/reviews/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getEnabled();
        console.log("Reseña eliminada con éxito");
      } catch (error) {
        console.error("Error al eliminar la reseña:", error);
      }
    },
  },

  getters: {
    /**
     * Obtiene todos los negocios habilitados.
     * @returns {Array} Lista de negocios habilitados.
     */
    allEnabled(state) {
      return state.businessEnabled;
    },

    /**
     * Obtiene todos los negocios deshabilitados.
     * @returns {Array} Lista de negocios deshabilitados.
     */
    allDisabled(state) {
      return state.businessDisabled;
    },

    /**
     * Obtiene todos los negocios no validados.
     * @returns {Array} Lista de negocios no validados.
     */
    allNonValidated (state){
      return state.businessNonValidate;
    } ,

    /**
     * Obtiene negocios por ID de usuario.
     * @returns {Array} Lista de negocios por usuario.
     */
    businessesByUserId (state) {
      return state.businessById;
    },

    /**
     * Obtiene negocios por tipo.
     * @returns {Array} Lista de negocios por tipo.
     */
    businessesByType(state) {
      return state.businessByType;
    },

    /**
     * Obtiene negocios filtrados por número de reseñas.
     * @returns {Array} Lista de negocios por reseñas.
     */
    businessesByReview: (state) => state.businessByReview,

    AverageReview(state) {
      return state.businessAverageReview;
    },

    /**
     * Busca un negocio por su ID.
     * @param {Object} state - Estado del store.
     * @returns {Function} Función para obtener un negocio por ID.
     */
    getBusinessById: (state) => (businessId) =>
      state.businessEnabled.find((business) => business.id === businessId),

    filteredBusinesses: (state) => {
      return state.businessEnabled.filter((business) =>
        business.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
  },
});
