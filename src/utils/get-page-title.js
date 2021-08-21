import defaultSettings from '@/settings'

// 更改路由加载标识头部

const title = defaultSettings.title || '智慧商砼'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
