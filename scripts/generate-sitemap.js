#!/usr/bin/env node
/**
 * 生成 sitemap.xml
 * 掃描前端靜態路由與 Markdown 文章
 */
const fs = require('fs')
const path = require('path')

const SITE_URL = process.env.SITE_URL || 'https://liyulaw.netlify.app'
const publicDir = path.join(__dirname, '..', 'client', 'public')

const staticRoutes = ['/', '/team', '/services', '/knowledge', '/contact']

// 掃描文章檔案產生路徑
function getArticleRoutes() {
  const articleDir = path.join(publicDir, 'article')
  if (!fs.existsSync(articleDir)) return []
  return fs
    .readdirSync(articleDir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = encodeURIComponent(filename.replace(/\.md$/i, ''))
      return `/knowledge/${slug}`
    })
}

function buildUrlEntry(loc) {
  const lastmod = new Date().toISOString()
  return `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
}

function generate() {
  const articleRoutes = getArticleRoutes()
  const routes = [...staticRoutes, ...articleRoutes]
  const urlset = routes.map(buildUrlEntry).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>`
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')
  console.log(`Generated sitemap with ${routes.length} routes.`)
}

generate()
