<template>
  <div class="carousel w-full h-96">
    <div class="carousel-item relative w-full">
      <img :src="images[currentIndex].src" class="w-full" />
      <div
        class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
      >
        <button @click="prevSlide" class="btn btn-circle">❮</button>
        <button @click="nextSlide" class="btn btn-circle">❯</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const images = [
  {
    src: "/src/assets/image1.jpg",
  },
  {
    src: "/src/assets/image2.jpg",
  },
  {
    src: "/src/assets/image3.jpg",
  },
];

const currentIndex = ref(0);

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % images.length;
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
}
</script>

<style scoped></style>
