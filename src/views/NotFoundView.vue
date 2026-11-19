<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="container">
    <h1>Page not found</h1>
    <p>The pages you are looking for does not exist.</p>
    <RouterLink to="/" class="back-link">Return Home</RouterLink>
  </main>
</template>