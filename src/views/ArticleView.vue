<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useArticles } from '../stores/articleStore.js'

const route = useRoute()

//access to articles
const { articles } = useArticles()

//find the article using its id
const article = computed(() =>
  articles.value.find(item => item.id === route.params.id))
</script>

<template>
  <div class="container">

    <!--display article if it exists-->
    <div v-if="article">

      <p class="orange-text">{{ article.category }}</p>

      <h1>{{ article.title }}</h1>

      <p>{{ article.date }}</p>

      <p>{{ article.summary }}</p>

      <!--display each paragraph of the article-->
      <div v-for="(paragraph, index) in article.body" :key="index">
        <p>{{ paragraph }}</p>
      </div>

      <RouterLink to="/" class="orange-button">
        Back to Home
      </RouterLink>

    </div>

    <!--if article cannot be found-->
    <div v-else>
      <h1>Article not found</h1>
      <RouterLink to="/">Back to Home</RouterLink>
    </div>

  </div>
</template>
