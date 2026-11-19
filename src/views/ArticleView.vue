<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useArticles } from '../stores/articleStore.js'

const route = useRoute()
const { articles } = useArticles()

const currentArticle = computed(() =>
  articles.value.find(article => article.id === route.params.id)
)
</script>

<template>
  <main v-if="currentArticle" class="container article-page">
    <RouterLink to="/" class="back-link">Back to stories</RouterLink>

    <p class="orange-text">{{ currentArticle.category }}</p>
    <h1>{{ currentArticle.title }}</h1>

    <p class="article-date">
      By Editorial Team · {{ currentArticle.date }}
    </p>

    <div class="article-banner">BEYOND THE BUZZER</div>

    <article class="article-body">
      <h2>The story behind the moment.</h2>

      <p
        v-for="paragraph in currentArticle.body"
        :key="paragraph"
      >
        {{ paragraph }}
      </p>
    </article>

    <section class="more-stories">
      <h2>More Stories</h2>

      <RouterLink
        v-for="article in articles.filter(item => item.id !== currentArticle.id)"
        :key="article.id"
        :to="'/article/' + article.id"
        class="more-link"
      >
        {{ article.title }}
      </RouterLink>
    </section>
  </main>

  <main v-else class="container">
    <h1>Article not found</h1>
    <RouterLink to="/" class="back-link">Back to stories</RouterLink>
  </main>
</template>
