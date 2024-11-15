import { defineStore } from "pinia";
import api from "../config/api";

export const useEventStore = defineStore("eventStore", {
  state: () => ({
    events: [], // Lista de eventos
  }),

  actions: {
    // Obtener el token de localStorage
    getToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token de autorización no encontrado");
        return null;
      }
      return token;
    },

    // Cargar los eventos desde el servidor
    async loadEvents() {
      try {
        const response = await api.get("/api/events/current");
        this.events = response.data;
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      }
    },

    // Agregar un nuevo evento
    async addEvent(newEvent) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.post("/api/events", newEvent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.loadEvents();
        console.log("Evento agregado con éxito");
      } catch (error) {
        console.error("Error al agregar el evento:", error);
      }
    },

    // Actualizar un evento existente
    async updateEvent(eventId, updatedEvent) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.put(`/api/events/${eventId}`, updatedEvent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.loadEvents();
        console.log("Evento actualizado con éxito");
      } catch (error) {
        console.error("Error al actualizar el evento:", error);
      }
    },

    // Eliminar un evento
    async deleteEvent(eventId) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.delete(`/api/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.loadEvents();
        console.log("Evento eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
      }
    },

    // Agregar una imagen a un evento específico
    async addImageToEvent(eventId, formData) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        const response = await api.post("/api/images/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        await api.post(
          `/api/events/${eventId}/images`,
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
        const event = this.events.find((event) => event.id === eventId);
        if (event) {
          event.images.push({ url: response.data });
        }
        this.loadEvents();
      } catch (error) {
        console.error("Error al subir el archivo:", error.response || error);
      }
    },

    // Eliminar una imagen de un evento
    async removeImageFromEvent(eventId, selectedImage) {
      const token = this.getToken();
      if (!token) return; // Si no hay token, no hacemos la petición
      try {
        await api.delete(`/api/events/${eventId}/images/${selectedImage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.loadEvents();
      } catch (error) {
        console.error("Error al eliminar imagenes:", error);
      }
    },
  },

  getters: {
    // Obtener todos los eventos
    allEvents(state) {
      return state.events;
    },

    // Obtener un evento por su ID
    getEventById(state) {
      return (eventId) => state.events.find((event) => event.id === eventId);
    },
  },
});
