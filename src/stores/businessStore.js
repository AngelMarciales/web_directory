import { defineStore } from "pinia";
import api from "../config/api";

export const useBusinessStore = defineStore("businessStore", {
  state: () => ({
    searchTerm: "",
    businessEnabled: [],
    businessDisabled: [],
    businessNonValidate: [],
    businessById: {},
    businessByUserId: [],
    businessByType: [],
    businessByReview: [],
    businessAverageReview: 0,
    filteredRatings: [],
    filteredBusinessesReview: [],
  }),

  actions: {
    setSearchTerm(term) {
      this.searchTerm = term;
    },

    async filterBusinessesByReview() {
      this.getEnabled();
      this.filteredBusinessesReview = []; // Asegúrate de limpiar antes de filtrar
      for (const business of this.businessByType) {
        try {
          await this.getAverageReview(business.id);
          let averageReview = 0;
          if (
            this.businessAverageReview !== undefined &&
            this.businessAverageReview !== null
          ) {
            averageReview = Math.round(this.businessAverageReview);
            if (this.filteredRatings.includes(averageReview)) {
              this.filteredBusinessesReview.push(business);
            }
          }
        } catch (error) {
          console.error(
            `Error al obtener el promedio de reseñas para ${business.id}:`,
            error
          );
        }
      }
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

    async getById(businessId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.get(`/api/businesses/${businessId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.businessById = response.data;
      } catch (error) {
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
        this.businessByUserId = response.data;
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
      }
    },

    updateRatingsFilter(ratings) {
      this.filteredRatings = ratings; // Actualizar las valoraciones seleccionadas
    },

    // Agregar un nuevo evento
    async addBusiness(newBusiness) {
      try {
        const response = await api.post("/api/businesses", newBusiness);
        this.getEnabled();
        alert(
          "Solicitud enviada correctamente\n ¡Se  le enviara un correo electronico con los datos necesarios para el inicio de sesión.!"
        );
      } catch (error) {
        alert("Error al enviar solicitud:\n" + error.response.data);
      }
    },

    // Actualizar un evento existente
    async updateBusiness(businessId, updatedBusiness) {
      const token = this.getToken();
      if (!token) return;
      try {
        await api.put(`api/businesses/${businessId}`, updatedBusiness, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getEnabled();
        alert("Negocio actualizado con éxito")
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
      } catch (error) {
        console.error("Error al eliminar el negocio:", error);
      }
    },

    async validateBusiness(businessId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.post(
          `/api/businesses/${businessId}/validate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.getEnabled();
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
        alert("Ubicación del negocio actualizada con éxito");
      } catch (error) {
        alert("Error al actualizar la ubicación del negocio:", error.response.data);
      }
    },

    async updateHours(businessId, updatedHours) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.post(`/api/businesses/${businessId}/hours`, updatedHours, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getEnabled();
        alert("Horario del negocio actualizado con éxito");
      } catch (error) {
        alert("Error al actualizar el horario del negocio:\n"+ error.response.data);
      }
    },

    // Agregar una imagen a un negocio específico
    async addImage(businessId, formData) {
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
        // Actualiza manualmente el negocio en el store sin hacer una nueva carga
        const business = this.businessEnabled.find(
          (business) => business.id === businessId
        );
        if (business) {
          business.images.push({ url: response.data });
        }
        this.getEnabled();
        alert("Imagen agregada con exito");
      } catch (error) {
        alert("Ha ocurrido un error al intentar agregar la imagen", error.response.data);
      }
    },

    // Eliminar una imagen de un evento
    async removeImage(businessId, selectedImage) {
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
        alert("Imagen eliminada con exito");
        this.getEnabled();
      } catch (error) {
        alert("Error al eliminar imágenes del negocio:", error.response.data);
      }
    },

    async addContent(businessId, newContent) {
      const token = this.getToken();
      if (!token) return;
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
        alert("Contenido agregado con éxito al negocio");
      } catch (error) {
        alert("Error al agregar contenido al negocio:", error.response.data);
      }
    },

    // Actualizar un evento existente
    async updateContent(businessId, updatedContent, contentId) {
      const token = this.getToken();
      if (!token) return;
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
        alert("Contenido actualizado con éxito en el negocio");
      } catch (error) {
        alert("Error al actualizar el contenido del negocio", error.response.data);
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
        alert("Contenido eliminado con éxito del negocio");
      } catch (error) {
        alert("Error al eliminar el contenido del negocio:", error.response.data);
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
        alert("Reseña agregada con éxito");
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
        alert("Reseña actualizada con éxito");
      } catch (error) {
        console.error("Error al actualizar la reseña:", error);
      }
    },

    async deleteReview(businessId, reviewId) {
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

    async addFile(formData) {
      try {
        const response = await api.post("/api/files/upload", formData);
        return response.data;
      } catch (error) {
        alert("Error al subir el archivo: \n" + error.response.data);
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
    allNonValidated(state) {
      return state.businessNonValidate;
    },

    /**
     * Obtiene negocios por ID de usuario.
     * @returns {Array} Lista de negocios por usuario.
     */
    businessesByUserId(state) {
      return state.businessByUserId;
    },

    businessesById(state) {
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
      return state.businessByType.filter((business) =>
        business.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },

    getfilteredBusinessesReview(state) {
      return state.filteredBusinessesReview;
    },
  },
});
