<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useArticles } from '../stores/articleStore.js'
import ArticleList from '../components/ArticleList.vue'

//access to articles
const { articles } = useArticles()

//store searches in an empty reactive value
const searchQuery = ref('')

//get what has been searched
const filteredArticles = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

//check all articles
  return articles.value.filter(article => {
  //search title and summary
    const searchableText =
      `${article.title} ${article.summary}`.toLowerCase()

//if text matches search then it stays, else it is left out
    return searchableText.includes(query)
  })
})
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

      <label for="article-search">Search articles</label>
      <input
        id="article-search"
        v-model="searchQuery"
        type="search"
        placeholder="Search articles here"
      />

      <p>{{ filteredArticles.length }} of {{ articles.length }} articles shown.</p>

      <ArticleList
        v-if="filteredArticles.length"
        :articles="filteredArticles"
      />

      <p v-else>No articles match your search.</p>
    </section>
  </div>
</template>