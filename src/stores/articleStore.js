import { ref, readonly } from 'vue'
import { initialArticles } from '../data/articles.js'

//Makes articles from article.js reactive
const articles = ref(initialArticles.map(article => ({
//copies  all info
  ...article,
  //create copy
  body: [...article.body]
})))

//receives info need to update an article, raw = original value
function saveArticle(id, rawTitle, rawCategory, rawSummary, rawBody) {
  const title = rawTitle.trim()
  const category = rawCategory.trim()
  const summary = rawSummary.trim()
  const body = rawBody.map(paragraph => paragraph.trim())

//edit article form info
  if (!title) return 'Please enter an article title.'
  if (!category) return 'Please enter an article category.'
  if (!summary) return 'Please enter an article summary.'
  if (body.some(paragraph => !paragraph)) {
    return 'Please complete all article paragraphs.'
  }

  //create a new article
  if (id === null) {
    let newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    let number = 2

    while (articles.value.some(article => article.id === newId)) {
      newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + number++
    }

    articles.value.push({
      id: newId,
      title,
      category,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      summary,
      body
    })

    return ''
  }

//search list for article with id matching the one passed
  const article = articles.value.find(item => item.id === id)

  if (!article) return 'This article is no longer available.'

//update article
  article.title = title
  article.category = category
  article.summary = summary
  article.body = body

  return ''
}

function deleteArticle(id) {
  articles.value = articles.value.filter(article => article.id !== id)
}

//CREATE ARTICLE


const articleStore = {
  articles: readonly(articles),
  saveArticle,
  deleteArticle
}

//allows other files to access the shared article store
export function useArticles() {
  return articleStore
}
