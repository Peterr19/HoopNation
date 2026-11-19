import { ref, readonly } from 'vue'
import { initialArticles } from '../data/articles.js'

const articles = ref(initialArticles.map(article => ({
  ...article,
  body: [...article.body]
})))

function saveArticle(id, rawTitle, rawCategory, rawSummary, rawBody) {
  const title = rawTitle.trim()
  const category = rawCategory.trim()
  const summary = rawSummary.trim()
  const body = rawBody.map(paragraph => paragraph.trim())

  if (!title) return 'Please enter an article title.'
  if (!category) return 'Please enter an article category.'
  if (!summary) return 'Please enter an article summary.'
  if (body.some(paragraph => !paragraph)) {
    return 'Please complete all article paragraphs.'
  }

  const article = articles.value.find(item => item.id === id)

  if (!article) return 'This article is no longer available.'

  article.title = title
  article.category = category
  article.summary = summary
  article.body = body

  return ''
}

const articleStore = {
  articles: readonly(articles),
  saveArticle
}

export function useArticles() {
  return articleStore
}
