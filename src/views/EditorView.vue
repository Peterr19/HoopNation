<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useArticles } from '../stores/articleStore.js'

const route = useRoute()
const router = useRouter()

const { articles, saveArticle, deleteArticle} = useArticles()

const editingArticle = computed(() =>
  articles.value.find(article => article.id === route.query.edit)
)

const draft = ref({
  title: '',
  category: '',
  summary: '',
  body: []
})

const errorMessage = ref('')

watch(
  editingArticle,
  article => {
    errorMessage.value = ''

    if (article) {
      draft.value = {
        title: article.title,
        category: article.category,
        summary: article.summary,
        body: [...article.body]
      }
    }
  }
)

function saveChanges() {
  if (!editingArticle.value) return

  errorMessage.value = saveArticle(
    editingArticle.value.id,
    draft.value.title,
    draft.value.category,
    draft.value.summary,
    draft.value.body
  )

  if (!errorMessage.value) {
    router.push('/editor')
  }
}

function cancelEditing() {
  router.push('/editor')
}
</script>

<template>
  <main class="container editor-page">
    <p class="orange-text">EDITOR AREA</p>
    <h1>Manage Articles</h1>
    <p class="editor-intro">
      View and organise the stories featured on Beyond the Buzzer.
    </p>

    <div v-if="editingArticle" class="editor-form">
      <h2>Edit Article</h2>

      <label for="article-title">Title</label>
      <input id="article-title" v-model="draft.title" />

      <label for="article-category">Category</label>
      <input id="article-category" v-model="draft.category" />

      <label for="article-summary">Summary</label>
      <input id="article-summary" v-model="draft.summary" />

      <label>Article paragraphs</label>

      <textarea
        v-for="(paragraph, index) in draft.body"
        :key="index"
        v-model="draft.body[index]"
        :aria-label="'Article paragraph ' + (index + 1)"
        rows="4"
      ></textarea>

      <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>

      <div class="editor-actions">
        <button @click="saveChanges" class="edit-link">
          Save Changes
        </button>

        <button @click="cancelEditing" class="view-link">
          Cancel
        </button>
      </div>
    </div>

    <div v-else>
      <div class="editor-heading">
        <h2>Current Articles</h2>
        <span>{{ articles.length }} Articles</span>
      </div>

      <div
        v-for="article in articles"
        :key="article.id"
        class="editor-row"
      >
        <div>
          <h3>{{ article.title }}</h3>
          <p>{{ article.category }} · {{ article.date }}</p>
        </div>

        <div class="editor-actions">
          <RouterLink
            :to="'/editor?edit=' + article.id"
            class="edit-link"
          >
            Edit
          </RouterLink>

          <RouterLink
            :to="'/article/' + article.id"
            class="view-link"
          >
            View
          </RouterLink>

          <button
            type="button"
            class="delete-link"
            @click="deleteArticle(article.id)"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  </main>
</template>