<script setup>
import { nextTick, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import SiteNav from './components/SiteNav.vue'

const route = useRoute()

watch(() => route.fullPath, async () => {
  await nextTick()
  document.querySelector('#main-content h1')?.focus()
})
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <div class="website">
    <header class="header">
      <RouterLink to="/" class="logo">HOOP <span>NATION</span></RouterLink>
      <SiteNav />
    </header>

    <main id="main-content" tabindex="-1">
      <RouterView />
    </main>

    <footer class="footer">
      <h2>BEYOND THE <span>BUZZER</span></h2>
      <p>Celebrating the history of basketball.</p>
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: white;
  color: #000000;
}

.header, .footer { background: #111827; color: white;}

.header {
  padding: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}

.logo { color: white; font-size: 21px; font-weight: bold; text-decoration: none; }
.logo span, .footer span { color: orange; }

nav { display: flex; gap: 25px; }
nav a { color: white; text-decoration: none; }
nav a.router-link-active { color: orange; }

.container { max-width: 1100px; margin: auto; padding: 45px 25px; }
.orange-text { color: orange; font-size: 13px; font-weight: bold; letter-spacing: 1px; }

.hero {
  background: #111827;
  color: white;
  padding: 55px 40px;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: center;
}

.hero h1 { font-size: 48px; margin: 15px 0; }
.hero p:not(.orange-text) { color: white; line-height: 1.7; }

.orange-button {
  display: inline-block;
  background: #f28c28;
  color: #111827;
  padding: 13px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 15px;
}

.hero-image, .article-banner, .card-image {
  background: linear-gradient(135deg, #374151, #111827);
}

.hero-image, .article-banner {
  min-height: 260px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.hero-image span, .card-image span { color: #f28c28; font-size: 13px; font-weight: bold; }
.hero-image h2 { font-size: 45px; }
.stories { padding: 55px 0; }
.stories h2, .more-stories h2 { font-size: 30px; }

.article-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-top: 25px;
}

.article-card {
  background: white;
  border-radius: 9px;
  text-decoration: none;
  color: #111827;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
}

.card-image { height: 160px;display: flex; align-items: flex-end; padding: 15px; }
.card-content { padding: 20px; }
.card-content p { color: grey; line-height: 1.5; }

.read-more, .view-link, .edit-link, .back-link, .more-link {
  color: #d97706;
  font-weight: bold;
  text-decoration: none;
}

.article-page { max-width: 850px; }
.back-link, .more-link { display: inline-block; margin-bottom: 25px; }
.article-page h1, .editor-page h1 { font-size: 40px; }
.article-date, .editor-intro { color: gray;}
.article-banner { margin: 30px 0; font-weight: bold; letter-spacing: 2px; }

.article-body { max-width: 700px; line-height: 1.8; font-size: 17px; }
.article-body p { margin-bottom: 22px; }
.more-stories { border-top: 1px solid #ddd; margin-top: 45px; padding-top: 25px; }
.more-link { display: block; margin: 15px 0; }

.editor-heading, .editor-row, .editor-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.editor-heading { margin-top: 40px; }
.editor-row { background: white; padding: 20px; margin: 12px 0; border-radius: 7px; }
.editor-row p, .editor-note { color: gray; font-size: 14px; }

.edit-link, .view-link {
  font-family: Arial, sans-serif;
  font-size: 16px;
  cursor: pointer;
  color: #d97706;
}

.editor-form { display: flex; flex-direction: column; gap: 10px; max-width: 700px; margin-top: 30px; }
.editor-form input, .editor-form textarea {
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  font: Arial, sans-serif;
}
.editor-form textarea { resize: vertical; }
.editor-note { margin-top: 30px; }

.footer { text-align: center; padding: 35px 20px; margin-top: 30px; }
.footer p { color: #9ca3af; }


.skip-link {
  position: absolute;
  left: 16px;
  top: -100px;
  background: white;
  color: #111827;
  padding: 12px;
  z-index: 10;
}

.skip-link:focus { top: 12px; }
h1 { overflow-wrap: anywhere; }


</style>
