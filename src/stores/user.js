import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "../config/api"; // Reutilizamos la configuración de Axios

export const useUserStore = defineStore("user", () => {
  const isAuthenticated = ref(false);
  const role = ref(null);
  const token = ref(null);
  const userId = ref(null);

  // Método para iniciar sesión y asignar un rol
  async function login(user) {
    try {
      const response = await api.post("/api/users/login", user);
      console.log(response);
      role.value = response.data.typeUser;
      token.value = response.data.jwt;
      userId.value = response.data.userId;
      isAuthenticated.value = true;
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.typeUser);
      localStorage.setItem("isAuthenticated", true);
      console.log("Login exitoso:");
    } catch (error) {
      console.error("Error al iniciar sesión.", error.response);
    }
  }

  // Método para cerrar sesión
  function logout() {
    isAuthenticated.value = false;
    role.value = null;
    token.value = null;

    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
  }

  function loadUserData() {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";

    if (storedToken && storedAuth) {
      token.value = storedToken;
      role.value = storedRole;
      isAuthenticated.value = storedAuth;
    }
  }

  // Computados para verificar el rol
  const isAdmin = computed(() => role.value === "MANAGER" || role.value === "ADMIN");
  const isOwner = computed(() => role.value === "OWNER");
  const isVisitor = computed(() => role.value === "TOURIST");
  const isOther = computed(() => role.value === "OTHER");

  return {
    isAuthenticated,
    role,
    token,
    login,
    logout,
    loadUserData,
    isAdmin,
    isOwner,
    isVisitor,
    isOther,
  };
});
