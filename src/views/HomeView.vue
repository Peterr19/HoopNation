<script setup>
import { RouterLink } from 'vue-router'
import { useArticles } from '../stores/articleStore.js'
import ArticleList from '../components/ArticleList.vue'

const { articles } = useArticles()
</script>

<template>
  <div class="container">
    <section class="hero">
      <div>
        <p class="orange-text">THE HISTORY OF BASKETBALL</p>
        <h1>More than a game.</h1>
        <p>The players, rivalries and unforgettable moments that shaped the NBA.</p>

        <RouterLink
          :to="'/article/' + articles[0].id"
          class="orange-button"
        >
          Read featured story
        </RouterLink>
      </div>

      <div class="hero-image">
        <span>FEATURED STORY</span>
        <h2>MICHEAL<br />JORDAN</h2>
      </div>
    </section>

    <section class="stories">
      <p class="orange-text">EXPLORE NBA HISTORY</p>
      <h2>Stories</h2>

      <ArticleList :articles="articles" />
    </section>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink }
}
</script>
