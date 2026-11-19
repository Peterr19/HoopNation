<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  articles: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="article-grid">
    <RouterLink
      v-for="article in articles"
      :key="article.id"
      :to="'/article/' + article.id"
      class="article-card"
    >
      <div class="card-image">
        <span>{{ article.category }}</span>
      </div>

      <div class="card-content">
        <h3>{{ article.title }}</h3>
        <p>{{ article.summary }}</p>
        <span class="read-more">Read story</span>
      </div>
    </RouterLink>
  </div>
</template>
