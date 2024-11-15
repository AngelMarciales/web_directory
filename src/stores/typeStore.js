import { defineStore } from "pinia";
import api from "../config/api"; // Reutilizamos la configuración de Axios

export const useTypeStore = defineStore("typeStore", {
  state: () => ({
    types: [], // Lista de sitios turísticos
    type: {},
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

    // Cargar los sitios desde el servidor
    async getTypes() {
      try {
        const response = await api.get("/api/businesses/types");
        this.types = response.data;
      } catch (error) {
        console.error(
          "No se pudieron cargar las categorias. Verifique la conexión al servidor.",
          error
        );
      }
    },

    async getTypesById(businessId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        const response = await api.get(`/api/businesses/types/${businessId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.info("La categoria se obtuvo correctamente.");
        this.type = response.data;
      } catch (error) {
        console.error(
          "Ocurrió un error al intentar obtener la categoria.",
          error
        );
      }
    },

    // Agregar un nuevo sitio
    async addType(newType) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        await api.post("/api/businesses/types", newType, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await this.getTypes();
        console.info("La categoria se agregó correctamente.");
      } catch (error) {
        console.error(
          "Ocurrió un error al intentar agregar la categoria.",
          error
        );
      }
    },

    // Actualizar un sitio existente
    async updateType(typeId, updatedType) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        await api.put(`/api/businesses/types/${typeId}`, updatedType, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await this.getTypes();
        console.info("La categoria se actualizó correctamente.");
      } catch (error) {
        console.error(
          "Ocurrió un error al intentar actualizar categoria.",
          error
        );
      }
    },

    // Eliminar un sitio
    async deleteType(typeId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        await api.delete(`/api/businesses/types/${typeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await this.getTypes();
        console.info("La categoria se eliminó correctamente.");
      } catch (error) {
        console.error(
          "No se pudo eliminar la categoria. Verifique la conexión o permisos.",
          error
        );
      }
    },
  },

  getters: {
    // Obtener todos los sitios
    allTypes(state) {
      return state.types;
    },

    getById(state) {
      return state.type;
    },

    // Obtener un sitio por su ID
    getTypeById(state) {
      return (siteId) => state.types.find((site) => site.id === siteId);
    },
  },
});
