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
      role.value = response.data.typeUser;
      token.value = response.data.jwt;
      userId.value = response.data.userId;
      isAuthenticated.value = true;
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.typeUser);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("isAuthenticated", true);
      console.log("Login exitoso:");
    } catch (error) {
      alert("Error al iniciar sesión. \n" + error.response.data)
    }
  }

  async function createUser(email){
    try {
      const response = await api.post("/api/users/tourist", email);
      return response.data;
    } catch (error) {
      alert("Error al crear usuario. \n" + error.response.data)
      return error;
    }
  }

  // Método para cerrar sesión
  function logout() {
    isAuthenticated.value = false;
    role.value = null;
    token.value = null;
    userId.value = null;

    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
  }

  function loadUserData() {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    const storedUserId = localStorage.getItem("userId");


    if (storedToken && storedAuth) {
      token.value = storedToken;
      role.value = storedRole;
      isAuthenticated.value = storedAuth;
      userId.value = storedUserId;
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
    createUser,
    isAdmin,
    isOwner,
    isVisitor,
    isOther,
    userId,
  };
});
