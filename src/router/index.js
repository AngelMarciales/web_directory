import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "../stores/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/business",
      name: "Business",
      component: () => import("../views/Business/BusinessView.vue"),
      children: [
        {
          path: "list/:typeId",
          name: "BusinessList",
          component: () => import("../views/Business/BusinessListView.vue"),
        },
        {
          path: "business-detail/:businessId",
          name: "BusinessDetail",
          component: () => import("../views/Business/SpecificBusinessView.vue"),
        },
      ],
    },
    {
      path: "/events",
      name: "Events",
      component: () => import("../views/Events/EventView.vue"),
      children: [
        {
          path: "",
          name: "EventList",
          component: () => import("../views/Events/EventListView.vue"),
        },
        {
          path: "event-detail/:eventid",
          name: "EventDetail",
          component: () => import("../views/Events/SpecificEvent.vue"),
        },
      ],
    },
    {
      path: "/tourist-sites",
      name: "TouristSites",
      component: () => import("../views/TouristSite/TouristView.vue"),
      children: [
        {
          path: "",
          name: "TouristSiteList",
          component: () =>
            import("../views/TouristSite/TouristSiteListView.vue"),
        },
        {
          path: "tourist-site-detail/:siteid",
          name: "TouristSiteDetail",
          component: () =>
            import("../views/TouristSite/SpecificTouristSite.vue"),
        },
      ],
    },

    //rutas manager
    {
      path: "/business-list-admin",
      name: "BusinessOptions",
      component: () => import("../views/Administrator/AdminView.vue"),
      meta: { requiresAuth: true, role: ["MANAGER", "ADMIN"] },
      children: [
        {
          path: "",
          name: "BusinessListAdmin",
          component: () =>
            import("../views/Administrator/AdministratorBusinessListView.vue"),
          meta: { requiresAuth: true, role: ["MANAGER", "ADMIN"] },
        },
        {
          path: "event-tourist-sites",
          name: "EventTouristSiteList",
          component: () =>
            import("../views/Administrator/Events_TouristSiteListView.vue"),
          meta: { requiresAuth: true, role: ["MANAGER", "ADMIN"] },
        },
        {
          path: "reports",
          name: "Reports",
          component: () => import("../views/Administrator/ReportView.vue"),
          meta: { requiresAuth: true, role: ["MANAGER", "ADMIN"] },
        },
        {
          path: "applications-list",
          name: "BusinessApplications",
          component: () =>
            import("../views/Administrator/ApplicationListView.vue"),
          meta: { requiresAuth: true, role: ["MANAGER", "ADMIN"] },
        },
      ],
    },

    //rutas propietario
    {
      path: "/owner-business/:businessOwner",
      name: "OwnerBusiness",
      component: () => import("../views/Owner/OwnerBusinessView.vue"),
      meta: { requiresAuth: true, role: "OWNER" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    console.warn("No está autorizado");
    return next("/"); // Redirigir a la página de inicio si no está autenticado
  }

  // Verificar si la ruta tiene roles específicos
  if (
    to.meta.roles &&
    !to.meta.roles.some((role) => userStore.role.includes(role))
  ) {
    console.warn("No tiene el rol adecuado para acceder a esta ruta");
    return next("/"); // Redirigir si el usuario no tiene el rol adecuado
  }

  next(); // Continuar con la navegación
});

export default router;
