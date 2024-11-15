import { defineStore } from "pinia";
import api from "../config/api"; // Reutilizamos la configuración de Axios

export const useSiteStore = defineStore("siteStore", {
  state: () => ({
    sites: [], // Lista de sitios turísticos
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
    async loadSites() {
      try {
        const response = await api.get("/api/tourist-places");
        this.sites = response.data;
      } catch (error) {
        console.error(
          "No se pudieron cargar los sitios turísticos. Verifique la conexión al servidor.",
          error
        );
      }
    },

    // Agregar un nuevo sitio
    async addSite(newSite) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        await api.post("/api/tourist-places", newSite, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await this.loadSites();
        console.info("El sitio turístico se agregó correctamente.");
      } catch (error) {
        console.error(
          "Ocurrió un error al intentar agregar el sitio turístico.",
          error
        );
      }
    },

    // Actualizar un sitio existente
    async updateSite(siteId, updatedSite, updateLocation) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        await api.put(`/api/tourist-places/${siteId}`, updatedSite, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await api.post(
          `/api/tourist-places/${siteId}/location`,
          updateLocation,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await this.loadSites();
        console.info("El sitio turístico se actualizó correctamente.");
      } catch (error) {
        console.error(
          "Ocurrió un error al intentar actualizar el sitio turístico.",
          error
        );
      }
    },

    // Eliminar un sitio
    async deleteSite(siteId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        await api.delete(`/api/tourist-places/${siteId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await this.loadSites();
        console.info("El sitio turístico se eliminó correctamente.");
      } catch (error) {
        console.error(
          "No se pudo eliminar el sitio turístico. Verifique la conexión o permisos.",
          error
        );
      }
    },

    // Agregar una imagen a un sitio
    async addImageToSite(siteId, formData) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        const uploadResponse = await api.post("/api/images/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        await api.post(
          `/api/tourist-places/${siteId}/images`,
          {
            url: uploadResponse.data,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Actualiza manualmente la lista de imágenes del sitio en el store
        const site = this.sites.find((site) => site.id === siteId);
        if (site) {
          site.images.push({ url: uploadResponse.data });
        }

        await this.loadSites();
        console.info("La imagen se agregó correctamente al sitio turístico.");
      } catch (error) {
        console.error(
          "No se pudo agregar la imagen al sitio turístico.",
          error
        );
      }
    },

    // Eliminar una imagen de un sitio
    async removeImageFromSite(siteId, selectedImage) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no continuamos
      try {
        await api.delete(
          `/api/tourist-places/${siteId}/images/${selectedImage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await this.loadSites();
        console.info("La imagen se eliminó correctamente del sitio turístico.");
      } catch (error) {
        console.error(
          "No se pudo eliminar la imagen del sitio turístico.",
          error
        );
      }
    },
  },

  getters: {
    // Obtener todos los sitios
    allSites(state) {
      return state.sites;
    },

    // Obtener un sitio por su ID
    getSiteById(state) {
      return (siteId) => state.sites.find((site) => site.id === siteId);
    },
  },
});
