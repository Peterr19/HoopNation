<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useArticles } from '../stores/articleStore.js'

const route = useRoute()
const router = useRouter()

//Connects this page to functions stored in articleStore
const { articles, saveArticle, deleteArticle} = useArticles()


//defines which article the user wants to edit
const editingArticle = computed(() =>
  articles.value.find(article => article.id === route.query.edit)
)

//stores what the user wants to edit
const draft = ref({
  title: '',
  category: '',
  summary: '',
  body: []
})


const errorMessage = ref('')

const isCreating = ref(false)

//
watch(
  editingArticle,
  article => {
    errorMessage.value = ''

//checks whether the article exists and filling the draft
    if (article) {
      draft.value = {
        title: article.title,
        category: article.category,
        summary: article.summary,
        body: [...article.body] //copy
      }
    }
  }
)

function startCreating() {
  isCreating.value = true
  draft.value = {
    title: '',
    category: '',
    summary: '',
    body: ['']
  }
  errorMessage.value = ''
}

//save the changes
function saveChanges() {
  if (!editingArticle.value && !isCreating.value) return

  errorMessage.value = saveArticle(
    isCreating.value ? null : editingArticle.value.id,
    draft.value.title,
    draft.value.category,
    draft.value.summary,
    draft.value.body
  )

  if (!errorMessage.value) {
    isCreating.value = false
    router.push('/editor')
  }
}

//back to editor if saving is successful
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
<!--display form only if an article is selected-->
    <div v-if="editingArticle || isCreating" class="editor-form">
      <h2>{{ isCreating ? 'Create Article' : 'Edit Article' }}</h2>

      <label for="article-title">Title</label>
      <input id="article-title" v-model="draft.title" />

      <label for="article-category">Category</label>
      <input id="article-category" v-model="draft.category" />

      <label for="article-summary">Summary</label>
      <input id="article-summary" v-model="draft.summary" />

      <label>Article paragraphs</label>

<!--connects textarea to correspondng paragraph  in array -->
      <textarea
        v-for="(paragraph, index) in draft.body"
        :key="index"
        v-model="draft.body[index]"
        :aria-label="'Article paragraph ' + (index + 1)"
      ></textarea>

<!--runs errorMessage func if a field is empty-->
      <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>

      <div class="editor-actions">
        <button @click="saveChanges" class="edit-link">
          {{ isCreating ? 'Create Article' : 'Save Changes' }}
        </button>

      </div>
    </div>
<!--if no article is selected-->
    <div v-else>
      <div class="editor-heading">
        <h2>Current Articles</h2>
        <span>{{ articles.length }} Articles</span>
      </div>

      <button @click="startCreating" class="edit-link">
        Create Article
      </button>

<!--each article has a unique id to tack-->
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