<template>
  <div>
    <h1 class="title3">Categorias</h1>
    <br />
  </div>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3"
  >
    <div
      @click="validateCategoryName('Restaurante')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z "
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Restaurantes
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Hotel')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M40-200v-585h60v394h353v-309h322q59.81 0 102.41 42.59Q920-614.81 920-555v355h-60v-131H100v131H40Zm230-249q-45 0-75.5-30.5T164-555q0-45 30.5-75.5T270-661q45 0 75.5 30.5T376-555q0 45-30.5 75.5T270-449Zm243 58h347v-164q0-35.06-24.97-60.03T775-640H513v249ZM270-509q19 0 32.5-13.5T316-555q0-19-13.5-32.5T270-601q-19 0-32.5 13.5T224-555q0 19 13.5 32.5T270-509Zm0-46Zm243-85v249-249Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Hoteles
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Cafeterias y panaderias')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M160-120v-60h640v60H160Zm151-140q-63 0-107-43.5T160-410v-430h660q24.75 0 42.38 17.62Q880-804.75 880-780v160q0 24.75-17.62 42.37Q844.75-560 820-560h-96v150q0 63-44 106.5T573-260H311Zm0-60h261.98q36.02 0 63.52-27.5T664-410v-370H220v370q0 35 28 62.5t63 27.5Zm413-300h96v-160h-96v160ZM311-320h-91 444-353Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Cafeterias y panaderias
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Supermercados')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M160-740v-60h642v60H160Zm5 580v-258h-49v-60l44-202h641l44 202v60h-49v258h-60v-258H547v258H165Zm60-60h262v-198H225v198Zm-50-258h611-611Zm0 0h611l-31-142H206l-31 142Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Supermercados
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Peluquerias y barberias')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M782-114 481-415 364-298q11 17 13.5 33t2.5 35q0 64-43 107T230-80q-64 0-107-43T80-230q0-64 43-107t107-43q18 0 35.5 5t36.5 15l116-116-118-118q-17 8-34.5 11t-35.5 3q-64 0-107-43T80-730q0-64 43-107t107-43q64 0 107 43t43 107q0 19-2.5 36T367-662l514 514v34h-99ZM599-527l-66-66 249-249h99v33L599-527ZM230-640q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Zm253 183q8 0 13.5-5.5T502-476q0-8-5.5-13.5T483-495q-8 0-13.5 5.5T464-476q0 8 5.5 13.5T483-457ZM230-140q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Peluquerias y barberias
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Tiendas')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M220-80q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h110v-10q0-63 43.5-106.5T480-880q63 0 106.5 43.5T630-730v10h110q24 0 42 18t18 42v520q0 24-18 42t-42 18H220Zm0-60h520v-520H630v90q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-90H390v90q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-90H220v520Zm170-580h180v-10q0-38-26-64t-64-26q-38 0-64 26t-26 64v10ZM220-140v-520 520Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Tiendas
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Servicios financieros')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-470h480q29 0 54.5 9t45.5 26v-45q0-42-29-71t-71-29H240q-42 0-71 29t-29 71v45q20-17 45.5-26t54.5-9Zm-97 136 477 115q7 2 14.5.5T647-385l160-134q-13-23-36-37t-51-14H240q-35 0-62 21.5T143-494Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Servicios financieros
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Comidas Rapidas')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M575-364q-23-52-90.5-82.5T344-477q-73 0-140.5 30.5T112-364h463ZM40-304q0-109 93-171t211-62q118 0 211 62t93 171H40Zm0 128v-60h608v60H40ZM708-40v-60h86l57-580H453l-7-60h205v-180h60v180h209l-67 640q-3.09 25.86-22.67 42.93Q810.76-40 785-40h-77Zm0-60h86-86ZM70-40q-12.75 0-21.37-8.63Q40-57.25 40-70v-30h608v30.18q0 12.82-8.62 21.32Q630.75-40 618-40H70Zm274-324Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Comidas Rapidas
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Farmacias')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M120-120v-60l87-255-87-255v-60h527l62-170 68 27-52 143h115v60l-88 255 88 255v60H120Zm332-161h60v-124h124v-60H512v-124h-60v124H328v60h124v124ZM182-180h596l-88-255 88-255H182l88 255-88 255Zm298-255Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Farmacias
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Talleres automotrices')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M705-128 447-388q-23 8-46 13t-47 5q-97.08 0-165.04-67.67Q121-505.33 121-602q0-31 8.16-60.39T152-718l145 145 92-86-149-149q25.91-15.16 54.96-23.58Q324-840 354-840q99.17 0 168.58 69.42Q592-701.17 592-602q0 24-5 47t-13 46l259 258q11 10.96 11 26.48T833-198l-76 70q-10.7 11-25.85 11Q716-117 705-128Zm28-57 40-40-273-273q16-21 24-49.5t8-54.5q0-75-55.5-127T350-782l102 104q9 9 8.5 21.5T451-635L318-510q-9.27 8-21.64 8-12.36 0-20.36-8l-98-97q3 77 54.67 127T354-430q25 0 53-8t49-24l277 277ZM476-484Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Talleres automotrices
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Gimnasios')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="m826-585-42-42 45-45-157-157-45 45-43-43 30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857-615l-31 30ZM346-104q-23 23-56.5 23T233-104L90-247q-17-17.38-17-42.69T90-332l44-44 43 42-45 45 157 157 45-45 42 43-30 30Zm397-308 85-85-331-331-85 85 331 331ZM463-132l86-86-331-331-86 86 331 331Zm9-248 109-109-92-92-109 109 92 92Zm33 290q-16.93 17-41.97 17Q438-73 421-90L90-421q-17-16.93-17-41.97Q73-488 90-505l85-86q17.38-17 42.69-17T260-591l77 77 110-110-77-77q-17-16.93-17-41.97Q353-768 370-785l85-86q17.38-17 42.69-17T540-871l331 331q17 17.38 17 42.69T871-455l-86 85q-16.93 17-41.97 17Q718-353 701-370l-77-77-110 110 77 77q17 17.38 17 42.69T591-175l-86 85Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Gimnasios
        </h2>
      </div>
    </div>
    <div
      @click="validateCategoryName('Centro de salud')"
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M140-80q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h180v-100q0-24 18-42t42-18h200q24 0 42 18t18 42v100h180q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm240-580h200v-100H380v100ZM140-140v-520 520Zm310-230v120h60v-120h120v-60H510v-120h-60v120H330v60h120Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Centro de salud
        </h2>
      </div>
    </div>
    <div
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M658-648v-132H302v132h-60v-192h476v192h-60Zm-518 60h680-680Zm599 95q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm-81 313v-192H302v192h356Zm60 60H242v-176H80v-246q0-45.05 30.5-75.53Q141-648 186-648h588q45.05 0 75.53 30.47Q880-587.05 880-542v246H718v176Zm102-236v-186.21Q820-562 806.78-575q-13.23-13-32.78-13H186q-19.55 0-32.77 13.22Q140-561.55 140-542v186h102v-76h476v76h102Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Papelerias
        </h2>
      </div>
    </div>
    <div
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M140-120q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h180v-100q0-24 18-42t42-18h200q24 0 42 18t18 42v100h180q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680v-480H140v480Zm240-540h200v-100H380v100ZM140-180v-480 480Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Servicios Profesionales
        </h2>
      </div>
    </div>
    <div
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M180-80q-24.75 0-42.37-17.63Q120-115.25 120-140v-530q0-24.75 17.63-42.38Q155.25-730 180-730h110q0-78 53.5-134T475-920q80.92 0 137.96 55Q670-810 670-730h110q24.75 0 42.38 17.62Q840-694.75 840-670v530q0 24.75-17.62 42.37Q804.75-80 780-80H180Zm0-60h600v-530H180v530Zm300-290q79 0 137-58t58-137h-60q0 55-40 95t-95 40q-55 0-95-40t-40-95h-60q0 79 58 137t137 58ZM350-730h260q0-55-37.5-92.5T480-860q-55 0-92.5 37.5T350-730ZM180-140v-530 530Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Ropa y calzado
        </h2>
      </div>
    </div>
    <div
      class="card bg-custom-card w-36 h-40 rounded-md hover:scale-150 transition-transform duration-300 hover:bg-custom-hover"
    >
      <figure class="px-10 pt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full icon-color rounded-md"
          height="80px"
          width="80px"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M207.86-432Q188-432 174-446.14t-14-34Q160-500 174.14-514t34-14Q228-528 242-513.86t14 34Q256-460 241.86-446t-34 14Zm272 0Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm272 0Q732-432 718-446.14t-14-34Q704-500 718.14-514t34-14Q772-528 786-513.86t14 34Q800-460 785.86-446t-34 14Z"
          />
        </svg>
      </figure>
      <div class="items-center text-center">
        <h2 class="title5" style="font-size: 0.9rem; color: var(--primary1)">
          Otros...
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/businesses/types"
        );
        this.categories = response.data;
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    },
    validateCategoryName(categoryName) {
      for (let category of this.categories) {
        if (category.name.toLowerCase() === categoryName.toLowerCase()) {
          this.goTobussinessList(category.id);
          return;
        }
      }
      console.log("La categoría no coincide con el nombre específico");
    },
    goTobussinessList(categoryId) {
      this.$router.push({
        name: "BusinessList",
        params: { typeId: categoryId },
      });
    },
  },
};
</script>

<style scoped>
.bg-custom-card {
  background-color: var(--neutro4);
  transition: background-color 0.3s, color 0.3s;
  border: 1px solid var(--primary1);
}

.hover\:bg-custom-hover:hover {
  background-color: var(--neutro3);
}

.icon-color {
  color: var(--primary1);
}
</style>
